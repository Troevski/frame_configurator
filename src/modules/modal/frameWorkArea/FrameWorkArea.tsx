import React, { useCallback, useContext, useRef, useState } from "react";
import style from "./FrameWorkArea.module.scss";
import Image from "../../../components/image/Image";
import { getColorFrameSrc } from "../../../utils/getCorrectFrameSrc";
import { AppContext } from "../../../context/context";
import { useCheckContext } from "../../../hooks/useCheckContext";
import { renderComponent } from "../../../constants/renderComponent";
import { useGetFrameDimensions } from "../../../hooks/useGetFrameDimensions";
import { FRAME_MODE, TYPE_FRAME } from "../../../constants/enums";
import { Uploader } from "../../uploader/Uploader";
import useCalculateSquareArea from "../../../hooks/useCalculateSquareArea";
import { useResizeObserver } from "../../../hooks/useResizeObserver";

interface FrameWorkAreaProps {
  selectedOptions: SelectedFrameOptions;
  mainContainerRef: React.RefObject<HTMLDivElement>;
}

const FrameWorkArea = ({
  selectedOptions,
  mainContainerRef,
}: FrameWorkAreaProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const [imgUploaded, setImgUploaded] = useState<string>("");

  const context = useContext(AppContext);
  const { frameSize } = useCheckContext(context);
  const { frameColorSrc, frameTypeSrc } = getColorFrameSrc({
    selectedOptions,
    frameSize,
  });
  const [squareDimensions, setSquareDimension] = useState({
    width: 0,
    height: 0,
  });
  const ComponentToRender = renderComponent[selectedOptions.typeFrame];
  const { dimensions } = useGetFrameDimensions({
    imgRef,
    selectedOptions,
    squareDimensions,
  });
  const containerSize = useCalculateSquareArea();

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    for (let entry of entries) {
      setSquareDimension((prev) => ({
        ...prev,
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      }));
    }
  }, []);

  useResizeObserver(squareRef, handleResize);

  const componentProps = () => {
    switch (selectedOptions.typeFrame) {
      case "Regular Frame":
        return {
          regularSrc: imgUploaded,
          imgRef: imgRef,
          selectedOptions: selectedOptions,
          squareDimensions: squareDimensions,
        };
      case "Matted Frame":
        return {
          srcMatted: frameTypeSrc,
          selectedOptions: selectedOptions,
          imgRef: imgRef,
          mattedSrc: imgUploaded,
          squareDimensions: squareDimensions,
        };
      case "Floating Frame":
        return {
          srcFloated: frameTypeSrc,
          selectedOptions: selectedOptions,
          imgRef: imgRef,
          floatedUploadedSrc: imgUploaded,
          squareDimensions: squareDimensions,
        };
      default:
        return {};
    }
  };

  return (
    <main className={style.mainWrapperFrameContainer}>
      <div className={style.wrapperConfigurator} ref={mainContainerRef}>
        <div
          className={style.workSquareArea}
          style={{
            width: `${containerSize.width}px`,
            height: `${containerSize.height}px`,
          }}
          ref={squareRef}
        >
          <div className={style.containerWithMainImgs}>
            <Image
              className={`${style.frame} ${selectedOptions.mode === FRAME_MODE.HORIZONTAL ? `${style.horizontal}` : `${style.vertical}`}`}
              src={frameColorSrc}
              alt=""
              ref={imgRef}
              zIndex="200"
            />
            {!imgUploaded && (
              <Uploader
                setImgUrl={setImgUploaded}
                selectedOptions={selectedOptions}
                onUpload={() => console.log("sda")}
              />
            )}
            <div
              style={{
                width: dimensions.widthWindow,
                height: dimensions.heightWindow,
              }}
              className={`${style.containerWindow}`}
            >
              {ComponentToRender && <ComponentToRender {...componentProps()} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(FrameWorkArea);
