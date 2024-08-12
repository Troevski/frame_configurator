import { framesMapperSrc } from "../constants/global";
import { FRAME_MODE, IMG_TYPE, TYPE_FRAME } from "../types/enums";

interface VariablesForSrcTypes {
  selectedOptions: SelectedFrameOptions;
  frameSize: string;
}

export const getFrameLink = (
  frameSize: string,
  name: string,
  imgType: string
) =>
  `https://snapalbums.pl/apps/shpfsnapalbums/frames/${frameSize}_${name}.${imgType}`;

export const getColorFrameSrc = ({
  selectedOptions,
  frameSize,
}: VariablesForSrcTypes) => {
  const frameColorName = framesMapperSrc[selectedOptions.frameColor];
  const frameTypeName = framesMapperSrc[selectedOptions.typeFrame];
  const frameImgType =
    selectedOptions.typeFrame === TYPE_FRAME.MATTED_FRAME
      ? IMG_TYPE.PNG
      : IMG_TYPE.JPG;
  const frameColorSrc = getFrameLink(frameSize, frameColorName, IMG_TYPE.JPG);
  const frameTypeSrc = getFrameLink(frameSize, frameTypeName, frameImgType);

  return { frameColorSrc, frameTypeSrc };
};
