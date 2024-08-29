import React from "react";
import Image from "../image/Image";
import style from "./Components.module.scss";
import { useGetFrameDimensions } from "../../hooks/useGetFrameDimensions";

interface RegularProps {
  regularSrc: string;
  imgRef: React.RefObject<HTMLImageElement>;
  selectedOptions: SelectedFrameOptions;
  squareDimensions: SquareDimensionsInt;
}
export const Regular = ({
  regularSrc,
  imgRef,
  selectedOptions,
  squareDimensions,
}: RegularProps) => {
  const { dimensions } = useGetFrameDimensions({
    imgRef,
    selectedOptions,
    squareDimensions,
  });

  return (
    <>
      {regularSrc && (
        <Image
          src={regularSrc}
          style={{
            width: dimensions.widthPhoto,
            height: dimensions.heightPhoto,
          }}
          className={style.imgContainerWindow}
        />
      )}
    </>
  );
};
