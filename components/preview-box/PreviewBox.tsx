"use client";

import { useQuestion } from "@/context/QuestionContext";
import React from "react";
import { Questions } from "../Questions";
import { useInput } from "@/context/InputContext";

const PreviewBox: React.FC = () => {
  const { currentQuestion } = useQuestion();
  const { inputStyle } = useInput();

  return (
    <div className="relative bg-black rounded-xl mx-auto h-full w-[98%] max-w-[1000px] lg:ml-0 lg:mr-auto perspective-1000">
      {Questions["medium_2"]({ inputStyle })}
    </div>
  );
};

export default PreviewBox;
