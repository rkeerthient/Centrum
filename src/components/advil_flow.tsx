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
import { AiOutlineCheck } from "react-icons/ai";
import Advil_productCard from "./advil cards/advil_productCard";
import Advil_articleCard from "./advil cards/advil_articleCard";

const Aadvil_flow = ({ document }: any) => {
  const { c_homeToAdvilPain } = document;
  const query = useSearchState((state) => state.query.input);
  const loading = useSearchState((state) => state.searchStatus.isLoading);
  const [show, setShow] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);
  const [selectedMainName, setSelectedMainName] = useState(null);
  const [selectedSubPain, setSelectedSubPain] = useState(null);
  const handleMainNameSelect = (name: string) => {
    setSelectedMainName(name);
  };

  const handleSubPainSelect = (subPain: string) => {
    setSelectedSubPain(subPain);
    setCurrentScreen(1);
  };

  const handleNext = () => {
    if (selectedMainName) {
      setCurrentScreen(2);
    }
  };

  const handlePrevious = () => {
    setSelectedMainName(null); // Reset the selected main name when going back
    setCurrentScreen(1);
  };

  const handleSubmit = () => {
    console.log("Main Name: ", selectedMainName);
    console.log("Selected Sub-Pain: ", selectedSubPain);
    const searchTerm = selectedMainName! + selectedSubPain!;
    const url = `/review-relief?query=${searchTerm}`;
    window.location.href = url;
  };

  const ProgressBar = () => {
    const progress = ((selectedMainName ? 2 : 1) / 2) * 100;

    return (
      <div className="w-full h-4 bg-gray-200 rounded">
        <div
          className="h-full bg-blue-500 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };
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
              showAppliedFilters={true}
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
                products: {
                  CardComponent: Advil_productCard,
                  SectionComponent: GridSection,
                  label: "Products",
                  viewAllButton: true,
                },
                articles: {
                  CardComponent: Advil_articleCard,
                  SectionComponent: GridSection,
                  label: "Articles",
                  viewAllButton: true,
                },
                advil_pain: {},
                advil_subpain: {},
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
                <div className="text-4xl font-bold">Relief Finder</div>
                <div className="mt-8 text-2xl text-gray-500">
                  Not sure which Advil is right for you? Advil treats a large
                  variety of symptoms, so select one and we’ll help you narrow
                  it down.
                </div>
                <div
                  className="rounded-full hover:cursor-pointer bg-[#e3005d] hover:bg-black px-8 py-2 mt-8 w-fit text-xl font-bold text-white"
                  onClick={() => setShow(true)}
                >
                  Take your quiz
                </div>
              </div>
              <div className="rouded-full h-1/2 w-1/2">
                <img
                  src="https://i.imgur.com/VQke4M6.png"
                  className="rounded-full m-8 h-full w-full"
                />
              </div>
            </div>

            <img src="https://i.imgur.com/rYmRQhQ.png" />
            <img
              src="https://i.imgur.com/Vn1va9n.png"
              className="bg-white my-24"
            />
            <img src="https://i.imgur.com/TjAehYX.png" />
            <img src="https://i.imgur.com/7OYbOfu.png" />
          </>
        )}
        {show && (
          <div className="max-w-md mx-auto bg-white p-4 shadow">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Questionnaire</h2>
              <ProgressBar />
            </div>
            {currentScreen === 1 && (
              <>
                <div>
                  <p className="text-lg mb-2">Main Names</p>
                  <ul>
                    {c_homeToAdvilPain.map((item, index) => (
                      <label
                        key={index}
                        className={`hover:cursor-pointer items-center mt-2 flex border-2 font-semibold rounded-md align-center text-black mx-4 bg-transparent justify-between ${
                          selectedMainName === item.name &&
                          "border-[#e3005d] border-2 bg-[#ffebf3]"
                        }`}
                        style={{ maxWidth: "250px", minWidth: "130px" }}
                      >
                        <input
                          type="radio"
                          id={item.name}
                          name="mainName"
                          value={item.name}
                          onChange={() => handleMainNameSelect(item.name)}
                          checked={selectedMainName === item.name}
                          className="hidden"
                        />
                        <div className="w-full flex items-center px-4 py-2   justify-between">
                          <div className="text-sm">{item.name}</div>
                          <div
                            className={`pl-4 ${
                              selectedMainName === item.name
                                ? "visible"
                                : "invisible"
                            }`}
                          >
                            <AiOutlineCheck stroke={"1em"} color="#e3005e" />
                          </div>
                        </div>
                      </label>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleNext}
                    disabled={!selectedMainName}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {currentScreen === 2 && selectedMainName && (
              <>
                <div>
                  <p className="text-lg mb-2">Sub-Pain Options</p>
                  {c_homeToAdvilPain.map((item, index) => {
                    if (item.name === selectedMainName && item.c_painSubPain) {
                      return (
                        <ul key={index}>
                          {item.c_painSubPain.map((subPain, subIndex) => (
                            <label
                              key={subIndex}
                              className={`hover:cursor-pointer items-center mt-2 flex border-2 font-semibold rounded-md align-center text-black mx-4 bg-transparent justify-between ${
                                selectedSubPain === subPain.name &&
                                "border-[#e3005d] border-2 bg-[#ffebf3]"
                              }`}
                              style={{ maxWidth: "250px", minWidth: "130px" }}
                            >
                              <input
                                type="radio"
                                id={subPain.name}
                                name="subPain"
                                value={subPain.name}
                                onChange={() =>
                                  setSelectedSubPain(subPain.name)
                                }
                                checked={selectedSubPain === subPain.name}
                                className="hidden"
                              />
                              <div className="w-full flex items-center px-4 py-2   justify-between">
                                <div className="text-sm">{subPain.name}</div>
                                <div
                                  className={`pl-4 ${
                                    selectedMainName === subPain.name
                                      ? "visible"
                                      : "invisible"
                                  }`}
                                >
                                  <AiOutlineCheck
                                    stroke={"1em"}
                                    color="#e3005e"
                                  />
                                </div>
                              </div>
                            </label>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  })}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Aadvil_flow;
