import React from "react";
import Image from "../image/Image";

interface MattedProps {
  srcMatted: string;
}

export const Matted = ({ srcMatted }: MattedProps) => {
  return (
    <div>
      <Image src={srcMatted} />
    </div>
  );
};
