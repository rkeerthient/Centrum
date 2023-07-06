import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { useState } from "react";
import RTF from "./RTF";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const NutritionCard = (props: CardProps<any>): JSX.Element => {
  const { result } = props;
  const [isActive, setIsActive] = useState(false);
  const { name } = result;
  const { c_benefits, c_sources, c_whatIs, c_whyIs } = result.rawData;
  return (
    <div className="w-full border-b border-gray-300 p-4 my-4 ">
      <div className="text-xl">
        <div onClick={() => setIsActive(!isActive)}>
          <div className="text-primary-text-color text-2xl hover:cursor-pointer dark:text-dark_primary">
            <span>{name}</span>
            <div style={{ float: "right" }}>
              {isActive ? (
                <ChevronUpIcon className="w-7 text-[#083b3a]" />
              ) : (
                <ChevronDownIcon className="w-7 text-[#083b3a]" />
              )}
            </div>
          </div>
        </div>
        {isActive && (
          <div className="!text-lg text-faq-text-color mt-3 dark:text-dark_primary flex flex-col gap-4 pl-4 border-l-2">
            {c_benefits && (
              <div>
                <div className="font-semibold">Benefits of {name}?</div>
                <RTF>{c_benefits.toString()}</RTF>
              </div>
            )}
            {c_whatIs && (
              <div>
                <div className="font-semibold">What is {name}?</div>
                <RTF>{c_whatIs}</RTF>
              </div>
            )}
            {c_whyIs && (
              <div>
                <div className="font-semibold"> Why is {name} Important?</div>
                <RTF>{c_whyIs}</RTF>
              </div>
            )}
            {c_sources && (
              <div>
                <div className="font-semibold">Sources of {name}</div>
                <RTF>{c_sources.toString()}</RTF>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionCard;
