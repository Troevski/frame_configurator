import { useEffect } from "react";

export const useResizeObserver = (ref: any, callback: any) => {
  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [callback, ref]);

  return ref;
};
