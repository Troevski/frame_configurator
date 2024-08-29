import { sourcesToUpload } from "../constants/global";
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
    fromSources: sourcesToUpload,
    accept,
    maxSize,
    lang,
    onUploadDone,
    onFileSelected,
    transformations,
  };

  client.picker(options).open();
};
