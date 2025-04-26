import * as React from "react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/data";

type Props = Readonly<{ className?: string; hidden?: boolean }>;

const Logo: React.FC<Props> = ({ className = "", hidden = false }) => {
  return (
    <span className={cn(className)} data-uia="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="272"
        height="60"
        viewBox="0 0 340 60"
        fill="none"
      >
        {/* Blue Circle */}
        <circle cx="27" cy="27" r="22" fill="hsl(262.1 83.3% 57.8%)" />

        {/* Diagonal Stripe */}
        <rect
          x="4"
          y="32"
          width="30"
          height="4"
          className="fill-background"
          transform="rotate(45 20 32)"
        />

        {/* Logo Text */}
        <text
          x="60"
          y="37"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="hsl(262.1 83.3% 57.8%)"
          className={cn(hidden && "hidden sm:block")}
        >
          {SITE.name}
        </text>
      </svg>
    </span>
  );
};

export default Logo;
