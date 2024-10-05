import React from "react";
import { Fira_Sans } from "next/font/google";
import { BackgroundGradient } from "@/app/components/Background.js";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: "400" });

export default function Header() {
  return (
    <div className={firaSans.className}>
      <div className="h-[15vh] bg-black p-4 z-10 w-full px-[120px] flex justify-between items-center">
        <div className="flex gap-20 text-gray-300">
          <a href={"/"} className="font-bold ">
            <BackgroundGradient className="px-5">
              {" "}
              ExpoPlanet
            </BackgroundGradient>
          </a>
          <ul className="flex gap-6 list-none font-medium">
            <a target="_blank" href={"/exo-planet-space"}>
              <BackgroundGradient className="rounded-[22px] max-[5px] p-1  bg-black w-[180px] flex items-center justify-center">
                Experience the space
              </BackgroundGradient>
            </a>
            <a href={"/habitable-calculator"}>
              <BackgroundGradient className="rounded-[22px] max-[5px] p-1  bg-black w-[180px] flex items-center justify-center">
                Habitable calculator
              </BackgroundGradient>
            </a>

            <a href={"/exo-planet-comparision"}>
              <BackgroundGradient className="rounded-[22px] max-[5px] p-1  bg-black w-[180px] flex items-center justify-center">
                {" "}
                Exoplanet Comparision
              </BackgroundGradient>
            </a>

            <a href={"/change"} className="text-[14px] md:text-[16px]">
              <BackgroundGradient className="rounded-[22px] max-[5px] p-1  bg-black w-[180px] flex items-center justify-center">
                Change Value
              </BackgroundGradient>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
}
