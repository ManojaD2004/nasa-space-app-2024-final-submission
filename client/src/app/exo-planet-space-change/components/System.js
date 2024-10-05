import React from "react";
import Orbit from "./Orbit";
import SunSphere from "./SunSphere";
import SunAdjacentText from "./SunAdjacentText";
import { ORBIT_TO_SUN } from "../macro";
import { Html } from "@react-three/drei";
import { Poppins } from "next/font/google";
const poppinsFont = Poppins({ subsets: ["latin"], weight: "500" });
function System({
  plaOrSun,
  position,
  sunRef,
  planetRef,
  planetScale,
  sunScale,
  hostName,
  systemName,
  setLeva,
  orbitRad,
  plaName,
  displayPlaText,
  displayStarText,
  revolSpeed,
  plaTexture,
  varietyNum,
}) {
  return (
    <group position={position}>
      {hostName === plaName && (
        <>
          <SunAdjacentText
            displayName={systemName}
            scale={orbitRad * 0.05}
            hostName={systemName}
          />
          <SunSphere
            sunScale={sunScale}
            sunRef={sunRef}
            intenLight={1}
          />
        </>
      )}
      {hostName !== plaName && displayStarText === true && (
        <Html>
          <div className={poppinsFont.className}>
            <div
              onClick={() => {
                setLeva({
                  "Select Planet": plaName,
                  "Change View (Planet/Star)": false,
                });
              }}
              className="text-white text-lg select-none cursor-pointer"
            >
              {plaName}
            </div>
          </div>
        </Html>
      )}
      <Orbit
        xRadius={orbitRad}
        yRadius={orbitRad}
        colorMapLoc={plaTexture}
        varietyNum={varietyNum}
        scaleRatio={
          plaOrSun === false ? planetScale * ORBIT_TO_SUN : planetScale
        }
        planetRef={planetRef}
        hostName={hostName}
        plaOrSun={plaOrSun}
        setLeva={setLeva}
        plaName={plaName}
        displayPlaText={displayPlaText}
        revolSpeed={revolSpeed}
      />
    </group>
  );
}

export default System;
