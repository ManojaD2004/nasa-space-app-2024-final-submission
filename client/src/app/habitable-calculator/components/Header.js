import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="h-[15vh] bg-black p-4 z-10 w-full px-4 md:px-[150px] flex justify-between items-center">
      <div className="flex gap-10 md:gap-20 text-gray-300">
        <a target="_blank" href={"/"} className="font-bold text-[16px] md:text-[20px]">
          <span className="text-[#3077c6]">Expo</span>Planet
        </a>
        <ul className="flex gap-4 md:gap-6 list-none font-medium flex-col md:flex-row">
          <li>
            <a target="_blank" href={"/exo-planet-space"} className="text-[14px] md:text-[16px]">
              Experience the space
            </a>
          </li>
          <li>
            <a target="_blank" href={"/habitable-calculator"} className="text-[14px] md:text-[16px]">
              Habitable calculator
            </a>
          </li>
          <li>
            <a target="_blank" href={"/orbit-rotation"} className="text-[14px] md:text-[16px]">
              Orbit Rotation (Test)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
