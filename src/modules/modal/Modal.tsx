import React from "react";
import style from "./Modal.module.scss";
import Header from "../header/Header";
import FrameWorkArea from "./frameWorkArea/FrameWorkArea";

interface ModalProps {
  setIsConfiguratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOptions: SelectedFrameOptions;
}

const Modal = ({ setIsConfiguratorOpen, selectedOptions }: ModalProps) => {
  return (
    <div className={style.containerModal}>
      <div className={style.wrapperModal}>
        <Header setIsConfiguratorOpen={setIsConfiguratorOpen} />
        <FrameWorkArea selectedOptions={selectedOptions} />
      </div>
    </div>
  );
};

export default Modal;
