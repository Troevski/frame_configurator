import React, { useCallback, useContext } from "react";
import { handleUpload } from "../../utils/handleUpload";
import Button from "../../components/button/Button";
import { maxSize5mb } from "./constantsUploader";
import style from "./Uploader.module.scss";
import { getCorrectAspectRatio } from "../../utils/getDimensions";
import { useCheckContext } from "../../hooks/useCheckContext";
import { AppContext } from "../../context/context";
import { LANGUAGE } from "../../constants/enums";
import Image from "../../components/image/Image";
import { Links } from "../../constants/links";

interface UploaderProps {
  setImgUrl: (url: string) => void;
  selectedOptions: SelectedFrameOptions;
  onUpload: () => void;
}

export const Uploader = ({
  setImgUrl,
  selectedOptions,
  onUpload,
}: UploaderProps) => {
  const context = useContext(AppContext);
  const { frameSize, setUploadedImgHandle } = useCheckContext(context);

  const onFileSelected = useCallback((file: any) => {
    if (file.size > maxSize5mb) {
      alert("Maksymalny rozmiar pliku: 5MB");
    }
    return true;
  }, []);

  const onUploadDone = useCallback(
    (res: any) => {
      const { url, handle } = res.filesUploaded[0];
      setImgUrl(url);
      setUploadedImgHandle(handle);
    },
    [setImgUrl, setUploadedImgHandle]
  );

  const handleUploadClick = useCallback(() => {
    if (!selectedOptions.mode) return;

    const currentImgRatio = getCorrectAspectRatio(
      frameSize,
      selectedOptions.mode,
      selectedOptions
    );
    handleUpload({
      accept: ["image/jpg", "image/jpeg"],
      maxSize: maxSize5mb,
      lang: LANGUAGE.en,
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
      imageCrop: true,
    });
  }, [onUploadDone, onFileSelected, frameSize, selectedOptions]);

  return (
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
  );
};
