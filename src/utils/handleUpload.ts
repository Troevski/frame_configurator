import { client } from "../modules/uploader/constantsUploader";

export const handleUpload = ({
  accept,
  maxSize,
  lang,
  onUploadDone,
  transformations,
  onFileSelected,
}: any) => {
  const options = {
    accept,
    maxSize,
    lang,
    onUploadDone,
    onFileSelected,
    transformations,
  };

  client.picker(options).open();
};
