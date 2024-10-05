import React from "react";
import Header from "../components/Header";
import Herosection from "./components/Herosection";

const Page = ({ _, searchParams }) => {
  return (
    <div>
      <Header />
      <Herosection planet1={searchParams.planet1 ? searchParams.planet1 : "None"} />
    </div>
  );
};

export default Page;
