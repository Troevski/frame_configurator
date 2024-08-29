import { tokenSaveInpuId } from "../constants/domElements";
import { getDocumentId } from "./getDocumentId";

export const manageTokenInput = (
  isClear: boolean,
  uploadedImgHandle?: string
) => {
  const inputSaveHandle = getDocumentId(tokenSaveInpuId) as HTMLInputElement;

  if (inputSaveHandle) {
    return (inputSaveHandle.value = isClear ? "" : uploadedImgHandle || "");
  }
};
