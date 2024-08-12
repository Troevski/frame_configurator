import { createContext } from "react";

interface AppContextValues {
  frameSize: string;
  frameCmSize: string;
}
export const AppContext = createContext<AppContextValues | undefined>(
  undefined
);
