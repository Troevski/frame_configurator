import React, { useCallback, useContext, useState } from "react";
import { handleUpload } from "../../utils/handleUpload";
import Button from "../../components/button/Button";
import { maxSize5mb } from "./constantsUploader";
import style from "./Uploader.module.scss";
import { CropperModal } from "../cropper/CropperModal";
import { getCorrectAspectRatio } from "../../utils/getDimensions";
import { useCheckContext } from "../../hooks/useCheckContext";
import { AppContext } from "../../context/context";

interface UploaderProps {
  setImgUrl: (url: string) => void;
  selectedOptions: SelectedFrameOptions;
}

export const Uploader = ({ setImgUrl, selectedOptions }: UploaderProps) => {
  const context = useContext(AppContext);
  const { frameSize, frameCmSize } = useCheckContext(context);

  const onFileSelected = useCallback((file: any) => {
    if (file.size > maxSize5mb) {
      alert("Maksymalny rozmiar pliku: 5MB");
    }
    return true;
  }, []);

  const onUploadDone = useCallback(
    (res: any) => {
      const uploadedFileURL = res.filesUploaded[0].url;
      setImgUrl(uploadedFileURL);
    },
    [setImgUrl]
  );

  const handleUploadClick = useCallback(() => {
    if (!selectedOptions.mode) return;

    const currentImgRatio = getCorrectAspectRatio(
      frameSize,
      selectedOptions.mode
    );
    handleUpload({
      accept: "image/png",
      maxSize: maxSize5mb,
      lang: "pl",
      onUploadDone: onUploadDone,
      onFileSelected: onFileSelected,
      transformations: {
        crop: {
          aspectRatio: currentImgRatio,
          force: true,
        },
        circle: false,
        rotate: false,
      },
      imageCrop: true

    });
  }, [onUploadDone, onFileSelected, frameSize, selectedOptions.mode]);


  return (
      <Button
        text="upload img"
        onClick={handleUploadClick}
        className={style.buttonUploader}
      />
  );
};
