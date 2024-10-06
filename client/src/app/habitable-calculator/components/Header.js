import Image from 'next/image'
import React from 'react'

import Link from 'next/link';

export default function Header() {
 
  return (
    <div className="h-[15vh] bg-black p-4 z-10 w-full px-[150px] flex justify-between items-center">
    <div className="flex gap-20 text-gray-300">
      <a target="_blank" href={"/"} className="font-bold ">
        <span className="text-[#3077c6] text-[20px]">Expo</span>Planet
      </a>
      <ul className="flex gap-6 list-none font-medium">
        <a target="_blank" href={"/exo-planet-space"}>
          Experience the space
        </a>
        <a target="_blank" href={"/habitable-calculator"}>
          Habitable calculator
        </a>
        <a target="_blank" href={"/orbit-rotation"}>
          {"Orbit Rotation (Test)"}
        </a>
        <a target="_blank" href={"/interactive"}>
          {"Interactivity Sphere (Test)"}
        </a>
      </ul>
    </div>
  </div>
  )
};