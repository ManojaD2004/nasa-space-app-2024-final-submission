import React, { useRef } from "react";
import { Line } from "@react-three/drei";
import PlanetSphere from "./PlanetSphere";
import PlanetAdjacentText from "./PlanetAdjacentText";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function OrbitAnimation({
  displayPlaText,
  xRadius,
  scaleRatio,
  setLeva,
  ellipseCurve,
  planetRef,
  plaName,
  plaOrSun,
  colorMapLoc,
  varietyNum,
  revolSpeed,
}) {
  const boxRef = useRef();
  const textRef = useRef();
  const timeRef = useRef(0);
  useFrame((_, delta) => {
    timeRef.current += delta * 10 * revolSpeed;
    const newP = ellipseCurve.getPoint(timeRef.current * 0.01);
    if (boxRef.current) {
      boxRef.current.position.x = newP.x;
      boxRef.current.position.y = newP.y;
    }
    if (textRef.current) {
      textRef.current.position.x = newP.x * 1.1;
      textRef.current.position.y = newP.y * 1.1;
    }
  });
  return (
    <>
      {displayPlaText === true && (
        <mesh ref={textRef} position={[0, 0, xRadius * 0.03 * -1.3]}>
          <PlanetAdjacentText
            displayName={plaName}
            scale={
              plaOrSun === false ? xRadius * 0.03 : xRadius * 0.03 * scaleRatio
            }
            plaOrSun={plaOrSun}
            setLeva={setLeva}
          />
        </mesh>
      )}
      <mesh ref={boxRef}>
        <PlanetSphere
          colorMapLoc={colorMapLoc}
          varietyNum={varietyNum}
          scaleRatio={scaleRatio}
          planetRef={planetRef}
        />
      </mesh>
    </>
  );
}

function Orbit({
  xRadius,
  yRadius,
  colorMapLoc,
  scaleRatio,
  planetRef,
  hostName,
  plaName,
  setLeva,
  displayPlaText,
  revolSpeed,
  plaOrSun,
  zValue = 1,
  varietyNum,
}) {
  const ellipseCurve = new THREE.EllipseCurve(
    0,
    0,
    xRadius,
    yRadius,
    0,
    2 * Math.PI,
    false,
    0
  );
  const points = ellipseCurve.getPoints(500);
  return (
    <mesh position={[0, 0, 0]} rotation={[(Math.PI / 2) * zValue, 0, 0]}>
      {hostName === plaName && (
        <OrbitAnimation
          ellipseCurve={ellipseCurve}
          xRadius={xRadius}
          scaleRatio={scaleRatio}
          planetRef={planetRef}
          setLeva={setLeva}
          displayPlaText={displayPlaText}
          plaName={plaName}
          colorMapLoc={colorMapLoc}
          varietyNum={varietyNum}
          plaOrSun={plaOrSun}
          revolSpeed={revolSpeed}
        />
      )}
      <mesh>
        <Line
          points={points}
          color={hostName === plaName ? "orange" : "cyan"}
          lineWidth={1}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
    </mesh>
  );
}

export default Orbit;
