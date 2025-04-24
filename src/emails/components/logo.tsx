import * as React from "react";
import { Img } from "@react-email/components";

const IMG_SRC =
  "https://res.cloudinary.com/dpuqotrbb/image/upload/v1745502683/website-logo-transparent_tu7pdt.png";

const Logo: React.FC = () => {
  return (
    <Img
      alt="logo"
      style={{ width: 320, margin: "auto" }}
      src={IMG_SRC}
    />
  );
};

export default Logo;
