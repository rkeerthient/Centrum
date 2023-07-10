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
import Questionnaire from "../components/questionaire";
import { UniversalResults } from "@yext/search-ui-react";
import FAQCard from "../components/FAQCard";
import FoodCard from "../components/FoodCard";
import NutritionCard from "../components/NutritionCard";
import FormulaCard from "../components/FormulaCard";
import GoalCard from "../components/GoalCard";
import { useSearchState } from "@yext/search-headless-react";
import { useEffect, useState } from "react";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-home-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_homeToGSQuestions.c_q1",
      "c_homeToGSQuestions.c_q2",
      "c_homeToGSQuestions.c_q3",
      "c_homeToGSQuestions.c_q4",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["5098282222949981013"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

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
const GridSection = ({ results, CardComponent, header }: any) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }
  return (
    <div>
      <div>{header}</div>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-8 ">
        {results.map((r: any, index: number) => (
          <CardComponent key={index} result={r} />
        ))}
      </div>
    </div>
  );
};
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { _site, name, c_homeToGSQuestions } = document;
  const [hideFlow, setHideFlow] = useState(false);
  console.log(hideFlow);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setHideFlow(queryParams.has("type"));
  });
  return (
    <PageLayout _site={_site}>
      <div className="w-3/4 mx-auto bg-white p-4  ">
        {hideFlow && (
          <UniversalResults
            customCssClasses={{ universalResultsContainer: "w-full" }}
            verticalConfigMap={{
              faqs: {
                CardComponent: FAQCard,
                viewAllButton: true,
              },
              food: {
                CardComponent: FoodCard,
                SectionComponent: GridSection,
                viewAllButton: true,
              },
              formulae: {
                CardComponent: FormulaCard,
                SectionComponent: GridSection,
                viewAllButton: true,
              },
              nutrition: {
                CardComponent: NutritionCard,
                viewAllButton: true,
              },
              goals: {
                CardComponent: GoalCard,
                SectionComponent: GridSection,
                label: "Goals",
              },
            }}
          />
        )}
        {!hideFlow && (
          <Questionnaire
            data={buildGsQuestions(c_homeToGSQuestions)}
          ></Questionnaire>
        )}
      </div>
    </PageLayout>
  );
};

export default Location;

const buildGsQuestions = (data: any) => {
  data = data[0];
  const convertedData = {
    questions: [],
  };

  for (const key in data) {
    const sectionData = data[key];
    const sectionHeader = sectionData.find((item: any) => item.sectionHeader);
    if (sectionHeader) {
      const section = {
        header: sectionHeader.sectionHeader,
        questions: sectionData
          .filter(
            (item: any, index: any) => index !== 0 && !("sectionHeader" in item)
          )
          .map((questionData: any) => ({
            question:
              questionData.question ||
              questionData.question1 ||
              questionData.question2 ||
              questionData.question3,
            opt:
              questionData.qOptions ||
              questionData.q1Opts ||
              questionData.q2Opts ||
              questionData.q3Opts,
          }))
          .filter((question: any) => Object.keys(question).length > 0),
      };
      if (section.questions.length > 0) {
        convertedData.questions.push(section);
      }
    }
  }
  return convertedData;
};
