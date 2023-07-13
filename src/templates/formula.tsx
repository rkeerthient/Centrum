/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import RTF from "../components/RTF";
import Schema from "../components/ProductSchema";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "formula",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "slug",
      "c_supplementFacts",
      "c_directions",
      "c_otherIngredients",
      "c_nutrients",
      "primaryPhoto",
      "landingPageUrl",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_formulae"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const cpy = document;
  const {
    _site,
    name,
    description,
    slug,
    c_supplementFacts,
    c_directions,
    c_otherIngredients,
    c_nutrients,
    primaryPhoto,
    landingPageUrl,
  } = document;
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  return (
    <>
      <Schema document={cpy}></Schema>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <div className="section">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div>
                <Image image={primaryPhoto}></Image>
              </div>
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">{name}</h1>
                <div>{description}</div>
                <div onClick={() => setIsActive(!isActive)}>
                  <div className="text-primary-text-color text-2xl hover:cursor-pointer dark:text-dark_primary">
                    <span>Directions</span>
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
                  <div className="!text-lg text-faq-text-color mt-3 dark:text-dark_primary">
                    <RTF>{c_directions}</RTF>
                  </div>
                )}
                <div onClick={() => setIsActive1(!isActive1)}>
                  <div className="text-primary-text-color text-2xl hover:cursor-pointer dark:text-dark_primary">
                    <span>Supplement Facts</span>
                    <div style={{ float: "right" }}>
                      {isActive1 ? (
                        <ChevronUpIcon className="w-7 text-[#083b3a]" />
                      ) : (
                        <ChevronDownIcon className="w-7 text-[#083b3a]" />
                      )}
                    </div>
                  </div>
                </div>
                {isActive1 && (
                  <div className="border border-black p-5">
                    {c_supplementFacts.map((item: any, index: any) => {
                      const { name, amountPerServing, dailyValue } = item;
                      return (
                        <div
                          className="flex gap-3 space-y-4 items-center border-b-2 py-2"
                          key={index}
                        >
                          <div className="flex-1">{name}</div>
                          <div className="w-20">{amountPerServing}</div>
                          <div className="w-20">{dailyValue}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div onClick={() => setIsActive2(!isActive2)}>
                  <div className="text-primary-text-color text-2xl hover:cursor-pointer dark:text-dark_primary">
                    <span>Other Ingredients</span>
                    <div style={{ float: "right" }}>
                      {isActive2 ? (
                        <ChevronUpIcon className="w-7 text-[#083b3a]" />
                      ) : (
                        <ChevronDownIcon className="w-7 text-[#083b3a]" />
                      )}
                    </div>
                  </div>
                </div>
                {isActive2 && (
                  <div className="!text-lg text-faq-text-color mt-3 dark:text-dark_primary">
                    <RTF>{c_otherIngredients}</RTF>
                  </div>
                )}
                <div onClick={() => setIsActive3(!isActive3)}>
                  <div className="text-primary-text-color text-2xl hover:cursor-pointer dark:text-dark_primary">
                    <span>Distribution</span>
                    <div style={{ float: "right" }}>
                      {isActive3 ? (
                        <ChevronUpIcon className="w-7 text-[#083b3a]" />
                      ) : (
                        <ChevronDownIcon className="w-7 text-[#083b3a]" />
                      )}
                    </div>
                  </div>
                </div>
                {isActive3 && (
                  <div className="!text-lg text-faq-text-color mt-3 dark:text-dark_primary">
                    Distributed by: GSK Consumer Healthcare, Warren, NJ 07059 As
                    with any supplement, if you are taking medication, consult
                    your doctor before use. Do not consume if pregnant or
                    nursing.
                  </div>
                )}
              </div>
            </div>
            {c_nutrients && (
              <div className="flex flex-row gap-3">
                <div className="text-xl font-bold">Nutrition Info</div>
                <div className="flex flex-row gap-1">
                  {c_nutrients.map((item: any, index: any) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
