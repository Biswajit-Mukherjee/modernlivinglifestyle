"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const AllBlogsButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/blogs?page=1#blogsContainer");
  };

  return (
    <Button
      className="overflow-hidden hover:bg-primary/10 active:bg-primary/10 dark:hover:bg-primary/25 dark:active:bg-primary/25 p-6 hover:no-underline active:no-underline text-lg leading-normal antialiased"
      aria-label="load-all-blogs-cta"
      variant="link"
      onClick={handleClick}
    >
      See all blogs
    </Button>
  );
};

export default AllBlogsButton;
