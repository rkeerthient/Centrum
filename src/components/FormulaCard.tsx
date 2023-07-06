import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";
import RTF from "./RTF";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Image } from "@yext/pages/components";

const FormulaCard = (props: CardProps<any>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { primaryPhoto, slug } = result.rawData;
  console.log(JSON.stringify(result));

  return (
    <div className="w-full  p-4 my-4 ">
      <div className=" space-y-4 text-center mx-auto">
        <Image image={primaryPhoto}></Image>
        <div className="text-xl">{name}</div>
        <a href={`/${slug}`}>View formula</a>
      </div>
    </div>
  );
};

export default FormulaCard;
