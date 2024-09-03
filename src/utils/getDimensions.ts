import { configuratorSizes } from "../constants/global";
import { FRAME_MODE, TYPE_FRAME } from "../constants/enums";

export const getFrameDataDimenssions = (frameKey: string) =>
  configuratorSizes[frameKey];

export const calculateOneCm = (frame: number, containerWidth: number) => {
  const oneCM = containerWidth / (frame * 2.5);
  return { oneCM };
};

export const getCorrectAspectRatio = (
  frameKey: string,
  type: string,
  selectedOptions: SelectedFrameOptions
) => {
  const frameConfig = configuratorSizes[frameKey];
  let firstRatio, secRatio, finalRatio;

  if (type === FRAME_MODE.HORIZONTAL) {
    if (selectedOptions.typeFrame === TYPE_FRAME.REGULAR_FRAME) {
      firstRatio = frameConfig.sizes.regular.photoSize.width * 118;
      secRatio = frameConfig.sizes.regular.photoSize.height * 118;
      finalRatio = firstRatio / secRatio;
    } else if (selectedOptions.typeFrame === TYPE_FRAME.MATTED_FRAME) {
      firstRatio = frameConfig.sizes.matted.photoSize.width * 118;
      secRatio = frameConfig.sizes.matted.photoSize.height * 118;
      finalRatio = firstRatio / secRatio;
    } else {
      firstRatio = frameConfig.sizes.float.photoSize.width * 118;
      secRatio = frameConfig.sizes.float.photoSize.height * 118;
      finalRatio = firstRatio / secRatio;
    }
  } else {
    if (selectedOptions.typeFrame === TYPE_FRAME.REGULAR_FRAME) {
      firstRatio = frameConfig.sizes.regular.photoSize.height * 118;
      secRatio = frameConfig.sizes.regular.photoSize.width * 118;
      finalRatio = firstRatio / secRatio;
    } else if (selectedOptions.typeFrame === TYPE_FRAME.MATTED_FRAME) {
      firstRatio = frameConfig.sizes.matted.photoSize.height * 118;
      secRatio = frameConfig.sizes.matted.photoSize.width * 118;
      finalRatio = firstRatio / secRatio;
    } else {
      firstRatio = frameConfig.sizes.float.photoSize.height * 118;
      secRatio = frameConfig.sizes.float.photoSize.width * 118;
      finalRatio = firstRatio / secRatio;
    }
  }
  return finalRatio;
};

export const getFrameScale = (frameKey: string, frameSize: number) => {
  const frameConfig = configuratorSizes[frameKey];
  const { width } = frameConfig.frameSize;
  let scale = 0;
  scale = frameSize / width;
  return scale;
};

export const getFrameDimensions = (
  frameKey: string,
  scale: number,
  selectedOptions: SelectedFrameOptions,
  setDimensions: React.Dispatch<React.SetStateAction<DimensionsWindow>>
) => {
  const { mode } = selectedOptions;
  const { width: windowWidth, height: windowHeight } =
    configuratorSizes[frameKey].sizes.regular.windowSize;
  const { width: photoWidth, height: photoHeight } =
    configuratorSizes[frameKey].sizes.regular.photoSize;

  if (mode === FRAME_MODE.HORIZONTAL) {
    setDimensions((prev) => ({
      ...prev,
      widthWindow: windowWidth * scale,
      heightWindow: windowHeight * scale,
      widthPhoto: photoWidth * scale,
      heightPhoto: photoHeight * scale,
    }));
  } else if (mode === FRAME_MODE.VERTICAL) {
    setDimensions((prev) => ({
      ...prev,
      heightWindow: windowWidth * scale,
      widthWindow: windowHeight * scale,
      widthPhoto: photoHeight * scale,
      heightPhoto: photoWidth * scale,
    }));
  } else {
    console.error("No mode exist");
  }
};

export const getMattedDimensions = (
  frameKey: string,
  scale: number,
  selectedOptions: SelectedFrameOptions,
  setDimensionsMatted: React.Dispatch<React.SetStateAction<DimensionsWindow>>
) => {
  const { mode } = selectedOptions;
  const { width: windowWidth, height: windowHeight } =
    configuratorSizes[frameKey].sizes.matted.windowSize;
  const { width: photoWidth, height: photoHeight } =
    configuratorSizes[frameKey].sizes.matted.photoSize;

  if (mode === FRAME_MODE.HORIZONTAL) {
    setDimensionsMatted((prev) => ({
      ...prev,
      widthWindow: windowWidth * scale,
      heightWindow: windowHeight * scale,
      widthPhoto: photoWidth * scale,
      heightPhoto: photoHeight * scale,
    }));
  } else {
    setDimensionsMatted((prev) => ({
      ...prev,
      heightWindow: windowWidth * scale,
      widthWindow: windowHeight * scale,
      widthPhoto: photoHeight * scale,
      heightPhoto: photoWidth * scale,
    }));
  }
};

export const getFloatDimensions = (
  frameKey: string,
  scale: number,
  selectedOptions: SelectedFrameOptions,
  setDimensionsFloat: React.Dispatch<React.SetStateAction<FloatDimensions>>
) => {
  const { mode } = selectedOptions;

  const { width: photoWidth, height: photoHeight } =
    configuratorSizes[frameKey].sizes.float.photoSize;

  if (mode === FRAME_MODE.HORIZONTAL) {
    setDimensionsFloat((prev) => ({
      ...prev,
      widthPhoto: photoWidth * scale,
      heightPhoto: photoHeight * scale,
    }));
  } else {
    setDimensionsFloat((prev) => ({
      ...prev,
      widthPhoto: photoHeight * scale,
      heightPhoto: photoWidth * scale,
    }));
  }
};
