import React, { useRef } from "react";
import style from "./Modal.module.scss";
import Header from "../header/Header";
import FrameWorkArea from "./frameWorkArea/FrameWorkArea";

interface ModalProps {
  setIsConfiguratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOptions: SelectedFrameOptions;
}

const Modal = ({ setIsConfiguratorOpen, selectedOptions }: ModalProps) => {
  const mainContainerRef = useRef<HTMLImageElement>(null);

  return (
    <div className={style.containerModal}>
      <div className={style.wrapperModal}>
        <Header
          setIsConfiguratorOpen={setIsConfiguratorOpen}
          mainContainerRef={mainContainerRef}
        />
        <FrameWorkArea
          selectedOptions={selectedOptions}
          mainContainerRef={mainContainerRef}
        />
      </div>
    </div>
  );
};

export default Modal;
