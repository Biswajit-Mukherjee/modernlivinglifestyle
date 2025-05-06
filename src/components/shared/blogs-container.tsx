import * as React from "react";
import type { SanityTypes } from "@/@types";
import BlogCard from "@/components/shared/blog-card";
import AllBlogsButton from "@/components/shared/all-blogs-btn";
import { getMostRecentBlogs } from "@/lib/utils";

const BlogsContainer: React.FC = async () => {
  const blogs: SanityTypes.Blog[] = await getMostRecentBlogs();

  return (
    <div>
      <div className="w-full max-w-xs mt-0 mx-auto mb-8 relative">
        <div className="w-fit mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-nowrap antialiased">
            Popular right now
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 w-full max-w-5xl mx-auto">
        {blogs.length &&
          blogs.map((blog: SanityTypes.Blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
      </div>

      <div className="w-full mt-10 mx-auto mb-0 flex items-center justify-center">
        <AllBlogsButton />
      </div>
    </div>
  );
};

export default BlogsContainer;
