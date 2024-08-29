import React from "react";
import Image from "../image/Image";
import style from "./Components.module.scss";
import { useGetFrameDimensions } from "../../hooks/useGetFrameDimensions";
import { FRAME_MODE } from "../../constants/enums";

interface MattedProps {
  srcMatted: string;
  selectedOptions: SelectedFrameOptions;
  imgRef: React.RefObject<HTMLImageElement>;
  mattedSrc: string;
  squareDimensions: SquareDimensionsInt;
}

export const Matted = ({
  srcMatted,
  selectedOptions,
  imgRef,
  mattedSrc,
  squareDimensions,
}: MattedProps) => {
  const { dimensionMatted, dimensions } = useGetFrameDimensions({
    imgRef,
    selectedOptions,
    squareDimensions,
  });
  return (
    <>
      <Image
        src={srcMatted}
        className={`${style.imgContainerMatted} ${selectedOptions.mode === "horizontal" ? `${style.horizontal}` : `${style.vertical}`}`}
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
      />
      <div
        className={style.containerMatted}
        style={{
          width: dimensionMatted.widthWindow,
          height: dimensionMatted.heightWindow,
        }}
      >
        {mattedSrc && (
          <Image
            src={mattedSrc}
            style={{
              width: dimensionMatted.widthPhoto,
              height: dimensionMatted.heightPhoto,
            }}
          />
        )}
      </div>
    </>
  );
};
