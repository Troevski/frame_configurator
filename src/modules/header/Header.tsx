import React, { useCallback, useState } from "react";
import Button from "../../components/button/Button";
import style from "./Header.module.scss";
import Image from "../../components/image/Image";
import Popup from "../../components/popup/Popup";
import logo from "../../icons/Logo.png";

interface HeaderProps {
  setIsConfiguratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setIsConfiguratorOpen }: HeaderProps) => {
  const [isPopupVisable, setIsPopupVisable] = useState(false);

  const handleZamow = useCallback(() => console.log("clicked zamow"), []);
  const handleCloseClick = () => setIsPopupVisable(!isPopupVisable);
  const handleCloseExitModal = useCallback(() => setIsPopupVisable(false), []);

  const popupContent = (
    <div className={style.containerPopupContent}>
      <p>
        Please note that you are leaving the print uploader,
        <br /> Your photos will not be saved and will not be added to your cart.
      </p>
      <p>Are you sure you want to leave?</p>
    </div>
  );

  return (
    <header className={style.headerMainContainer}>
      <div className={style.wrapperContentHeader}>
        <div
          className={style.coontainerWithWyjdzTxt}
          onClick={handleCloseClick}
        >
          <Image
            src="https://cdn.shopify.com/s/files/1/0061/8967/8695/t/10/assets/photouploader_left_arrow.svg"
            alt=""
            height={16}
          />
          <span className={style.headerWyjdzTxt}>Close configurator</span>
        </div>
        <Image src={logo} alt="" />
        <Button
          onClick={handleZamow}
          text="Save frame"
          className={style.headerButtonZamow}
        />
      </div>
      {isPopupVisable && (
        <Popup
          titleCloseModal="Exit configurator"
          onClosePopup={handleCloseExitModal}
          buttonClassName={style.buttonClassName}
          onCloseModal={() => setIsConfiguratorOpen(false)}
        >
          {popupContent}
        </Popup>
      )}
    </header>
  );
};

export default React.memo(Header);
