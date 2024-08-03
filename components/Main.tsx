"use client";
import React, { useEffect, useState } from "react";
import QuestionDisplay from "./QuestionDisplay";
import CSSEditor from "./CSSEditor";
import PreviewBox from "./PreviewBox";
import { useQuestion } from "@/context/QuestionContext";

type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const { currentQuestion } = useQuestion();

  return (
    <div className="flex min-h-[100vh] select-none flex-col-reverse items-center justify-around py-10 lg:flex-row xl:py-0 mx-16">
      {/* Question editor */}
      <div className="order-2 md:order-1 flex-1 justify-center mx-auto h-full w-[98%] max-w-[1000px] px-12 py-20 lg:ml-auto lg:mr-0">
        <div className="mx-auto flex max-w-full flex-col items-center gap-8 justify-between md:flex-row">
          <QuestionDisplay />
        </div>

        <p className="flex justify-center mx-auto my-12 max-w-xl ">
          {currentQuestion?.instructions}
        </p>

        <CSSEditor />
      </div>

      {/* Playground */}
      <div className="lg:mx-36 order-2 md:order-1 relative h-[300px] w-[300px] rounded-xl bg-cover lg:h-[500px] lg:w-[500px] xl:h-[550px] xl:w-[550px] border-black border bg-center bg-no-repeat">
        <PreviewBox />
      </div>
    </div>
  );
};

export default Main;
