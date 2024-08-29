import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./Cropper.module.scss";
import { getFrameScale } from "../../utils/getDimensions";
import { AppContext } from "../../context/context";
import { useCheckContext } from "../../hooks/useCheckContext";
import { getInfoToChooseFrameSize } from "../../utils/cropperHelpers";
import Cropper from "cropperjs";
import Button from "../../components/button/Button";
import "cropperjs/dist/cropper.css";

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

  const imgRefCropper = useRef<HTMLImageElement>(null);
  const [cropperInstance, setCropperInstance] = useState<Cropper | null>(null);
  const scale = getFrameScale(frameSize, squareDimensions.width);

  const computeBorderWidth = (cropper: any) => {
    const frameSizes = getInfoToChooseFrameSize(
      frameSize,
      selectedOptions.typeFrame
    );

    const cropBoxData = cropper.getCropBoxData();

    const widthJSONData = frameSizes.photoSize.width * scale;
    const widthCropperDom = cropBoxData.width;

    const ratio = widthCropperDom / widthJSONData;
    return ratio * scale;
  };

  const createYellowBorders = (cropper: any) => {
    const borderWidth = computeBorderWidth(cropper);
    const cropBoxElement = document.querySelector(".cropper-crop-box");

    if (cropBoxElement) {
      const createBorderElement = (width: number) => {
        const div = document.createElement("div");
        div.className = "customBorder";
        Object.assign(div.style, {
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          pointerEvents: "none",
          borderRight: `${width}px solid #fff600`,
          borderLeft: `${width}px solid #fff600`,
          borderTop: `${width}px solid #fff600`,
          borderBottom: `${width}px solid #fff600`,
          opacity: "0.3",
        });
        return div;
      };

      cropBoxElement.appendChild(createBorderElement(borderWidth));
    }
  };

  useEffect(() => {
    console.log("Initializing Cropper");
    const frameSizes = getInfoToChooseFrameSize(
      frameSize,
      selectedOptions.typeFrame
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
        aspectRatio: frameSizes.photoSize.width / frameSizes.photoSize.height,

        ready: function () {
          createYellowBorders(cropper);
          setCropperInstance(cropper);
          setIsLoading(false);
        },
      });

      const handleCropMove = () => {
        const borderWidth = computeBorderWidth(cropper);
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
  }, [imgUrlUploaded, frameSize, selectedOptions.typeFrame, scale]);

  const handleCropInPhotopanelCropper = useCallback(() => {
    const frameSizes = getInfoToChooseFrameSize(
      frameSize,
      selectedOptions.typeFrame
    );
    if (cropperInstance) {
      let cropData = cropperInstance.getData();

      const requiredWidth = frameSizes.photoSize.width * scale;
      const requiredHeight = frameSizes.photoSize.height * scale;

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
    scale,
    cropperInstance,
  ]);

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContentCropperPhotopanel}>
        <img
          ref={imgRefCropper}
          src={imgUrlUploaded}
          alt="For cropping"
          crossOrigin="anonymous"
          className={style.hiddenImgForCropper}
        />
      </div>
      {isLoading ? (
        <div className={style.preloader}>
          <div className={style.loader}></div>
        </div>
      ) : null}

      <div className={style.containerContent}>
        <div className={style.tekstInfoPhotopanel}>
          <span className={style.yellowSquare}></span>
          <span style={{ fontSize: "13px" }}>
            The area in this color includes the part of the print that will be
            invisible - it will be wrapped around the cover.
          </span>
        </div>

        <div className={style.containerWithButtonsCropPhotopanel}>
          <Button
            className={style.buttonCropPhotopanel1}
            onClick={() => setIsCropperModalOpen(false)}
            text="Cancel"
          />
          <Button
            className={style.buttonCropPhotopanel1}
            onClick={handleCropInPhotopanelCropper}
            text="Crop"
          />
        </div>
      </div>
    </div>
  );
};

export default CropperModal;
