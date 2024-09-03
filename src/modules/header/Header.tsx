import React, { useCallback, useContext, useState } from "react";
import Button from "../../components/button/Button";
import style from "./Header.module.scss";
import Image from "../../components/image/Image";
import Popup from "../../components/popup/Popup";
import logo from "../../icons/Logo.png";
import { AppContext } from "../../context/context";
import { useCheckContext } from "../../hooks/useCheckContext";
import { manageTokenInput } from "../../utils/clearTokenInput";
import { captureScreen } from "../../utils/captureScreen";
import { Links } from "../../constants/links";
import useCloseEscModal from "../../hooks/useCloseEscModal";

interface HeaderProps {
  setIsConfiguratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mainContainerRef: React.RefObject<HTMLDivElement>;
}

const Header = ({ setIsConfiguratorOpen, mainContainerRef }: HeaderProps) => {
  const [isPopupVisable, setIsPopupVisable] = useState(false);
  const context = useContext(AppContext);
  const { uploadedImgHandle } = useCheckContext(context);

  const handleSave = useCallback(async () => {
    if (!mainContainerRef.current) return;
    manageTokenInput(false, uploadedImgHandle);
    await captureScreen(mainContainerRef);
    setIsConfiguratorOpen(false);
  }, [uploadedImgHandle, mainContainerRef]);

  const onCloseModal = useCallback(() => {
    setIsConfiguratorOpen(false);
  }, [uploadedImgHandle]);

  useCloseEscModal(setIsPopupVisable);

  const handleCloseClick = () => setIsPopupVisable(!isPopupVisable);
  const handleCloseExitModal = useCallback(() => setIsPopupVisable(false), []);

  const popupContent = (
    <div className={style.containerPopupContent}>
      <p className={style.paragraphPopupFirst}>
        Please note that you are leaving the frame creator.
        <br /> Your photo frame will not be saved.
      </p>
      <p className={style.paragraphPopupSecond}>
        Are you sure You want to leave?
      </p>
    </div>
  );

  return (
    <header className={style.headerMainContainer}>
      <div className={style.wrapperContentHeader}>
        <div
          className={style.coontainerWithWyjdzTxt}
          onClick={handleCloseClick}
        >
          <Image src={Links.iconExistLeft} alt="icon" height={16} />
          <span className={style.headerWyjdzTxt}>Close configurator</span>
        </div>
        <Image src={Links.logo} alt="logo" className={style.logo} />
        <Button
          onClick={handleSave}
          text="Save frame"
          className={style.headerButtonZamow}
        />
      </div>
      {isPopupVisable && (
        <Popup
          titleCloseModal="Exit creator"
          onClosePopup={handleCloseExitModal}
          buttonClassName={style.buttonClassName}
          onCloseModal={onCloseModal}
        >
          {popupContent}
        </Popup>
      )}
    </header>
  );
};

export default React.memo(Header);
