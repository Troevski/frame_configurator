import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./FrameWorkArea.module.scss";
import Image from "../../../components/image/Image";
import { getColorFrameSrc } from "../../../utils/getCorrectFrameSrc";
import { AppContext } from "../../../context/context";
import { useCheckContext } from "../../../hooks/useCheckContext";
import { renderComponent } from "../../../constants/renderComponent";
import { Uploader } from "../../uploader/Uploader";

interface FrameWorkAreaProps {
  selectedOptions: SelectedFrameOptions;
}

const FrameWorkArea = ({ selectedOptions }: FrameWorkAreaProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgUploaded, setImgUploaded] = useState<string>("");

  const context = useContext(AppContext);
  const { frameSize } = useCheckContext(context);
  const { frameColorSrc, frameTypeSrc } = getColorFrameSrc({
    selectedOptions,
    frameSize,
  });
  const ComponentToRender = renderComponent[selectedOptions.typeFrame];

  const componentProps = () => {
    switch (selectedOptions.typeFrame) {
      case "Regular Frame":
        return {
          regularSrc: imgUploaded,
          imgRef: imgRef,
          selectedOptions: selectedOptions,
          setImgUploaded: setImgUploaded,
        };
      case "Matted Frame":
        return { srcMatted: frameTypeSrc };
      case "Floating Frame":
        return { srcFloating: "" };
      default:
        return {};
    }
  };

  return (
    <main className={style.mainWrapperFrameContainer}>
      <div className={style.wrapperConfigurator}>
        <div className={style.workSquareArea}>
          <div className={style.containerWithMainImgs}>
            <Image
              className={`${style.frame} ${selectedOptions.mode === "horizontal" ? `${style.horizontal}` : `${style.vertical}`}`}
              src={frameColorSrc}
              alt=""
              ref={imgRef}
              zIndex="200"
            />
            {/* {!imgUploaded && <Uploader setImgUrl={setImgUploaded} />} */}
            {ComponentToRender && <ComponentToRender {...componentProps()} />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(FrameWorkArea);
