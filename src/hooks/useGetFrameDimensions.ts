import { useContext, useEffect, useState } from "react";
import { useCheckContext } from "./useCheckContext";
import { AppContext } from "../context/context";
import {
  getFloatDimensions,
  getFrameDimensions,
  getFrameScale,
  getMattedDimensions,
} from "../utils/getDimensions";
import { TYPE_FRAME } from "../constants/enums";

interface UseGetFrameDimensions {
  imgRef: React.RefObject<HTMLElement>;
  selectedOptions: SelectedFrameOptions;
  squareDimensions: SquareDimensionsInt;
}

export const useGetFrameDimensions = ({
  imgRef,
  selectedOptions,
  squareDimensions,
}: UseGetFrameDimensions) => {
  const [dimensions, setDimensions] = useState<DimensionsWindow>({
    widthWindow: 0,
    heightWindow: 0,
    widthPhoto: 0,
    heightPhoto: 0,
  });
  const [dimensionMatted, setDimensionsMatted] = useState<DimensionsWindow>({
    widthWindow: 0,
    heightWindow: 0,
    widthPhoto: 0,
    heightPhoto: 0,
  });

  const [dimensionFloat, setDimensionsFloat] = useState<FloatDimensions>({
    widthPhoto: 0,
    heightPhoto: 0,
  });

  const context = useContext(AppContext);
  const { frameSize } = useCheckContext(context);

  useEffect(() => {
    if (imgRef.current && selectedOptions.mode) {
      const scale = getFrameScale(frameSize, squareDimensions.width);

      getFrameDimensions(frameSize, scale, selectedOptions, setDimensions);
    }
  }, [frameSize, imgRef, squareDimensions, selectedOptions]);

  useEffect(() => {
    if (
      imgRef.current &&
      selectedOptions.mode &&
      selectedOptions.typeFrame === TYPE_FRAME.MATTED_FRAME
    ) {
      const scale = getFrameScale(frameSize, squareDimensions.width);

      getMattedDimensions(
        frameSize,
        scale,
        selectedOptions,
        setDimensionsMatted
      );
    }
  }, [frameSize, imgRef, selectedOptions, squareDimensions]);

  useEffect(() => {
    if (
      imgRef.current &&
      selectedOptions.mode &&
      selectedOptions.typeFrame === TYPE_FRAME.FLOATING_FRAME
    ) {
      const scale = getFrameScale(frameSize, squareDimensions.width);

      getFloatDimensions(frameSize, scale, selectedOptions, setDimensionsFloat);
    }
  }, [frameSize, imgRef, selectedOptions, squareDimensions]);

  return { dimensions, dimensionMatted, dimensionFloat };
};
