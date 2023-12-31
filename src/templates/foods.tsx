/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import FoodPage from "../Pages/FoodPage";

export const config: TemplateConfig = {
  name: "foods",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `foods`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Centrum | Foods",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const FoodWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <FoodPage />
        </div>
      </PageLayout>
    </>
  );
};
export default FoodWrapper;
