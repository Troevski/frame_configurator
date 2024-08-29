import React from "react";
import Image from "../image/Image";


interface ButtonsProps {
  text: string;
  onClick?: () => void;
  className?: string;
  isImgNeeded?: boolean;
  iconSrc?: string;
  iconClassName?:string
}

const Button = ({
  text,
  onClick,
  className,
  isImgNeeded,
  iconSrc,
  iconClassName
}: ButtonsProps) => {
  return (
    <button onClick={onClick} className={className}>
      {isImgNeeded && iconSrc && <Image src={iconSrc} alt="" height={28} className={iconClassName}/>}
      {text}
    </button>
  );
};

export default Button;
