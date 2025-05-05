import * as React from "react";
import { Img } from "@react-email/components";

const IMG_SRC =
  "https://res.cloudinary.com/dpuqotrbb/image/upload/v1745502683/website-logo-transparent_tu7pdt.png";

const Logo: React.FC = () => {
  return (
    <div
      style={{ width: "100%", position: "relative", boxSizing: "border-box" }}
    >
      <Img
        alt="logo"
        style={{
          width: 320,
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        src={IMG_SRC}
      />
    </div>
  );
};

export default Logo;
