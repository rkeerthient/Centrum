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
import FormulaePage from "../Pages/FormulaePage";

export const config: TemplateConfig = {
  name: "formulae",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `formulae`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Centrum | Formulas",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const FormulaeWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <FormulaePage />
        </div>
      </PageLayout>
    </>
  );
};
export default FormulaeWrapper;
