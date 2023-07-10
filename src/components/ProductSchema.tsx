import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { ItemList, Product } from "schema-dts";

const Schema = (props: any) => {
  const { document } = props;
  console.log(JSON.stringify(document.meta.entityType.uid));

  const itemListElement: any = [];
  if (document.c_supplementFacts) {
    document.c_supplementFacts.map((item: any, index: any) => {
      const { name, amountPerServing, dailyValue } = item;
      itemListElement.push(name);
    });
  }
  console.log(JSON.stringify(itemListElement));

  return (
    <>
      <JsonLd<Product>
        item={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: document.name,
          image: document.primaryPhoto.image.url,
          description: document.description,
          brand: {
            "@type": "Brand",
            name: "Centrum",
          },
          sku: document.meta.entityType.uid,
        }}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: itemListElement,
        }}
      />
    </>
  );
};

const buildHoursSchema = (hoursData: any) => {
  const nHrs: any = [];
  Object.keys(hoursData).forEach((item) =>
    nHrs.push(
      hoursData[item].openIntervals &&
        `${item.substring(0, 2).replace(/./, (c) => c.toUpperCase())} ${
          hoursData[item].openIntervals[0].start
        }-${hoursData[item].openIntervals[0].end}`
    )
  );
  return nHrs;
};

export default Schema;
