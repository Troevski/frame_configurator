import { getFrameCorrectDimenssions } from "./getDimensions";

export const getInfoToChooseFrameSize = (
  frameSize: string,
  frameType: string
) => {
  const rozmiarType = getFrameCorrectDimenssions(frameSize).sizes;
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
