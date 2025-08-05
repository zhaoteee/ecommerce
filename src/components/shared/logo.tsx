import Image from "next/image";
import React from "react";
import LogoImg from "../../../public/assets/icons/logo.png";
const Logo = ({
  width = "200px",
  height = "auto",
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <div className="z-50" style={{ width, height }}>
      <Image src={LogoImg} alt="logo" />
    </div>
  );
};

export default Logo;
