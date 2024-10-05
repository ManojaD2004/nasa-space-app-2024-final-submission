import React from "react";
import Wrapper from "./components/Wrapper";

const Page = ({ params: _, searchParams }) => {
  const planet1 = searchParams["planet1"];
  const planet2 = searchParams["planet2"];
  return <Wrapper planet1={planet1} planet2={planet2} />;
};

export default Page;
