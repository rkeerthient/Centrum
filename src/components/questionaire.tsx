import * as React from "react";
import { useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
const Questionnaire = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const data = props.data;
  console.log(JSON.stringify(props));

  const handleAnswer = (header, question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [header]: {
        ...prevAnswers[header],
        [question]: answer,
      },
    }));
  };

  const handleSubmit = (data) => {
    const extractedValues = Object.values(data);
    let goals = null;
    for (let i = 0; i < extractedValues.length; i++) {
      const obj = extractedValues[i];
      if ("What are your goals?" in obj) {
        goals = obj["What are your goals?"];
        break;
      }
    }
    const url = `/home-page?query=${goals}&type=guided`;
    window.location.href = url;
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderQuestion = (header, question, options) => {
    return (
      <div key={question} className="my-4">
        <h3 className="font-semibold mb-2">{question}</h3>
        <div className="flex w-full flex-wrap">
          {options.map((option) => (
            <label
              key={option}
              className={` items-center mt-2 flex border-2 font-semibold rounded-md align-center text-black mx-4 bg-transparent justify-between ${
                answers[header] &&
                answers[header][question] === option &&
                "border-[#e3005d] border-2 bg-[#ffebf3]"
              }`}
              style={{ maxWidth: "250px", minWidth: "130px" }} //
            >
              <input
                type="radio"
                name={question}
                value={option}
                onChange={() => handleAnswer(header, question, option)}
                checked={
                  answers[header] && answers[header][question] === option
                }
                className="hidden"
              />
              <div className="w-full flex items-center px-4 py-2   justify-between">
                <div className="text-sm">{option}</div>

                <div
                  className={`pl-4 ${
                    answers[header] && answers[header][question] === option
                      ? "visible"
                      : "invisible"
                  }`}
                >
                  <AiOutlineCheck stroke={"1em"} color="#e3005e" />
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderSection = (section) => {
    const { header, questions } = section;
    return (
      <div key={header} className="">
        <h2 className="text-xl font-bold mb-4">{header}</h2>
        <div className="bg-gray-200 h-2 rounded mb-4">
          <div
            className="bg-[#e3005d] h-full rounded"
            style={{ width: progressBarWidth }}
          ></div>
        </div>
        {questions.map((question) =>
          renderQuestion(header, question.question, question.opt)
        )}
      </div>
    );
  };

  const progressBarWidth = `${
    ((currentStep + 1) / data.questions.length) * 100
  }%`;

  return (
    <div className="w-4/5 px-14 py-8 mx-auto ">
      {data.questions.map((section, index) => (
        <div
          key={section.header}
          className={currentStep === index ? "" : "hidden"}
        >
          {renderSection(section)}
        </div>
      ))}
      <div className="flex justify-center items-center space-x-6 mb-4">
        {currentStep > 0 && (
          <button
            onClick={handlePreviousStep}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 flex items-center space-x-4"
          >
            <AiOutlineArrowLeft />
            <div className="ml-2">Previous</div>
          </button>
        )}
        {currentStep < data.questions.length - 1 && (
          <button
            onClick={handleNextStep}
            className="bg-[#e3005d] text-white px-4 py-2 rounded-full flex items-center space-x-4 "
          >
            <div className="mr-2">Continue</div>
            <AiOutlineArrowRight />
          </button>
        )}
        {currentStep === data.questions.length - 1 && (
          <button
            onClick={() => handleSubmit(answers)}
            className="bg-[#e3005d] text-white px-4 py-2 rounded-full flex items-center"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
