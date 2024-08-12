import { useCallback, useEffect } from "react";
import { getDocumentId } from "../utils/getDocumentId";
import { FRAME_MODE } from "../types/enums";

interface GetPropsFrameOptions {
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<SelectedFrameOptions>
  >;
  setColorSrcFrameFromInputs: React.Dispatch<
    React.SetStateAction<ColorSrcFrameFromInputs>
  >;
  selectedOptions: SelectedFrameOptions;
}

export const useGetFrameOptions = ({
  setSelectedOptions,
  setColorSrcFrameFromInputs,
  selectedOptions,
}: GetPropsFrameOptions) => {
  const handleSelectChange = useCallback(
    (e: Event) => {
      const target = e.target as HTMLSelectElement;
      const value = target.value;
      const index = target.getAttribute("data-index");

      setSelectedOptions((prevOptions) => {
        switch (index) {
          case "option1":
            return { ...prevOptions, typeFrame: value };
          case "option2":
            return { ...prevOptions, frameColor: value };
          case "frameMode":
            return { ...prevOptions, mode: value };
          default:
            return prevOptions;
        }
      });
    },
    [setSelectedOptions]
  );

  useEffect(() => {
    const option1 = getDocumentId(
      "SingleOptionSelector-0"
    ) as HTMLSelectElement;
    const option2 = getDocumentId(
      "SingleOptionSelector-1"
    ) as HTMLSelectElement;
    const frameMode = getDocumentId("frameModeSelect") as HTMLSelectElement;

    if (option1) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        typeFrame: option1.value,
      }));
      option1.addEventListener("change", handleSelectChange);
    }

    if (option2) {
      setSelectedOptions((prevOptions) => ({
        ...prevOptions,
        frameColor: option2.value,
      }));
      option2.addEventListener("change", handleSelectChange);
    }

    if (frameMode) {
      console.log("frame mode finded");
      setSelectedOptions((prev) => ({
        ...prev,
        mode: frameMode.value,
      }));
      frameMode.addEventListener("change", handleSelectChange);
    }
    return () => {
      option1?.removeEventListener("change", handleSelectChange);
      option2?.removeEventListener("change", handleSelectChange);
      frameMode?.removeEventListener("change", handleSelectChange);
    };
  }, [handleSelectChange]);

  useEffect(() => {
    const frame_width = getDocumentId("frame_width") as HTMLInputElement;
    const frame_height = getDocumentId("frame_height") as HTMLInputElement;

    if (frame_height && frame_width) {
      //for src colors which are not changing
      setColorSrcFrameFromInputs((prev) => ({
        ...prev,
        srcHeight: frame_height.value,
        srcWidth: frame_width.value,
      }));

      //for changing dimensions depending on frame mode
      setSelectedOptions((prev) => ({
        ...prev,
        frame_height:
          selectedOptions.mode === FRAME_MODE.HORIZONTAL
            ? frame_height.value
            : frame_width.value,
        frame_width:
          selectedOptions.mode === FRAME_MODE.HORIZONTAL
            ? frame_width.value
            : frame_height.value,
      }));
    }
  }, [setSelectedOptions, selectedOptions.mode]);
};
