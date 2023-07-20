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
import { useEffect, useState } from "react";
import Home from "../components/home";
import Questionnaire from "../components/questionaire";
import Aadvil_flow from "../components/advil_flow";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-home-id-2",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_homeToAdvilPain.name",
      "c_homeToAdvilPain.c_painSubPain.name",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["4223425529785209520"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : `${document.id.toString()}`;
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

const Advil_Pain: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const [hideFlow, setHideFlow] = useState(false);
  console.log(JSON.stringify(document.c_homeToAdvilPain));

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setHideFlow(queryParams.has("type"));
  });
  return (
    <PageLayout useSecondExp={true}>
      <Aadvil_flow document={document}></Aadvil_flow>
    </PageLayout>
  );
};

export default Advil_Pain;
