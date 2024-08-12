import { configuratorSizes } from "../constants/global";
import { FRAME_MODE } from "../types/enums";

export const getCorrectMmSize = (frameKey: string, type: string) => {
  const frameConfig = configuratorSizes[frameKey];
  let sizeFrameMM, sizeWindowInFrame, finalMM;

  if (type === FRAME_MODE.HORIZONTAL) {
    sizeFrameMM = frameConfig.frameSize.width;
    sizeWindowInFrame = frameConfig.sizes.regular.windowSize.width;
  } else {
    sizeFrameMM = frameConfig.frameSize.height;
    sizeWindowInFrame = frameConfig.sizes.regular.windowSize.height;
  }
  finalMM = (sizeFrameMM - sizeWindowInFrame) / 2;

  return finalMM;
};

export const calculateOneCm = (frame: number, containerWidth: number) => {
  const oneCM = containerWidth / (frame * 2.5);
  return { oneCM };
};

export const getCorrectAspectRatio = (frameKey: string, type: string) => {
  const frameConfig = configuratorSizes[frameKey];
  let firstRatio, secRatio, finalRatio;

  if (type === FRAME_MODE.HORIZONTAL) {
    firstRatio = frameConfig.sizes.regular.photoSize.width * 118;
    secRatio = frameConfig.sizes.regular.photoSize.height * 118;
    finalRatio = firstRatio / secRatio;
  } else {
    firstRatio = frameConfig.sizes.regular.photoSize.height * 118;
    secRatio = frameConfig.sizes.regular.photoSize.width * 118;
    finalRatio = firstRatio / secRatio;
  }
  return finalRatio;
};

export const getImgScale = (
  frameKey: string,
  selectedOptions: SelectedFrameOptions,
  frameCmSize: string,
  containerWidth: number
) => {
  let x, y;
  const frameConfig = configuratorSizes[frameKey];
  const splittedCm = Number(frameCmSize.split("x")[1]);
  const { oneCM } = calculateOneCm(splittedCm, containerWidth);
  const dimension = (8 / 10) * oneCM;
  const sconfigFromJson = frameConfig.sizes.regular.photoSize;

  x = (dimension * 100) / sconfigFromJson.width + 100;
  y = (dimension * 100) / sconfigFromJson.height + 100;

  return `scale(${selectedOptions.mode === FRAME_MODE.HORIZONTAL ? `${x}%, ${y}%` : `${x}%, ${y}%`})`;
};
