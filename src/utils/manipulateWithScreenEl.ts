import { framePreview } from "../constants/domElements";
import { getDocumentId } from "./getDocumentId";

export const manipulateWithScreenEl = (
  isCreate: boolean,
  screenshot: string
) => {
  const screenshotElement = getDocumentId(framePreview);

  if (screenshotElement) {
    let imgWithScreen = screenshotElement.querySelector("img");

    if (!imgWithScreen) {
      imgWithScreen = document.createElement("img");
      imgWithScreen.style.width = "100%";
      imgWithScreen.style.height = "auto";
      imgWithScreen.style.maxWidth = "300px";
      screenshotElement.appendChild(imgWithScreen);
    }

    imgWithScreen.src = isCreate ? screenshot : "";
    screenshotElement.style.display = isCreate ? "block" : "none";
  }
};
