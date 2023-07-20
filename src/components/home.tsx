import { UniversalResults } from "@yext/search-ui-react";
import FAQCard from "./FAQCard";
import FoodCard from "./FoodCard";
import FormulaCard from "./FormulaCard";
import GoalCard from "./GoalCard";
import NutritionCard from "./NutritionCard";
import Questionnaire from "./questionaire";
import * as React from "react";
import { useState } from "react";
import { useSearchState } from "@yext/search-headless-react";
import PainCard from "./PainCard";

const home = ({ document }: any) => {
  const { c_homeToGSQuestions } = document;
  const query = useSearchState((state) => state.query.input);
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const [show, setShow] = useState(false);

  const GridSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4 md:gap-8 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      {query && (
        <>
          {!loading ? (
            <UniversalResults
              customCssClasses={{
                universalResultsContainer:
                  "w-full max-w-screen-2xl mx-auto my-12 ",
              }}
              verticalConfigMap={{
                faqs: {
                  CardComponent: FAQCard,
                  viewAllButton: true,
                  label: "FAQs",
                },
                food: {
                  CardComponent: FoodCard,
                  SectionComponent: GridSection,
                  viewAllButton: true,
                  label: "Foods",
                },
                formulae: {
                  CardComponent: FormulaCard,
                  SectionComponent: GridSection,
                  viewAllButton: true,
                  label: "Formulas",
                },
                nutrition: {
                  CardComponent: NutritionCard,
                  viewAllButton: true,
                  label: "Nutrition",
                },
                goals: {
                  CardComponent: GoalCard,
                  SectionComponent: GridSection,
                  label: "Goals",
                  viewAllButton: true,
                },
                pain: {
                  CardComponent: PainCard,
                  SectionComponent: GridSection,
                  label: "Needs",
                  viewAllButton: true,
                },
              }}
            />
          ) : (
            <div className="h-screen flex justify-center items-center">
              <div className="h-16 w-16 rounded-full animate-spin border border-solid border-gray-600 border-t-transparent"></div>
            </div>
          )}
        </>
      )}
      <div className="py-4">
        {!query && !show && (
          <>
            <div className=" flex flex-row justify-between items-center max-w-screen-2xl mx-auto px-8 md:px-none">
              <div className="flex flex-col p-8">
                <div className="text-4xl font-bold">
                  Customized Wellness Companion
                </div>
                <div className="mt-8 text-2xl text-gray-500">
                  Let’s get to know you and your health goals. We’ll use your
                  answers to tailor your supplements, foods, and recipe
                  recommendations.
                </div>
                <div
                  className="rounded-full hover:cursor-pointer bg-[#e3005d] hover:bg-black px-8 py-2 mt-8 w-fit text-xl font-bold text-white"
                  onClick={() => setShow(true)}
                >
                  Take your quiz
                </div>
              </div>
              <img
                src="https://wholebycentrum.com/static/media/hero-desktop.8069c7d63b4168b163a9.png"
                style={{ height: "500px" }}
              />
            </div>
          </>
        )}
        {show && <Questionnaire data={buildGsQuestions(c_homeToGSQuestions)} />}
        <img src="https://i.imgur.com/rYmRQhQ.png" />
        <img src="https://i.imgur.com/Vn1va9n.png" className="bg-white my-24" />
        <img src="https://i.imgur.com/TjAehYX.png" />
        <img src="https://i.imgur.com/7OYbOfu.png" />
      </div>
    </div>
  );
};

export default home;

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
