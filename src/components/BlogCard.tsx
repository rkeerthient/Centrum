import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { Image } from "@yext/pages/components";

const BlogCard = (props: CardProps<any>): JSX.Element => {
  console.log(JSON.stringify(props));

  const { result } = props;
  const { name } = result;
  const { primaryPhoto, description, slug } = result.rawData;

  return (
    <div className="w-full my-4 border">
      <div className=" space-y-4 text-center mx-auto">
        <Image image={primaryPhoto} className="h-60"></Image>
        <div className="text-xl">{name}</div>
        <div className="space-y-2 px-4 pb-4">
          <div className="flex w-auto gap-4 flex-wrap ">{description}</div>
          <div className="rounded-full bg-[#e3005d] hover:bg-black px-8 py-2  w-fit  font-bold text-white mx-auto">
            <a href={`/${slug}`}>Read blog</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
