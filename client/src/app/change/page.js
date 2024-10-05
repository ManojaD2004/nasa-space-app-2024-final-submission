import React from "react";
import Header from "../components/Header";
import Herosection from "./component/Herosection";
import Calculator from "./component/Calculator";
import { BackgroundGradientDemo } from "./component/Info1";

const HomePage = () => {
  const backEndLink =
    process.env.BACKEND_SERVER_LINK || "http://localhost:5000";
  return (
    <div>
      <Header />
      <Herosection />
      <Calculator backEndLink={backEndLink} />
      <BackgroundGradientDemo />
    </div>
  );
};

export default HomePage;
