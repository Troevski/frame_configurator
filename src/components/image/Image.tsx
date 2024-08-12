import React from "react";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  height?: number;
  zIndex?: string;
}
const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { src, alt, className, height, zIndex } = props;
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      height={height}
      style={{ zIndex: zIndex, transform: className }}
    />
  );
});

export default React.memo(Image);
