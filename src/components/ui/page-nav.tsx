"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NUMBER_OF_BLOGS_PER_PAGE } from "@/lib/data";
import { Button } from "@/components/ui/button";

type Props = Readonly<{
  query: string;
  page: string;
  startIndex: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}>;

const PageNav: React.FC<Props> = ({
  query = "",
  page = "1",
  startIndex = "0",
  prevDisabled = false,
  nextDisabled = false,
}) => {
  const router = useRouter();

  const handlePrevPageClick = async () => {
    const prevPage = +page - 1;
    const prevIndex = +startIndex - NUMBER_OF_BLOGS_PER_PAGE;
    const endIndex = prevIndex + NUMBER_OF_BLOGS_PER_PAGE;

    if (query) {
      router.push(
        `/blogs?query=${query}&page=${prevPage}&startIndex=${prevIndex.toString()}&endIndex=${endIndex.toString()}`
      );
    } else {
      router.push(`/blogs?page=${prevPage}&startIndex=${prevIndex.toString()}&endIndex=${endIndex.toString()}`);
    }
  };

  const handleNextPageClick = async () => {
    const nextPage = +page + 1;
    const nextIndex = +startIndex + NUMBER_OF_BLOGS_PER_PAGE;
    const endIndex = nextIndex + NUMBER_OF_BLOGS_PER_PAGE;

    if (query) {
      router.push(
        `/blogs?query=${query}&page=${nextPage}&startIndex=${nextIndex.toString()}&endIndex=${endIndex.toString()}`
      );
    } else {
      router.push(`/blogs?page=${nextPage}&startIndex=${nextIndex.toString()}&endIndex=${endIndex.toString()}`);
    }
  };

  return (
    <div
      className="w-full flex items-center justify-center gap-6 mx-auto my-4"
      data-uia="navigation-container"
    >
      <Button
        onClick={handlePrevPageClick}
        aria-label="previous-page-btn"
        className="[&_svg]:size-6 flex items-center justify-center gap-0 min-w-[115px]"
        disabled={prevDisabled}
      >
        <ChevronLeft />
        <span>Prev</span>
      </Button>
      <span className="text-muted-foreground antialiased">
        Page <strong className="text-foreground antialiased">{page}</strong>
      </span>
      <Button
        onClick={handleNextPageClick}
        aria-label="next-page-btn"
        className="[&_svg]:size-6 flex items-center justify-center gap-0 min-w-[115px]"
        disabled={nextDisabled}
      >
        <span>Next</span>
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PageNav;
