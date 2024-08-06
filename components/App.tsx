import { Question } from "@/lib/types";
import QuizEnd from "./QuizEnd";
import { QuestionProvider } from "@/context/QuestionContext";
import { AttemptedProvider } from "@/context/AttemptedContext";
import Topbar from "./topbar/Topbar";
import Main from "./Main";

async function getQuestions() {
  const res = await fetch(
    process.env.BACKEND_URL + "/api/v1/questions/clerk123",
  );
  const { data } = await res.json();
  return data.questions;
}

async function getAttemptedQuestions() {
  const res = await fetch(
    process.env.BACKEND_URL + "/api/v1/submissions/clerk123",
    {
      cache: "no-store",
    },
  );
  const { data } = await res.json();
  return data;
}

async function getTime() {
  const res = await fetch(process.env.BACKEND_URL + "/api/v1/clock/getClock", {
    cache: "no-store",
  });
  const { data } = await res.json();
  const endTime = new Date(data);
  return Math.floor((endTime.getTime() - Date.now() - 5000) / 1000);
}

export default async function App() {
  const questions: Question[] = await getQuestions();
  const attemptedQuestions: string[] = await getAttemptedQuestions();
  // -FIX: REMOVE THE CONST TIME TO GET THE CORRECT TIME AND UNCOMMENT getTime()
  // const time: number = await getTime();
  const time = 1000;

  if (time <= 0) return <QuizEnd />;

  return (
    <>
      <QuestionProvider questionsData={questions}>
        <AttemptedProvider attemptedQuestionsData={attemptedQuestions}>
          <Topbar time={time} />
          <Main />
        </AttemptedProvider>
      </QuestionProvider>
    </>
  );
}
