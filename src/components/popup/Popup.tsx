import React from "react";
import style from "./Popup.module.scss";
import Button from "../button/Button";

interface PopupProps {
  children: React.ReactNode;
  titleCloseModal?: string;
  onClosePopup?: () => void;
  onCloseModal?: any;
  buttonClassName?: string;
}

const Popup = ({
  children,
  titleCloseModal,
  onClosePopup,
  onCloseModal,
  buttonClassName,
}: PopupProps) => {
  return (
    <div className={style.mainPopupContainer}>
      <div className={style.wrapperPopup}>
        <div className={style.contentPopup}>
          <div className={style.containerCloseModal}>
            <span>{titleCloseModal}</span>
            <span onClick={onClosePopup} className={style.crossExit}></span>
            <span className={style.lineBottom}></span>
          </div>
          {children}
          <Button
            text="Close configurator"
            onClick={onCloseModal}
            className={buttonClassName}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
