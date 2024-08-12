interface Size {
  width: number;
  height: number;
}

interface PhotoSize extends Size {
  dimensions?: string;
}

interface Sizes {
  regular: {
    windowSize: Size;
    photoSize: PhotoSize;
  };
  matted: {
    windowSize: Size;
    photoSize: PhotoSize;
  };
  float: {
    windowSize: Size | null;
    photoSize: Size | null;
  };
}

interface FrameSize {
  frameSize: Size;
  sizes: Sizes;
}

interface ConfiguratorSizes {
  [key: string]: FrameSize;
}

interface SelectedFrameOptions {
  typeFrame: string;
  frameColor: string;
  mode: string | null;
  frame_height: string | null;
  frame_width: string | null;
}

interface ColorSrcFrameFromInputs {
  srcHeight: string;
  srcWidth: string;
}
