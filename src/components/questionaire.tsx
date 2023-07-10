import * as React from "react";
import { useState } from "react";

const Questionnaire = (props: any) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const data = props.data;

  const handleAnswer = (header, question, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      ...(prevAnswers[header] || {}),
      [question]: answer,
    }));
  };

  const handleSubmit = (data) => {
    console.log(JSON.stringify(data["What are your goals?"]));
    const extractedValues = Object.values(data);
    const extractedString = extractedValues.join(",");
    const queryString = extractedString.split(",");
    const url = `/home-page?query=${data["What are your goals?"]}&type=guided`;
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
        <h3 className="font-semibold">{question}</h3>
        {options.map((option) => (
          <label key={option} className=" items-center mt-2 flex">
            <input
              type="radio"
              name={question}
              value={option}
              onChange={() => handleAnswer(header, question, option)}
              checked={answers[header] && answers[header][question] === option}
              className="form-radio mr-2"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    );
  };

  const renderSection = (section) => {
    const { header, questions } = section;
    return (
      <div key={header} className="">
        <h2 className="text-xl font-bold mb-4">{header}</h2>
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
    <div className="w-full py-8">
      <h1 className="text-2xl font-bold mb-8">Questionnaire</h1>
      <div className="bg-gray-200 h-2 rounded mb-4">
        <div
          className="bg-blue-500 h-full rounded"
          style={{ width: progressBarWidth }}
        ></div>
      </div>
      {data.questions.map((section, index) => (
        <div
          key={section.header}
          className={currentStep === index ? "" : "hidden"}
        >
          {renderSection(section)}
        </div>
      ))}
      <div className="flex justify-between">
        {currentStep > 0 && (
          <button
            onClick={handlePreviousStep}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Previous
          </button>
        )}
        {currentStep < data.questions.length - 1 && (
          <button
            onClick={handleNextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
        {currentStep === data.questions.length - 1 && (
          <button
            onClick={() => handleSubmit(answers)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
