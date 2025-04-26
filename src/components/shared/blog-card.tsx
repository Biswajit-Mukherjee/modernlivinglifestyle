import * as React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { type SanityTypes } from "@/@types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ReadMoreButton from "@/components/shared/read-more-btn";

export type BlogCardProps = Readonly<{ blog: SanityTypes.Blog }>;

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Card
      className="w-full max-w-full md:max-w-[320px] h-[500px] sm:h-[640px] md:h-[480px] p-5 flex flex-col bg-card shadow-lg select-none rounded-lg border border-border"
      key={blog.id}
    >
      <CardHeader className="w-full flex-1 p-0 space-y-4">
        <div className="w-full min-h-[156.38px] rounded-sm overflow-hidden relative">
          <React.Suspense
            fallback={<Skeleton className="w-full h-[156.38px] rounded-sm" />}
          >
            <AspectRatio ratio={16 / 9}>
              <Image
                className="w-full h-full object-cover bg-top aspect-auto"
                blurDataURL={urlFor(blog.image).url()}
                src={urlFor(blog.image).url()}
                placeholder="blur"
                alt={blog.title}
                quality={40}
                fill
              />
            </AspectRatio>
          </React.Suspense>
        </div>
        <CardTitle className="w-full text-base font-extrabold leading-normal tracking-normal antialiased">
          {blog.title}
        </CardTitle>
        <CardDescription className="w-full flex-1 text-sm font-normal leading-normal tracking-normal antialiased overflow-hidden text-ellipsis">
          {blog.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full flex items-center justify-between pt-1 px-0 pb-2">
        <ReadMoreButton title={blog.title} url={`/blog/${blog.slug}`} />

        <div className="flex flex-row items-center gap-2">
          <CalendarIcon size={20} />
          <div className="flex-1 text-muted-foreground text-sm leading-normal antialiased">
            {dayjs(blog.createdAt).format("MMM D, YYYY")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
