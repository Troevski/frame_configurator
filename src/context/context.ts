import React, { createContext } from "react";

interface AppContextValues {
  frameSize: string;
  frameCmSize: string;
  setUploadedImgHandle: React.Dispatch<React.SetStateAction<string>>;
  uploadedImgHandle: string;
  setIsConfiguratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AppContext = createContext<AppContextValues | undefined>(
  undefined
);
