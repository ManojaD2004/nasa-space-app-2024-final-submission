"use client";
import resultJson from "../../../data/result";
import React, { useState } from "react";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: "400" });

const Herosection = ({ planet1 = "None" }) => {
  const [selectedValue, setSelectedValue] = useState(planet1);
  const [selectedValue2, setSelectedValue2] = useState("None");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChange2 = (event) => {
    setSelectedValue2(event.target.value);
  };

  const isButtonDisabled =
    selectedValue === "None" || selectedValue2 === "None";

  const Redirect = () => {
    window.open(
      `/planet-comparision?planet1=${encodeURIComponent(
        selectedValue
      )}&planet2=${encodeURIComponent(selectedValue2)}`
    );
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full h-[60vh] gap-14">
        <div>
          <form className={firaSans.className}>
            <label
              htmlFor="planet-type1"
              className="text-white block pb-[20px] text-[20px]"
            >
              Choose a planet:
            </label>
            <select
              id="planet-type1"
              name="planet-type1"
              value={selectedValue}
              onChange={handleChange}
              className="border rounded px-8 py-4 bg-[#e6f533] text-[20px]"
            >
              <option value="None">None</option>
              {resultJson.map((item) => (
                <option key={item.pl_name} value={item.pl_name}>
                  {item.pl_name}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div>
          <form className={firaSans.className}>
            <label
              htmlFor="planet-type2"
              className="text-white block pb-[20px] text-[20px]"
            >
              Choose a planet:
            </label>
            <select
              id="planet-type2"
              name="planet-type2"
              value={selectedValue2}
              onChange={handleChange2}
              className="border rounded px-8 py-4 bg-[#e6f533] text-[20px]"
            >
              <option value="None">None</option>
              {resultJson.map((item) => (
                <option key={item.pl_name} value={item.pl_name}>
                  {item.pl_name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <div className={firaSans.className}>
        <div className="flex items-center justify-center mt-2">
          <button
            className={`text-white px-4 py-2 rounded text-[20px] ${
              isButtonDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
            disabled={isButtonDisabled}
            onClick={Redirect}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
