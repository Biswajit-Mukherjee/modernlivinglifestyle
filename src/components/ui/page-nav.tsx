"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NUMBER_OF_BLOGS_PER_PAGE } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  query: string;
  page: string;
  startIndex: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  shouldNextNavButtonBeVisible?: boolean;
}>;

const PageNav: React.FC<Props> = ({
  query = "",
  page = "1",
  startIndex = "0",
  prevDisabled = false,
  nextDisabled = false,
  shouldNextNavButtonBeVisible = false,
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
      router.push(
        `/blogs?page=${prevPage}&startIndex=${prevIndex.toString()}&endIndex=${endIndex.toString()}`
      );
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
      router.push(
        `/blogs?page=${nextPage}&startIndex=${nextIndex.toString()}&endIndex=${endIndex.toString()}`
      );
    }
  };

  return (
    <div
      className={cn(
        "flex items-center mx-auto mt-0 mb-20",
        !prevDisabled || !nextDisabled
          ? "w-full max-w-sm justify-center"
          : "justify-between"
      )}
      data-uia="blogs-navigation"
    >
      {!prevDisabled && (
        <Button
          onClick={handlePrevPageClick}
          aria-label="previous-page-btn"
          className="[&_svg]:size-6 flex items-center justify-center gap-0 min-w-[120px] min-h-10 p-0"
          disabled={prevDisabled}
        >
          <ChevronLeft />
          <span>Previous</span>
        </Button>
      )}

      <div aria-label="current-page-number" className="mx-6">
        <div className="flex items-center gap-2.5 text-muted-foreground antialiased">
          <span>Page</span>
          <strong className="text-foreground antialiased">{page}</strong>
        </div>
      </div>

      {!nextDisabled && shouldNextNavButtonBeVisible && (
        <Button
          onClick={handleNextPageClick}
          aria-label="next-page-btn"
          className="[&_svg]:size-6 flex items-center justify-center gap-0 min-w-[120px] min-h-10 p-0"
          disabled={nextDisabled}
        >
          <span>Next</span>
          <ChevronRight />
        </Button>
      )}
    </div>
  );
};

export default PageNav;
