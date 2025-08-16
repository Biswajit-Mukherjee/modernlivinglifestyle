import * as React from "react";
import { Label } from "@/components/ui/label";

type Props = Readonly<{ query: string }>;

const BlogsNotFound: React.FC<Props> = ({ query = '' }) => {
  return (
    <div className="w-full max-w-md mt-10 mx-auto mb-20 select-none">
      <Label className="block text-xl leading-normal font-medium text-center text-muted-foreground">
        No results found for{" "}
        <span className="text-foreground font-semibold">{`"${query}"`}</span>
      </Label>
      <ul
        className="w-full mt-6 text-muted-foreground"
        data-uia="search-suggestions"
      >
        <li>Make sure all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
      </ul>
    </div>
  );
};

export default BlogsNotFound;
