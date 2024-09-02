import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./Cropper.module.scss";
import {
  getCorrectAspectRatio,
  getFrameScale,
} from "../../utils/getDimensions";
import { AppContext } from "../../context/context";
import { useCheckContext } from "../../hooks/useCheckContext";
import {
  computeBorderWidth,
  createYellowBorders,
  getInfoToChooseFrameSize,
  updateDpiColor,
} from "../../utils/cropperHelpers";
import Cropper from "cropperjs";
import Button from "../../components/button/Button";
import "cropperjs/dist/cropper.css";
import { colorTextMapping } from "../../constants/global";
import { DPI_COLORS, FRAME_MODE } from "../../constants/enums";

interface CropperProps {
  setIsCropperModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  squareDimensions: SquareDimensionsInt;
  selectedOptions: SelectedFrameOptions;
  imgUrlUploaded: string;
  setCroppedImgUrl: (url: string) => void;
  handlePhoto: string;
  handleUploadPickerAgain: () => void;
}

export const CropperModal = ({
  setIsCropperModalOpen,
  squareDimensions,
  selectedOptions,
  imgUrlUploaded,
  setCroppedImgUrl,
  handlePhoto,
  handleUploadPickerAgain,
}: CropperProps) => {
  const context = useContext(AppContext);
  const { frameSize } = useCheckContext(context);

  const [isLoading, setIsLoading] = useState(false);
  const oneMMInPx = getFrameScale(frameSize, squareDimensions.height);
  const imgRefCropper = useRef<HTMLImageElement>(null);
  const [cropperInstance, setCropperInstance] = useState<Cropper | null>(null);
  const [dpiColor, setDpiColor] = useState<DPI_COLORS | null>(null);

  useEffect(() => {
    const currentImgRatio = getCorrectAspectRatio(
      frameSize,
      selectedOptions.mode!,
      selectedOptions
    );

    if (imgUrlUploaded && imgRefCropper.current) {
      const imageElement = imgRefCropper.current;
      setIsLoading(true);
      const cropper = new Cropper(imageElement, {
        viewMode: 1,
        responsive: true,
        background: false,
        zoomable: false,
        zoomOnWheel: false,
        zoomOnTouch: false,
        modal: false,
        autoCropArea: 1,
        aspectRatio: currentImgRatio,
        cropmove: () => {
          const { naturalHeight, naturalWidth } = cropper.getImageData();
          const cropperCanvas = cropper.getCanvasData();
          const scale =
            selectedOptions.mode === FRAME_MODE.HORIZONTAL
              ? naturalWidth / cropperCanvas.width
              : naturalHeight / cropperCanvas.height;

          updateDpiColor(
            cropper,
            scale,
            selectedOptions,
            setDpiColor,
            frameSize
          );
        },
        ready: function () {
          const { naturalHeight, naturalWidth } = cropper.getImageData();
          const cropperCanvas = cropper.getCanvasData();

          const scale =
            selectedOptions.mode === FRAME_MODE.HORIZONTAL
              ? naturalWidth / cropperCanvas.width
              : naturalHeight / cropperCanvas.height;
          createYellowBorders(
            cropper,
            computeBorderWidth,
            frameSize,
            selectedOptions
          );
          setCropperInstance(cropper);
          updateDpiColor(
            cropper,
            scale,
            selectedOptions,
            setDpiColor,
            frameSize
          );
          setIsLoading(false);
        },
      });

      const handleCropMove = () => {
        const borderWidth = computeBorderWidth(
          cropper,
          frameSize,
          selectedOptions
        );
        const customBorder = document.querySelector(
          ".customBorder"
        ) as HTMLDivElement;
        if (customBorder) {
          customBorder.style.borderTopWidth = `${borderWidth}px`;
          customBorder.style.borderRightWidth = `${borderWidth}px`;
          customBorder.style.borderBottomWidth = `${borderWidth}px`;
          customBorder.style.borderLeftWidth = `${borderWidth}px`;
        }
      };
      imageElement.addEventListener("cropmove", handleCropMove);

      return () => {
        if (imageElement) {
          imageElement.removeEventListener("cropmove", handleCropMove);
        }
        cropper.destroy();
      };
    }
  }, [imgUrlUploaded, frameSize, selectedOptions, oneMMInPx]);

  const handleCropInPhotopanelCropper = useCallback(() => {
    const frameSizes = getInfoToChooseFrameSize(
      frameSize,
      selectedOptions.typeFrame
    );
    if (cropperInstance) {
      let cropData = cropperInstance.getData();

      const requiredWidth = frameSizes.photoSize.width * oneMMInPx;
      const requiredHeight = frameSizes.photoSize.height * oneMMInPx;

      if (cropData.width < requiredWidth || cropData.height < requiredHeight) {
        const isConfirmed = window.confirm(
          "The cropped area of the graphic is of lower quality than recommended. Do you want to proceed at your own risk?"
        );
        if (!isConfirmed) {
          setIsCropperModalOpen(false);
          handleUploadPickerAgain();
          return;
        }
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx || !imgRefCropper.current) return;

      canvas.width = requiredWidth;
      canvas.height = requiredHeight;

      ctx.drawImage(
        imgRefCropper.current,
        cropData.x,
        cropData.y,
        cropData.width,
        cropData.height,
        0,
        0,
        requiredWidth,
        requiredHeight
      );

      const x = Math.round(cropData.x);
      const y = Math.round(cropData.y);
      const width = Math.round(cropData.width);
      const height = Math.round(cropData.height);

      const cropParams = `crop=dim:[${x},${y},${width},${height}]`;
      const resizedURL = `https://cdn.filestackcontent.com/${cropParams}/${handlePhoto}`;

      setCroppedImgUrl(resizedURL);

      setIsCropperModalOpen(false);
    }
  }, [
    frameSize,
    handlePhoto,
    selectedOptions.typeFrame,
    oneMMInPx,
    cropperInstance,
  ]);

  return (
    <div className={style.modalOverlayCropperFrame}>
      {isLoading ? (
        <div className={style.preloader}>
          <div className={style.loader}></div>
        </div>
      ) : null}

      <div className={style.modalContentCropperFrame}>
        <img
          ref={imgRefCropper}
          src={imgUrlUploaded}
          alt="For cropping"
          crossOrigin="anonymous"
          className={style.hiddenImgForCropper}
        />
      </div>

      <div className={style.containerContent}>
        <div className={style.dpiInformContainer}>
          <span
            className={style.squareDpi}
            style={{ background: dpiColor || "black" }}
          ></span>
          <span>{dpiColor && colorTextMapping[dpiColor]}</span>
        </div>
        <div className={style.tekstInfoFrame}>
          <span className={style.yellowSquare}></span>
          <span>
            The area in this color includes the part of the print that will be
            invisible - it will be wrapped around the cover.
          </span>
        </div>
        <div className={style.containerBtnsCropperFrame}>
          <Button
            className={style.buttonFrameCropper}
            onClick={() => setIsCropperModalOpen(false)}
            text="Cancel"
          />
          <Button
            className={style.buttonFrameCropper}
            onClick={handleCropInPhotopanelCropper}
            text="Crop"
          />
        </div>
      </div>
    </div>
  );
};

export default CropperModal;
