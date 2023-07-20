import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";

const Advil_articleCard = (props: CardProps<any>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { photoGallery, landingPageUrl, c_painCategory } = result.rawData;

  return (
    <div className="flex flex-col space-y-1">
      <div>
        <Image image={photoGallery[0]} className="h-64 mx-auto" />
      </div>
      <div className="flex flex-col space-y-1 ">
        <div className="text-sm p-1 bg-yellow-400 w-fit">{c_painCategory}</div>
        <div className="font-bold text-xl ">{name}</div>
        <a
          href={landingPageUrl}
          target="_blank"
          className="underline text-base"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default Advil_articleCard;
