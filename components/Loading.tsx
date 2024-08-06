import React from "react";
import Image from "next/image"
import loadingSVG from "@/public/loading.svg"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Image src={loadingSVG} width={30} height={30} alt="loading" />
      <span className="ml-4 text-2xl">Loading</span>
    </div>
  );
}
