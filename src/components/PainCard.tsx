import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
const PainCard = (props: CardProps<any>): JSX.Element => {
  const { result } = props;
  const { name } = result;
  const { c_painToNutrition } = result.rawData;

  return (
    <div className="w-full space-y-4 border p-8 ">
      <div className="font-bold">{name}</div>
      <div className="flex w-auto gap-4 flex-wrap">
        {c_painToNutrition &&
          c_painToNutrition.map((item: any, index: any) => (
            <div
              className="border text-sm px-2 py-1 w-fit rounded-full border-red-300"
              key={index}
            >
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PainCard;
