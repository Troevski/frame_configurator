import { useEffect, useState } from "react";
import "./App.scss";
import Modal from "./modules/modal/Modal";
import { buttonOpenModal } from "./constants/domElements";
import { useGetFrameOptions } from "./hooks/useGetFrameOptions";
import { AppContext } from "./context/context";

function App() {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedFrameOptions>({
    typeFrame: "",
    frameColor: "",
    mode: "",
    frame_height: null,
    frame_width: null,
  });
  const [colorSrcFrameFromInputs, setColorSrcFrameFromInputs] =
    useState<ColorSrcFrameFromInputs>({
      srcHeight: "",
      srcWidth: "",
    });

  useGetFrameOptions({
    setSelectedOptions,
    selectedOptions,
    setColorSrcFrameFromInputs,
  });

  const frameSize = `${colorSrcFrameFromInputs.srcHeight}x${colorSrcFrameFromInputs.srcWidth}`;

  console.log(colorSrcFrameFromInputs);
  const frameCmSize = `${Number(colorSrcFrameFromInputs.srcHeight) * 2.5}x${Number(colorSrcFrameFromInputs.srcWidth) * 2.5}`;

  useEffect(() => {
    const btnOpener = document.getElementById(buttonOpenModal);
    const handleClick = () => setIsConfiguratorOpen((prev) => !prev);

    btnOpener?.addEventListener("click", handleClick);

    return () => btnOpener?.removeEventListener("click", handleClick);
  }, []);

  return (
    <AppContext.Provider
      value={{
        frameSize,
        frameCmSize,
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
