import { DPI_COLORS } from "./enums";

export const configuratorSizes: ConfiguratorSizes = {
  "5x7": {
    frameSize: { height: 180, width: 230 },
    sizes: {
      regular: {
        windowSize: { height: 122, width: 172 },
        photoSize: { height: 130, width: 180 },
      },
      matted: {
        windowSize: { height: 101, width: 152 },
        photoSize: { height: 104.6, width: 155.4 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 0, width: 0 },
      },
    },
  },
  "8x10": {
    frameSize: { height: 250, width: 300 },
    sizes: {
      regular: {
        windowSize: { height: 192, width: 242 },
        photoSize: { height: 200, width: 250 },
      },
      matted: {
        windowSize: { height: 127, width: 177 },
        photoSize: { height: 130, width: 180.8 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 114, width: 164 },
      },
    },
  },
  "8x12": {
    frameSize: { height: 250, width: 350 },
    sizes: {
      regular: {
        windowSize: { height: 192, width: 292 },
        photoSize: { height: 200, width: 300 },
      },
      matted: {
        windowSize: { height: 152, width: 228 },
        photoSize: { height: 155.4, width: 231.6 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 0, width: 0 },
      },
    },
  },
  "10x10": {
    frameSize: { height: 300, width: 300 },
    sizes: {
      regular: {
        windowSize: { height: 242, width: 242 },
        photoSize: { height: 250, width: 250 },
      },
      matted: {
        windowSize: { height: 203, width: 203 },
        photoSize: { height: 206.2, width: 206.2 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 190, width: 190 },
      },
    },
  },
  "11x14": {
    frameSize: { height: 330, width: 410 },
    sizes: {
      regular: {
        windowSize: { height: 272, width: 352 },
        photoSize: { height: 280, width: 360 },
      },
      matted: {
        windowSize: { height: 203, width: 254 },
        photoSize: { height: 206.2, width: 257 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 169, width: 241 },
      },
    },
  },
  "12x16": {
    frameSize: { height: 350, width: 450 },
    sizes: {
      regular: {
        windowSize: { height: 292, width: 392 },
        photoSize: { height: 300, width: 400 },
      },
      matted: {
        windowSize: { height: 203, width: 304 },
        photoSize: { height: 206.2, width: 307.8 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 190, width: 291 },
      },
    },
  },
  "12x18": {
    frameSize: { height: 350, width: 500 },
    sizes: {
      regular: {
        windowSize: { height: 292, width: 442 },
        photoSize: { height: 300, width: 450 },
      },
      matted: {
        windowSize: { height: 203, width: 304 },
        photoSize: { height: 206.2, width: 307.8 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 190, width: 291 },
      },
    },
  },
  "16x24": {
    frameSize: { height: 450, width: 650 },
    sizes: {
      regular: {
        windowSize: { height: 392, width: 592 },
        photoSize: { height: 400, width: 600 },
      },
      matted: {
        windowSize: { height: 304, width: 457 },
        photoSize: { height: 307.8, width: 460.2 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 266, width: 419 },
      },
    },
  },
  "20x24": {
    frameSize: { height: 550, width: 650 },
    sizes: {
      regular: {
        windowSize: { height: 492, width: 592 },
        photoSize: { height: 500, width: 600 },
      },
      matted: {
        windowSize: { height: 406, width: 508 },
        photoSize: { height: 409.4, width: 511 },
      },
      float: {
        windowSize: null,
        photoSize: { height: 292, width: 445 },
      },
    },
  },
};

export const framesMapperSrc: Record<string, string> = {
  "Lightwood Pine": "light_wood",
  "Darkwood Pine": "dark_wood",
  "Barnwood Pine": "barn_wood",
  "White Pine": "white_pine",
  "Black Pine": "black_pine",
  "Graphite Pine": "graphite_pine",
  "Classic Oak": "classic_oak",
  "Regular Frame": "regular",
  "Matted Frame": "matted",
  "Floating Frame": "floating",
};

export const sourcesToUpload = ["local_file_system", "dropbox", "googledrive"];

export const colorTextMapping = {
  [DPI_COLORS.Green]: "The photo quality is high enough for printing.",
  [DPI_COLORS.Yellow]: "The photo quality is acceptable, but not perfect.",
  [DPI_COLORS.Red]: "The photo quality is too low for good print quality.",
};
