import { useEffect, useState } from "react";
import { FRAME_SIZES } from "../constants/enums";

const useCalculateSquareArea = () => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const calculateSize = () => {
      const headerHeight = FRAME_SIZES.HEADER_HEIGHT;
      const margin = FRAME_SIZES.MARGINS;
      const maxContainerSize = FRAME_SIZES.MAX_CONTAINER_SIZE;

      const availableHeight =
        window.innerHeight - headerHeight - margin - margin;
      const availableWidth = window.innerWidth - margin - margin;

      const size = Math.min(availableHeight, availableWidth, maxContainerSize);

      setContainerSize({ width: size, height: size });
    };

    calculateSize();

    const resizeObserver = new ResizeObserver(() => {
      calculateSize();
    });

    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return containerSize;
};

export default useCalculateSquareArea;
