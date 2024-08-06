import React, { useEffect, useState } from "react";
import InitialCSS from "./InitialCSS";
import { Button } from "../ui/button";
import AnswerBox from "./AnswerBox";
import { useQuestion } from "@/context/QuestionContext";
import { useAttempted } from "@/context/AttemptedContext";
import { useInput } from "@/context/InputContext";
import toast from "react-hot-toast";

function convertCssStringToCamelCase(cssString: string) {
  // Split the input string by semicolons to get individual property-value pairs
  const pairs = cssString.split(";").filter(Boolean);

  // Convert each property-value pair to camelCase and join them back into a string
  const camelCaseString = pairs
    .map((pair) => {
      const [property, value] = pair.split(":").map((s) => s.trim());

      // Convert hyphenated property to camelCase
      const camelCasedProperty = property
        .split("-")
        .map((part, index) =>
          index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
        )
        .join("");

      // Return the camelCased property with the value
      return `${camelCasedProperty}: ${value}`;
    })
    .join("; "); // Join the pairs back into a string with '; '

  return camelCaseString;
}

const CSSEditor: React.FC = () => {
  const { currentQuestion, currentQuestionIndex } = useQuestion();
  const { setAttemptedQuestions } = useAttempted();
  const { setInputStyle } = useInput();
  const [cssInput, setCssInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCssInput("");
    setInputStyle("");
  }, [currentQuestionIndex, setInputStyle]);

  useEffect(() => {
    if (validateCSS(cssInput)) {
      const camelCaseString = convertCssStringToCamelCase(cssInput);
      const cssObject = parseCSS(camelCaseString);
      const cssString = JSON.stringify(cssObject);
      setInputStyle(cssString);
    }
    if (cssInput === "") setInputStyle("");
  }, [cssInput, setInputStyle]);

  const handleSubmit = () => {
    const isValid = validateCSS(cssInput);
    if (!isValid) {
      toast.error("Invalid CSS Format", {
        duration: 4000,
        position: "bottom-right",
      });
      return;
    }
    const cssObject = parseCSS(cssInput);
    const cssString = JSON.stringify(cssObject);
    sendPostRequest(cssString);
  };

  const validateCSS = (css: string) => {
    const cssPattern = /^(?:\s*[a-zA-Z-]+\s*:\s*[^;]+\s*;\s*)*$/;
    return cssPattern.test(css.trim().replace(/\s+/g, " "));
  };

  const parseCSS = (css: string) => {
    return css.split(";").reduce((acc: Record<string, string>, rule) => {
      const [property, value] = rule
        .split(":")
        .map((item) => item.trim().replace(/\s+/g, " "));
      if (property && value) {
        acc[property] = value;
      }
      return acc;
    }, {});
  };

  const sendPostRequest = async (data: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/v1/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "66acd4c06c7faa3f82ed321d",
          questionId: currentQuestion._id,
          answer: data,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        if (responseData.isCorrect) {
          setAttemptedQuestions((prev) => [...prev, currentQuestion._id]);
          toast.success("Submitted successfully!!!", {
            duration: 4000,
            position: "top-center",
          });
          setCssInput("");
        } else {
          toast.error("Wrong Answer! Please try again!", {
            duration: 4000,
            position: "bottom-right",
          });
        }
      } else {
        toast.error("Failed to submit CSS", {
          duration: 4000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred while submitting CSS", {
        duration: 4000,
        position: 'bottom-right',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto mt-24 max-w-lg rounded-md bg-gray-200 px-8 py-5 shadow-lg">
        <pre>{"#container: {"}</pre>
        <div className="ml-6">
          <div className="css">
            <div className="">
              <InitialCSS />
            </div>
          </div>
          <div className="">
            <label htmlFor="css-input" className="sr-only">
              Enter CSS
            </label>
            <AnswerBox
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <pre>{"}"}</pre>
      </div>
      <Button
        variant="outline"
        className="mx-auto text-white mt-8 block cursor-pointer rounded-md px-6 py-2"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </>
  );
};

export default CSSEditor;
