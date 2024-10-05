"use client";
import React from "react";
import resultJson from "@/data/result";
import PlanetsCompare from "./PlanetsCompare";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: "400" });
const firaSans1 = Fira_Sans({ subsets: ["latin"], weight: "800" });

const Herosection = ({ planet1, planet2 }) => {
  const data1 = resultJson.find((item) => item["pl_name"] === planet1);
  const data2 = resultJson.find((item) => item["pl_name"] === planet2);

  return (
    <div className="text-white">
      <div className="flex w-full items-center justify-center h-[85vh] relative">
        <div className="w-full h-full absolute">
          <PlanetsCompare planetName1={planet1} planetName2={planet2} />
        </div>
        <div className={firaSans.className}>
          <div className="m-[20px] p-[20px] bg-white/10 backdrop-blur-[1px] rounded-lg h-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollb scrollbar scrollbar-track-transparent scrollbar-thumb-black  overflow-y-scroll overflow-x-hidden absolute left-0 top-[50%] transform -translate-y-1/2 z-10 w-[25%]">
            <div className="text-[20px]">
              <span className={firaSans1.className}>Hostname: </span>
              <div className="text-[#b8b9bb] ">{data1["hostname"]}</div>
            </div>

            <div className="bg-white/10 w-full p-3 rounded-3xl flex items-center justify-center my-3">
              <span className={firaSans1.className}>Planet Name: &nbsp; </span>
              {data1["pl_name"]}
            </div>
            <div>
              <span className={firaSans1.className}>Orbital Period: </span>
              {data1["Orbital Period"]}
            </div>
            <div>
              <span className={firaSans1.className}>Semi-Major Axis: </span>
              {data1["Semi-Major Axis"]}
            </div>
            <div>
              <span className={firaSans1.className}>Planet Radius: </span>
              {data1["Planet Radius"]}
            </div>
            <div>
              <span className={firaSans1.className}>Planet Mass: </span>
              {data1["Planet Mass"]}
            </div>
            <div>
              <span className={firaSans1.className}>Planet Density: </span>
              {data1["Planet Density"]}
            </div>
            <div>
              <span className={firaSans1.className}>
                Equilibrium Temperature:{" "}
              </span>
              {data1["Equilibrium Temperature"]}
            </div>
            <div>
              <span className={firaSans1.className}>
                Orbital Eccentricity:{" "}
              </span>
              {data1["Orbital Eccentricity"]}
            </div>
            <div>
              <span className={firaSans1.className}>Star Name: </span>
              {data1["Star Name"]}
            </div>
            <div>
              <span className={firaSans1.className}>
                Effective Temperature:{" "}
              </span>
              {data1["Effective Temperature"]}
            </div>
            <div>
              <span className={firaSans1.className}>Stellar Radius: </span>
              {data1["Stellar Radius"]}
            </div>
            <div>
              <span className={firaSans1.className}>Stellar Mass: </span>
              {data1["Stellar Mass"]}
            </div>
            <div>
              <span className={firaSans1.className}>Distance from Earth: </span>
              {data1["Distance from Earth"]}
            </div>

            <div className="overflow-x-auto py-4">
              <table className="min-w-full ">
                <thead>
                  <tr className="bg-white/10 text-[#b8b9bb]">
                    <th className="px-4 py-2 text-left">Properties</th>
                    <th className="px-4 py-2 text-left">Distance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>R_star: </span>
                    </td>
                    <td className="px-4 py-2">{data1["R_star"]}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>L_star: </span>
                    </td>
                    <td className="px-4 py-2">{data1["L_star"]}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>T_eff: </span>
                    </td>
                    <td className="px-4 py-2">{data1["T_eff"]}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>R_planet: </span>
                    </td>
                    <td className="px-4 py-2">{data1["R_planet"]}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>M_planet: </span>
                    </td>
                    <td className="px-4 py-2">{data1["M_planet"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
      <div className="bg-white/5 p-3 rounded-3xl">
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>Semi-Major Axis: </span>
                {data1["semi_major_axis"]}
              </div>
              <div>
                <span className={firaSans1.className}>
                  Orbital Eccentricity:{" "}
                </span>
                {data1["eccentricity"]}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>Inclination: </span>
                {data1["inclination"]}
              </div>
              <div>
                <span className={firaSans1.className}>Albedo: </span>
                {data1["albedo"]}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>Distance: </span>
                {data1["distance"]}
              </div>
              <div>
                <span className={firaSans1.className}>D_telescope: </span>
                {data1["D_telescope"]}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>Wavelength: </span>
                {data1["wavelength"]}
              </div>
              <div>
                <span className={firaSans1.className}>IWA: </span>
                {data1["IWA"]}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>OWA: </span>
                {data1["OWA"]}
              </div>
              <div>
                <span className={firaSans1.className}>Contrast Limit: </span>
                {data1["contrast_limit"]}
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className={firaSans.className}>
          <div className="p-[20px] m-[20px] bg-white/10 backdrop-blur-[1px] rounded-lg h-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-black scrollbar-track-transparent overflow-y-scroll overflow-x-hidden absolute right-0 top-[50%] transform -translate-y-1/2 z-10 w-[25%]">
            <div className="text-[20px]">
              <span className={firaSans1.className}>Hostname: </span>
              <div className="text-[#b8b9bb] ">{data2["hostname"]}</div>
            </div>
            <div className="bg-white/10 w-full p-3 rounded-3xl flex items-center justify-center my-3">
              <span className={firaSans1.className}>Planet Name: &nbsp;</span>
              {data2["pl_name"]}
            </div>
            <div>
              <span className={firaSans1.className}>Orbital Period: </span>
              {data2["Orbital Period"]}
            </div>
            <div>
              <span className={firaSans1.className}>Semi-Major Axis: </span>
              {data2["Semi-Major Axis"]}
            </div>
            <div>
              <span className={firaSans1.className}>Planet Radius: </span>
              {data2["Planet Radius"]}
            </div>
            <div>
              <span className={firaSans1.className}>Planet Mass: </span>
              {data2["Planet Mass"]}
            </div>
            <div>
              <span className={firaSans1.className}>Planet Density: </span>
              {data2["Planet Density"]}
            </div>
            <div>
              <span className={firaSans1.className}>
                Equilibrium Temperature:{" "}
              </span>
              {data2["Equilibrium Temperature"]}
            </div>
            <div>
              <span className={firaSans1.className}>
                Orbital Eccentricity:{" "}
              </span>
              {data2["Orbital Eccentricity"]}
            </div>
            <div>
              <span className={firaSans1.className}>Star Name: </span>
              {data2["Star Name"]}
            </div>
            <div>
              <span className={firaSans1.className}>
                Effective Temperature:{" "}
              </span>
              {data2["Effective Temperature"]}
            </div>
            <div>
              <span className={firaSans1.className}>Stellar Radius: </span>
              {data2["Stellar Radius"]}
            </div>
            <div>
              <span className={firaSans1.className}>Stellar Mass: </span>
              {data2["Stellar Mass"]}
            </div>
            <div>
              <span className={firaSans1.className}>Distance from Earth: </span>
              {data2["Distance from Earth"]}
            </div>
            <div className="overflow-x-auto py-5">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-white/10 text-[#b8b9bb]">
                    <th className="px-4 py-2 text-left">Properties</th>
                    <th className="px-4 py-2 text-left">Values</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>R_star: </span>
                    </td>
                    <td className="px-4 py-2">{data2["R_star"]}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>L_star: </span>
                    </td>
                    <td className="px-4 py-2">{data2["L_star"]}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>T_eff: </span>
                    </td>
                    <td className="px-4 py-2">{data2["T_eff"]}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>R_planet: </span>
                    </td>
                    <td className="px-4 py-2">{data2["R_planet"]}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <span className={firaSans1.className}>M_planet: </span>
                    </td>
                    <td className="px-4 py-2">{data2["M_planet"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white/5 p-3 rounded-3xl">
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>Semi-Major Axis: </span>
                {data2["semi_major_axis"]}
              </div>
              <div>
                <span className={firaSans1.className}>
                  Orbital Eccentricity:{" "}
                </span>
                {data2["eccentricity"]}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>Inclination: </span>
                {data2["inclination"]}
              </div>
              <div>
                <span className={firaSans1.className}>Albedo: </span>
                {data2["albedo"]}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>Distance: </span>
                {data2["distance"]}
              </div>
              <div>
                <span className={firaSans1.className}>D_telescope: </span>
                {data2["D_telescope"]}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>Wavelength: </span>
                {data2["wavelength"]}
              </div>
              <div>
                <span className={firaSans1.className}>IWA: </span>
                {data2["IWA"]}
              </div>
            </div>
            <div className="flex items-center justify-between pb-3">
              <div>
                <span className={firaSans1.className}>OWA: </span>
                {data2["OWA"]}
              </div>
              <div>
                <span className={firaSans1.className}>Contrast Limit: </span>
                {data2["contrast_limit"]}
              </div>
            </div>
            </div>
          </div>
        </div>
        {/* <div className="bg-gray-700 w-1/2 h-full flex flex-col">
          <div className="bg-[#0649bd] h-1/2 overflow-x-scroll">
            <div>{data1["hostname"]}</div>
            <div>{data1["pl_name"]}</div>
            <div>{data1["Orbital Period"]}</div>
            <div>{data1["Semi-Major Axis"]}</div>
            <div>{data1["Planet Radius"]}</div>
            <div>{data1["Planet Mass"]}</div>
            <div>{data1["Planet Density"]}</div>
            <div>{data1["Equilibrium Temperature"]}</div>
            <div>{data1["Orbital Eccentricity"]}</div>
            <div>{data1["Star Name"]}</div>
            <div>{data1["Effective Temperature"]}</div>
            <div>{data1["Stellar Radius"]}</div>
            <div>{data1["Stellar Mass"]}</div>
            <div>{data1["Distance from Earth"]}</div>
            <div>{data1["R_star"]}</div>
            <div>{data1["L_star"]}</div>
            <div>{data1["T_eff"]}</div>
            <div>{data1["R_planet"]}</div>
            <div>{data1["M_planet"]}</div>
            <div>{data1["semi_major_axis"]}</div>
            <div>{data1["eccentricity"]}</div>
            <div>{data1["inclination"]}</div>
            <div>{data1["albedo"]}</div>
            <div>{data1["distance"]}</div>
            <div>{data1["D_telescope"]}</div>
            <div>{data1["wavelength"]}</div>
            <div>{data1["IWA"]}</div>
            <div>{data1["OWA"]}</div>
            <div>{data1["contrast_limit"]}</div>
          </div>
          <div className="bg-[#162d50] h-1/2 overflow-x-scroll">
            <div>{data2["hostname"]}</div>
            <div>{data2["pl_name"]}</div>
            <div>{data2["Orbital Period"]}</div>
            <div>{data2["Semi-Major Axis"]}</div>
            <div>{data2["Planet Radius"]}</div>
            <div>{data2["Planet Mass"]}</div>
            <div>{data2["Planet Density"]}</div>
            <div>{data2["Equilibrium Temperature"]}</div>
            <div>{data2["Orbital Eccentricity"]}</div>
            <div>{data2["Star Name"]}</div>
            <div>{data2["Effective Temperature"]}</div>
            <div>{data2["Stellar Radius"]}</div>
            <div>{data2["Stellar Mass"]}</div>
            <div>{data2["Distance from Earth"]}</div>
            <div>{data2["R_star"]}</div>
            <div>{data2["L_star"]}</div>
            <div>{data2["T_eff"]}</div>
            <div>{data2["R_planet"]}</div>
            <div>{data2["M_planet"]}</div>
            <div>{data2["semi_major_axis"]}</div>
            <div>{data2["eccentricity"]}</div>
            <div>{data2["inclination"]}</div>
            <div>{data2["albedo"]}</div>
            <div>{data2["distance"]}</div>
            <div>{data2["D_telescope"]}</div>
            <div>{data2["wavelength"]}</div>
            <div>{data2["IWA"]}</div>
            <div>{data2["OWA"]}</div>
            <div>{data2["contrast_limit"]}</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Herosection;
