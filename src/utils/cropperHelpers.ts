import { DPI_COLORS, FRAME_MODE } from "../constants/enums";
import { getFrameDataDimenssions, getFrameScale } from "./getDimensions";

export const getInfoToChooseFrameSize = (
  frameSize: string,
  frameType: string
) => {
  const rozmiarType = getFrameDataDimenssions(frameSize).sizes;
  let frameTypeInfo = null;

  switch (frameType) {
    case "Regular Frame":
      frameTypeInfo = rozmiarType.regular;
      break;
    case "Matted Frame":
      frameTypeInfo = rozmiarType.matted;
      break;
    case "Floating Frame":
      frameTypeInfo = rozmiarType.float;
      break;
    default:
      throw new Error(`Unknown frame type: ${frameType}`);
  }

  return frameTypeInfo;
};

export const getDpiColor = (dpi: number): DPI_COLORS => {
  if (dpi > 250) {
    return DPI_COLORS.Green;
  } else if (dpi > 150) {
    return DPI_COLORS.Yellow;
  } else {
    return DPI_COLORS.Red;
  }
};
export const computeBorderWidth = (
  cropper: any,
  frameSize: string,
  selectedOptions: SelectedFrameOptions
) => {
  const frameSizes = getInfoToChooseFrameSize(
    frameSize,
    selectedOptions.typeFrame
  );
  const cropBoxData = cropper.getCropBoxData();
  const widthCropperDom = cropBoxData.width;
  const oneMMInPx = getFrameScale(frameSize, widthCropperDom);
  const differenceFrameHidden =
    ((frameSizes.photoSize.width - frameSizes.windowSize?.width!) * oneMMInPx) /
    2;
  const widthJSONData = frameSizes.photoSize.width * oneMMInPx;
  const ratio = widthCropperDom / widthJSONData;

  return ratio * differenceFrameHidden;
};

export const createYellowBorders = (
  cropper: any,
  computeBorderWidth: any,
  frameSize: string,
  selectedOptions: SelectedFrameOptions
) => {
  const borderWidth = computeBorderWidth(cropper, frameSize, selectedOptions);
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
const calculateDpi = (
  widthInPx: number,
  heightInPx: number,
  selectedOptions: SelectedFrameOptions,
  frameSize: string
) => {
  const photoSizes = getInfoToChooseFrameSize(
    frameSize,
    selectedOptions.typeFrame
  );
  const widthInInches =
    selectedOptions.mode === FRAME_MODE.HORIZONTAL
      ? photoSizes.photoSize.height / 25.4
      : photoSizes.photoSize.width / 25.4;

  const heightInInches =
    selectedOptions.mode === FRAME_MODE.HORIZONTAL
      ? photoSizes.photoSize.width / 25.4
      : photoSizes.photoSize.height / 25.4;

  const dpiWidth = widthInPx / widthInInches;
  const dpiHeight = heightInPx / heightInInches;
  return Math.min(dpiWidth, dpiHeight);
};

export const updateDpiColor = (
  cropper: any,
  localCropperScale: number,
  selectedOptions: SelectedFrameOptions,
  setDpiColor: React.Dispatch<React.SetStateAction<DPI_COLORS | null>>,
  frameSize: string
) => {
  if (cropper) {
    const { width, height } = cropper.getCropBoxData();
    const dpi =
      selectedOptions.mode === FRAME_MODE.HORIZONTAL
        ? calculateDpi(
            height * localCropperScale,
            width * localCropperScale,
            selectedOptions,
            frameSize
          )
        : calculateDpi(
            width * localCropperScale,
            height * localCropperScale,
            selectedOptions,
            frameSize
          );
    console.log("dpi", dpi);
    const color = getDpiColor(dpi);
    setDpiColor(color);
  }
};
