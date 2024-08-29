import { manipulateWithScreenEl } from "./manipulateWithScreenEl";
import html2canvas from "html2canvas";

export const captureScreen = (containerOkladkaRef: React.RefObject<any>) => {
  return new Promise((resolve, reject) => {
    if (!containerOkladkaRef.current) {
      console.error("Element not found");

      reject("Element not found");
      return;
    }

    setTimeout(() => {
      html2canvas(containerOkladkaRef.current, {
        useCORS: true,
        allowTaint: true,
      })
        .then((canvas) => {
          const screenshot = canvas.toDataURL();
          manipulateWithScreenEl(true, screenshot);
          resolve(screenshot);
        })
        .catch((error) => {
          console.error("Error capturing screen:", error);
          reject(error);
        });
    }, 200);
  });
};
