import React, { useCallback, useContext, useState } from "react";
import { handleUpload } from "../../utils/handleUpload";
import Button from "../../components/button/Button";
import { maxSize20mb } from "./constantsUploader";
import style from "./Uploader.module.scss";
import { getCorrectAspectRatio } from "../../utils/getDimensions";
import { useCheckContext } from "../../hooks/useCheckContext";
import { AppContext } from "../../context/context";
import { LANGUAGE } from "../../constants/enums";
import Image from "../../components/image/Image";
import { Links } from "../../constants/links";
import CropperModal from "../cropper/CropperModal";

interface UploaderProps {
  setImgUrl: (url: string) => void;
  selectedOptions: SelectedFrameOptions;
  squareDimensions: SquareDimensionsInt;
}

export const Uploader = ({
  setImgUrl,
  selectedOptions,
  squareDimensions,
}: UploaderProps) => {
  const [isCropperModalOpen, setIsCropperModalOpen] = useState(false);

  const context = useContext(AppContext);
  const { frameSize, setUploadedImgHandle, uploadedImgHandle } =
    useCheckContext(context);
  const [uploadedUrlImg, setUploadedUrlImg] = useState("");
  const onFileSelected = useCallback((file: any) => {
    if (file.size > maxSize20mb) {
      alert("Maksymalny rozmiar pliku: 20MB");
    }
    return true;
  }, []);
  const onUploadDone = useCallback(
    (res: any) => {
      setIsCropperModalOpen(true);
      const { url, handle } = res.filesUploaded[0];

      setUploadedUrlImg(url);
      setUploadedImgHandle(handle);
    },
    [setUploadedImgHandle]
  );

  const handleUploadClick = useCallback(() => {
    if (!selectedOptions.mode) return;

    // const currentImgRatio = getCorrectAspectRatio(
    //   frameSize,
    //   selectedOptions.mode,
    //   selectedOptions
    // );
    handleUpload({
      accept: ["image/jpg", "image/jpeg"],
      maxSize: maxSize20mb,
      lang: LANGUAGE.en,
      onUploadDone: onUploadDone,
      onFileSelected: onFileSelected,
      transformations: {
        crop: false,
        circle: false,
        rotate: false,
      },
      imageCrop: true,
    });
  }, [onUploadDone, onFileSelected, selectedOptions]);

  return (
    <>
      <div className={style.containerImgUpload} onClick={handleUploadClick}>
        <Image
          src={Links.iconImgUpload}
          alt="addPhoto"
          className={style.iconImgUpload}
        />
        <Button
          text="UPLOAD IMAGE"
          className={style.buttonUploader}
          isImgNeeded={true}
          iconSrc={Links.iconBtnAdd}
          iconClassName={style.iconClassName}
        />
      </div>
      {isCropperModalOpen && (
        <CropperModal
          setIsCropperModalOpen={setIsCropperModalOpen}
          setCroppedImgUrl={setImgUrl}
          squareDimensions={squareDimensions}
          selectedOptions={selectedOptions}
          imgUrlUploaded={uploadedUrlImg}
          handlePhoto={uploadedImgHandle}
          handleUploadPickerAgain={handleUploadClick}
        />
      )}
    </>
  );
};
