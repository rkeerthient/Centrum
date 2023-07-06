import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";
import RTF from "./RTF";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Image } from "@yext/pages/components";

const FoodCard = (props: CardProps<any>): JSX.Element => {
  const { result } = props;
  console.log(JSON.stringify(result));

  const { name } = result;
  const { primaryPhoto, c_nutritionToFood } = result.rawData;
  console.log(JSON.stringify(result));

  return (
    <div className="w-full  p-4 my-4 ">
      <div className=" space-y-4 text-center mx-auto">
        <Image image={primaryPhoto} className="h-60"></Image>
        <div className="text-xl">{name}</div>
        <div className="space-y-2">
          <div className="font-semibold text-left">Nutrients</div>
          <div className="flex w-auto gap-4 flex-wrap ">
            {c_nutritionToFood &&
              c_nutritionToFood.map((item: any, index: any) => (
                <div
                  className="border px-2 py-1 w-fit rounded-full border-red-300"
                  key={index}
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
