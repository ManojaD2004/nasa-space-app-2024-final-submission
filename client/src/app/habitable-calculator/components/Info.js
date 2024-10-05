"use client";
import React from "react";
import { BackgroundGradient } from "@/app/components/Background.js";
import {
  instrumentValuesDesc,
  planetValuesDesc,
} from "@/data/exoPlanetValuesDesc.js";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({ subsets: ["latin"], weight: "400" });
const poppinsFont1 = Poppins({ subsets: ["latin"], weight: "700" });

export function BackgroundGradientDemo() {
  return (
    <div className="bg-white">
      <p className="text-black px-[40px] pt-[50px] text-[50px]">
        <span className={poppinsFont1.className}>Exo-Planet Terminologies:</span>
      </p>

      <div className="bg-white flex items-center justify-center gap-[30px] px-[30px] py-[100px] flex-wrap">
        {planetValuesDesc.map((info, index) => (
          <div key={index} className="w-[calc(33.33%-20px)]">
            <BackgroundGradient className="rounded-[22px] max-[5px] p-4 sm:p-10 bg-white">
              <div
                className={
                  poppinsFont1.className +
                  " text-base sm:text-xl text-black mt-4 mb-2"
                }
              >
                {info.title}
              </div>
              <div
                className={
                  poppinsFont.className +
                  " text-sm text-neutral-600 dark:text-neutral-400"
                }
              >
                {info.desc}
              </div>
            </BackgroundGradient>
          </div>
        ))}
      </div>
      <p className="text-black px-[40px]  text-[50px]">
        <span className={poppinsFont1.className}>Instrument Terminologies:</span>
      </p>
      <div className="bg-white flex items-center justify-center gap-[30px] px-[30px] py-[100px] flex-wrap">
        {instrumentValuesDesc.map((info, index) => (
          <div key={index} className="w-[calc(33.33%-20px)]">
            <BackgroundGradient className="rounded-[22px] max-[5px] p-4 sm:p-10 bg-white">
              <div
                className={
                  poppinsFont1.className +
                  " text-base sm:text-xl text-black mt-4 mb-2"
                }
              >
                {info.title}
              </div>
              <div
                className={
                  poppinsFont.className +
                  " text-sm text-neutral-600 dark:text-neutral-400"
                }
              >
                {info.desc}
              </div>
            </BackgroundGradient>
          </div>
        ))}
      </div>
    </div>
  );
}
