import React, { useEffect, useState } from "react";
import "./App.scss";
import Modal from "./modules/modal/Modal";
import { buttonOpenModal } from "./constants/domElements";
import { useGetFrameOptions } from "./hooks/useGetFrameOptions";
import { AppContext } from "./context/context";
import { manageTokenInput } from "./utils/clearTokenInput";
import { manipulateWithScreenEl } from "./utils/manipulateWithScreenEl";

function App() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedFrameOptions>({
    typeFrame: "",
    frameColor: "",
    mode: "",
    frame_height: null,
    frame_width: null,
  });

  const [uploadedImgHandle, setUploadedImgHandle] = useState<string>("");
  const [colorSrcFrameFromInputs, setColorSrcFrameFromInputs] =
    useState<ColorSrcFrameFromInputs>({
      srcHeight: "",
      srcWidth: "",
    });

  useGetFrameOptions({
    setSelectedOptions,
    selectedOptions,
    setColorSrcFrameFromInputs,
    colorSrcFrameFromInputs,
  });
  const frameSize = `${colorSrcFrameFromInputs.srcHeight}x${colorSrcFrameFromInputs.srcWidth}`;
  const frameCmSize = `${Number(colorSrcFrameFromInputs.srcHeight) * 2.5}x${Number(colorSrcFrameFromInputs.srcWidth) * 2.5}`;

  useEffect(() => {
    const btnOpener = document.getElementById(buttonOpenModal);
    const handleClick = () => {
      manageTokenInput(true);
      manipulateWithScreenEl(false, "");

      setIsConfiguratorOpen((prev) => !prev);
    };

    btnOpener?.addEventListener("click", handleClick);

    return () => btnOpener?.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    console.log(selectedOptions);
  }, [selectedOptions]);
  return (
    <AppContext.Provider
      value={{
        frameSize,
        frameCmSize,
        setUploadedImgHandle,
        uploadedImgHandle,
        setIsConfiguratorOpen,
      }}
    >
      {isConfiguratorOpen ? (
        <Modal
          setIsConfiguratorOpen={setIsConfiguratorOpen}
          selectedOptions={selectedOptions}
        />
      ) : null}
    </AppContext.Provider>
  );
}

export default App;
