import { StarIcon } from "@heroicons/react/20/solid";
import { Image } from "@yext/pages/components";
import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";
import RTF from "../RTF";

const Advil_productCard = (props: CardProps<any>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { primaryPhoto, landingPageUrl, richTextDescription } = result.rawData;
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  React.useEffect(() => {
    setRatingCount(parseInt((Math.random() * (500 - 1) + 1).toFixed(2)));
  }, []);
  React.useEffect(() => {
    setRating(parseFloat((Math.random() * (5 - 1) + 1).toFixed(2)));
  }, []);
  return (
    <div className="flex justify-between border p-2 gap-4 items-center">
      <div className="flex flex-col w-1/2">
        <div className="font-bold text-2xl">{name}</div>
        <RTF>{richTextDescription}</RTF>
        <div className="flex flex-col mb-4 space-y-4">
          <div className="flex   items-center">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((item) => (
                <StarIcon
                  key={item}
                  className={classNames(
                    rating > parseFloat(item)
                      ? "text-yellow-400"
                      : "text-gray-200",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="flex space-x-3 text-sm text-gray-500">
              <div>{rating}</div>
              <div>({ratingCount})</div>
            </div>
          </div>
          <div>
            <a
              href={landingPageUrl}
              target="_blank"
              className="text-base rounded-full w-fit px-4 py-3 bg-yellow-400 font-bold"
            >
              Buy now
            </a>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <Image image={primaryPhoto} className="m-auto" />
      </div>
    </div>
  );
};

export default Advil_productCard;
