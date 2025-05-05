import * as React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = Readonly<{
  title: string;
  image: string | StaticImport;
}>;

const Jumbotron: React.FC<Props> = ({ title, image }) => {
  return (
    <div className="w-full h-[240px] sm:h-[360px] md:h-[480px] relative mx-auto">
      <Image
        className="w-full object-contain bg-center"
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        quality={60}
        src={image}
        alt={title}
        priority
        fill
      />
    </div>
  );
};

export default Jumbotron;
