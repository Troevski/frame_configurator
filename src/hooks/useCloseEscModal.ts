import { useEffect } from "react";

const useCloseEscModal = (
  setClose: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const closeEscModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setClose(false);
      }
    };

    window.addEventListener("keydown", closeEscModal);

    return () => window.removeEventListener("keydown", closeEscModal);
  }, [setClose]);
};

export default useCloseEscModal;
