"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Button } from "@/components/ui/button";

type Props = Readonly<{ title: string; url: string }>;

const ReadMoreButton: React.FC<Props> = ({ title, url }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  return (
    <Button
      className="p-0"
      variant="link"
      role="link"
      aria-label={`Read more about ${title}`}
      onClick={handleClick}
    >
      <div className="w-full flex flex-row items-center gap-1 text-primary hover:underline hover:underline-primary active:underline-primary underline-offset-4 transition-all duration-200 font-semibold antialiased">
        <span>Read more</span>
        <MdOutlineArrowOutward size={20} />
      </div>
      <span className="sr-only">{title}</span>
    </Button>
  );
};

export default ReadMoreButton;
