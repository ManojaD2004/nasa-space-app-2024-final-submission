"use client";
import React from "react";
import resultJson from "@/data/result"; 
import { usePathname } from "next/navigation";
import Header from "@/app/habitable-calculator/components/Header";

const PlanetInfo = () => {
  const routerPathname = usePathname(); 
  const plName = decodeURIComponent(routerPathname.split('/').pop()).trim(); 

  console.log("router name:", routerPathname); 
  console.log("planet Name:", plName); 
  
  
  const planetData = resultJson.find(item => item.hostname === plName); 

  if (!planetData) {
    return <div className="p-6 text-red-500">Planet not found!</div>; 
  }

  return (
    <div>
      <Header/>
    <div className="p-6">
      <h1 className="text-3xl font-bold">{planetData.pl_name}</h1>
        
      <ul className="space-y-2 mt-4">
        <li ><strong>Host Star:</strong> The name of the star hosting the planet is {planetData.hostname}</li>
        <li><strong>Orbital Period:</strong>The orbital period of the planet is {planetData["Orbital Period"]}</li>
        <li><strong>Semi-Major Axis:</strong> {planetData["Semi-Major Axis"]}</li>
        <li><strong>Planet Radius:</strong> {planetData["Planet Radius"]}</li>
        <li><strong>Planet Mass:</strong>The mass of the planet is {planetData["Planet Mass"]}</li>
        <li><strong>Planet Density:</strong> {planetData["Planet Density"]}</li>
        <li><strong>Effective Temperature:</strong>The effective temperature of the planet is {planetData["Effective Temperature"]}</li>
        <li><strong>Distance from Earth:</strong> {planetData["Distance from Earth"]}</li>
        <li><strong>Stellar Mass:</strong> {planetData["Stellar Mass"]}</li>
        <li><strong>Stellar Radius:</strong> {planetData["Stellar Radius"]}</li>
        <li><strong>Stellar Luminosity:</strong> {planetData["Stellar Luminosity"]}</li>
      </ul>
    </div>
    </div>
  );
};

export default PlanetInfo;
