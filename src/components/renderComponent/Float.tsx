import React from "react";
import { Uploader } from "../../modules/uploader/Uploader";
import style from "./Components.module.scss";
import Image from "../image/Image";
import { FRAME_MODE } from "../../constants/enums";
import { useGetFrameDimensions } from "../../hooks/useGetFrameDimensions";

interface FloatProps {
  srcFloated: string;
  selectedOptions: SelectedFrameOptions;
  imgRef: React.RefObject<HTMLImageElement>;
  floatedUploadedSrc: string;
  squareDimensions: SquareDimensionsInt;
}

export const Float = ({
  srcFloated,
  selectedOptions,
  imgRef,
  floatedUploadedSrc,
  squareDimensions,
}: FloatProps) => {
  const { dimensions, dimensionFloat } = useGetFrameDimensions({
    imgRef,
    selectedOptions,
    squareDimensions,
  });

  return (
    <>
      <Image
        src={srcFloated}
        style={{
          width:
            selectedOptions.mode === FRAME_MODE.HORIZONTAL
              ? dimensions.widthWindow
              : dimensions.heightWindow,
          height:
            selectedOptions.mode === FRAME_MODE.HORIZONTAL
              ? dimensions.heightWindow
              : dimensions.widthWindow,
        }}
        className={
          selectedOptions.mode === "horizontal"
            ? style.horizontal
            : style.vertical
        }
      />
      <div
        className={style.containerMatted}
        style={{
          width: dimensionFloat.widthPhoto,
          height: dimensionFloat.heightPhoto,
        }}
      >
        {floatedUploadedSrc && (
          <Image src={floatedUploadedSrc} className={style.imgUploadedFloat} />
        )}
      </div>
    </>
  );
};
