import React, { useEffect, useRef } from "react";
import style from "./Cropper.module.scss";
import Cropper, { ReactCropperElement } from "react-cropper";
import Button from "../../components/button/Button";

interface CropperProps {
  onCrop: (url: string) => void;
  imgUploadedUrl: string;
  setIsCropperOpen: (el: boolean) => void;
}

export const CropperModal = ({
  onCrop,
  imgUploadedUrl,
  setIsCropperOpen,
}: CropperProps) => {
  return (
    <div className={style.modalOverlay}>
      cropper <Button onClick={() => setIsCropperOpen(false)} text="close" />
    </div>
  );
};
