import { useCallback, useEffect } from "react";
import { getDocumentId } from "../utils/getDocumentId";
import { FRAME_MODE } from "../constants/enums";
import { manageTokenInput } from "../utils/clearTokenInput";
import { selectOrientationId } from "../constants/domElements";
import { manipulateWithScreenEl } from "../utils/manipulateWithScreenEl";

interface GetPropsFrameOptions {
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<SelectedFrameOptions>
  >;
  setColorSrcFrameFromInputs: React.Dispatch<
    React.SetStateAction<ColorSrcFrameFromInputs>
  >;
  selectedOptions: SelectedFrameOptions;
  colorSrcFrameFromInputs: ColorSrcFrameFromInputs;
}

export const useGetFrameOptions = ({
  setSelectedOptions,
  setColorSrcFrameFromInputs,
  selectedOptions,
  colorSrcFrameFromInputs,
}: GetPropsFrameOptions) => {
  useEffect(() => {
    const frame_width = getDocumentId("frame_width") as HTMLInputElement;
    const frame_height = getDocumentId("frame_height") as HTMLInputElement;

    if (frame_height && frame_width) {
      // for src colors which are not changing
      setColorSrcFrameFromInputs((prev) => ({
        ...prev,
        srcHeight: frame_height.value,
        srcWidth: frame_width.value,
      }));

      // for changing dimensions depending on frame mode
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

  // disable floating
  useEffect(() => {
    const option1 = getDocumentId(
      "SingleOptionSelector-0"
    ) as HTMLSelectElement;

    if (option1) {
      const floatingFrameOption = Array.from(option1.options).find(
        (option) => option.value === "Floating Frame"
      );

      if (floatingFrameOption) {
        const shouldDisable =
          (colorSrcFrameFromInputs.srcHeight === "5" &&
            colorSrcFrameFromInputs.srcWidth === "7") ||
          (colorSrcFrameFromInputs.srcHeight === "8" &&
            colorSrcFrameFromInputs.srcWidth === "12");

        floatingFrameOption.disabled = shouldDisable;
      }
    }
  }, [colorSrcFrameFromInputs]);

  const handleChangeSelect = useCallback(
    (e: any) => {
      const value = e.target.value;
      const id = e.target.id;
      if (id === "SingleOptionSelector-0") {
        console.log("value", value);

        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          typeFrame: value,
        }));
      } else if (id === "SingleOptionSelector-1") {
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          frameColor: value,
        }));
      } else if (id === "select_orientation") {
        setSelectedOptions((prevOptions) => ({
          ...prevOptions,
          mode: value,
        }));
      }
    },
    [setSelectedOptions]
  );

  useEffect(() => {
    const selectTypeFrame = getDocumentId(
      "SingleOptionSelector-0"
    ) as HTMLSelectElement;
    const selectColorFrame = getDocumentId(
      "SingleOptionSelector-1"
    ) as HTMLSelectElement;
    const selectModeFrame = getDocumentId(
      "select_orientation"
    ) as HTMLSelectElement;

    if (!selectColorFrame || !selectTypeFrame || !selectModeFrame) return;

    setSelectedOptions((prev) => ({
      ...prev,
      typeFrame: selectTypeFrame.value,
      frameColor: selectColorFrame.value,
      mode: selectModeFrame.value,
    }));

    selectTypeFrame.addEventListener("change", handleChangeSelect);
    selectColorFrame.addEventListener("change", handleChangeSelect);
    selectModeFrame.addEventListener("change", handleChangeSelect);

    return () => {
      selectTypeFrame.removeEventListener("change", handleChangeSelect);
      selectColorFrame.removeEventListener("change", handleChangeSelect);
      selectModeFrame.removeEventListener("change", handleChangeSelect);
    };
  }, [handleChangeSelect]);

  //clear token input
  useEffect(() => {
    manageTokenInput(true);
    manipulateWithScreenEl(false, "");
  }, [selectedOptions]);
};
