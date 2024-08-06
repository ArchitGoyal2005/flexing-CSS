"use client"

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSignIn } from "@clerk/nextjs";
import Loading from "./Loading";

type FormValues = {
  rollNumber: string;
  dob: string;
  firstName: string;
};

const LoginForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!isLoaded) return;

    setErrorMessage("");
    try {
      const result = await signIn.create({
        identifier: data.rollNumber,
        password: data.dob,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        console.error("Sign-in result:", result);
        setErrorMessage("Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  if (!isLoaded) {
    return <Loading />
  }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border-2 border-black px-9 rounded-xl py-12">
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <div>
          <label htmlFor="rollNumber" className="block mb-1">Roll Number</label>
          <input
            id="rollNumber"
            {...register("rollNumber", { required: "Roll number is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.rollNumber && <span className="text-red-500">{errors.rollNumber.message}</span>}
        </div>

        <div>
          <label htmlFor="firstName" className="block mb-1">First Name</label>
          <input
            id="firstName"
            {...register("firstName", { required: "First name is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
        </div>

        <div>
          <label htmlFor="dob" className="block mb-1">Date of Birth</label>
          <input
            id="dob"
            type="date"
            {...register("dob", { required: "Date of birth is required" })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
