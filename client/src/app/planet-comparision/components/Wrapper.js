"use client"
import React from "react";
import Herosection from "./Herosection";
import Header from "@/app/components/Header";

function Wrapper({planet1, planet2}) {
  return (
    <div>
      <Header />
      <Herosection planet1={planet1} planet2={planet2} />
    </div>
  );
}

export default Wrapper;
