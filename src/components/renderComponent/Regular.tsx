import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Image from "../image/Image";
import style from "./Components.module.scss";
import {
  calculateOneCm,
  getCorrectMmSize,
  getImgScale,
} from "../../utils/getDimensions";
import { useCheckContext } from "../../hooks/useCheckContext";
import { AppContext } from "../../context/context";
import { FRAME_MODE } from "../../types/enums";
import { Uploader } from "../../modules/uploader/Uploader";

interface RegularProps {
  regularSrc: string;
  imgRef: React.RefObject<HTMLImageElement>;
  selectedOptions: SelectedFrameOptions;
  setImgUploaded: () => void;
}
export const Regular = ({
  regularSrc,
  imgRef,
  selectedOptions,
  setImgUploaded,
}: RegularProps) => {
  const [offset, setOfset] = useState<number>(0);
  const context = useContext(AppContext);
  const { frameSize, frameCmSize } = useCheckContext(context);
  const [scaleImg, setScaleImg] = useState("");

  useLayoutEffect(() => {
    if (imgRef.current && selectedOptions.mode) {
      const splittedFrameCmSIze = frameCmSize.split("x")[1];
      const finallMM = getCorrectMmSize(frameSize, selectedOptions.mode);
      const { oneCM: offset } = calculateOneCm(
        splittedFrameCmSIze,
        imgRef.current.offsetWidth
      );
      const scale = getImgScale(
        frameSize,
        selectedOptions,
        frameCmSize,
        imgRef.current.offsetWidth
      );
      const finalOffset = (finallMM / 10) * offset;

      setScaleImg(scale);
      setOfset(finalOffset * 2);
    }
  }, [imgRef, frameSize, selectedOptions, frameCmSize]);

  const styles = {
    bottom: offset,
    top: offset,
    right: offset,
    left: offset,
  };

  return (
    <>
      {
        <Uploader
          setImgUrl={setImgUploaded}
          selectedOptions={selectedOptions}
        />
      }

      <div
        style={{ ...styles }}
        className={`${style.containerRegular} ${selectedOptions.mode === FRAME_MODE.HORIZONTAL ? `${style.horizontal}` : `${style.vertical}`}`}
      >
        {regularSrc && <Image src={regularSrc} className={scaleImg} />}
      </div>
    </>
  );
};
