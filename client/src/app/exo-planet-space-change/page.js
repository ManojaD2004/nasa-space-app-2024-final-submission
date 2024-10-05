"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  extend,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { BakeShadows, Effects, Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";
import { folder, useControls } from "leva";
import System from "./components/System";
import {
  SUN_RADIUS,
  DISTANCE_FROM_EARTH_TO_SUN,
  ORBIT_TO_SUN,
  SPACE_SIZE,
} from "./macro";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Poppins } from "next/font/google";
extend({ UnrealBloomPass });

const TEXTURE_PACK = [
  { textureLoc: "planet1", varietyNums: 4 },
  { textureLoc: "planet2", varietyNums: 2 },
  { textureLoc: "planet3", varietyNums: 4 },
  { textureLoc: "planet4", varietyNums: 3 },
  { textureLoc: "planet5", varietyNums: 3 },
];

const poppinsFont = Poppins({subsets: ["latin"], weight: "600"});
// Preload texture for not getting delay black screen of death
for (let index = 0; index < TEXTURE_PACK.length; index++) {
  for (let j = 1; j <= TEXTURE_PACK[index].varietyNums; j++) {
    useLoader.preload(TextureLoader, [
      `/texture/${TEXTURE_PACK[index].textureLoc}/2k_${TEXTURE_PACK[index].textureLoc}_${j}.jpg`,
      `/texture/${TEXTURE_PACK[index].textureLoc}/2k_${TEXTURE_PACK[index].textureLoc}_specular_map.jpg`,
      `/texture/${TEXTURE_PACK[index].textureLoc}/2k_${TEXTURE_PACK[index].textureLoc}_normal_map.jpg`,
    ]);
  }
}

function Wrapper3D({ PLANET_DATA }) {
  const planetSelect = {};
  const listOfExo = Object.keys(PLANET_DATA);
  for (let i = 0; i < listOfExo.length; i++) {
    planetSelect[listOfExo[i]] = listOfExo[i];
  }
  const [leavCont, setLeva] = useControls(() => ({
    "Universe Settings": folder({
      "Select Planet": {
        options: planetSelect,
      },
      "Change View (Planet/Star)": {
        value: false,
      },
      "Display System Text": {
        value: true,
      },
      "Speed Of Zoom": {
        value: 0.03,
        min: 0.01,
        max: 0.1,
        step: 0.01,
      },
    }),
    "Planet Settings": folder({
      "Revolution Speed": {
        value: 0.2,
        min: 0,
        max: 1,
        step: 0.1,
      },
      "Display Planet Text": {
        value: true,
      },
    }),
    "Star Settings": folder({
      "Display Star": {
        value: true,
      },
    }),
  }));
  const hostName = leavCont["Select Planet"];
  const plaOrSun = leavCont["Change View (Planet/Star)"];
  const zoomSpeed = leavCont["Speed Of Zoom"];
  const displayStarText = leavCont["Display System Text"];
  const displayPlaText = leavCont["Display Planet Text"];
  const displayStar = leavCont["Display Star"];
  const revolSpeed = leavCont["Revolution Speed"];
  const controlsRef = useRef();
  const planetRef = useRef();
  const cameraRef = useRef();
  const sunRef = useRef();
  const starRef = useRef();
  const stopRef = useRef(true);
  useThree(({ camera }) => {
    cameraRef.current = camera;
  });
  useEffect(() => {
    stopRef.current = true;
    if (sunRef.current && starRef.current) {
      const target1 = new THREE.Vector3();
      sunRef.current.getWorldPosition(target1);
      starRef.current.position.set(target1.x, target1.y, target1.z);
    }
  }, [plaOrSun, hostName]);

  useFrame((_, delta) => {
    if (
      plaOrSun === true &&
      planetRef.current &&
      controlsRef.current &&
      cameraRef.current
    ) {
      const step = zoomSpeed;
      const target = new THREE.Vector3();
      planetRef.current.getWorldPosition(target);
      if (planetRef.current && cameraRef.current && stopRef.current === true) {
        const vec = new THREE.Vector3();
        const cameraDistance =
          PLANET_DATA[hostName].orbitRad *
          PLANET_DATA[hostName].planetScale *
          0.4;
        const cameraOffset = new THREE.Vector3(
          cameraDistance,
          cameraDistance / 4,
          0
        );
        vec.lerpVectors(
          cameraRef.current.position,
          target.clone().add(cameraOffset),
          step * 0.5 * delta * 100
        );
        cameraRef.current.position.copy(vec);
        cameraRef.current.updateProjectionMatrix();
      }
      controlsRef.current.target.lerp(target, step * 0.7 * delta * 100);
      controlsRef.current.update();
      const target1 = controlsRef.current.target;
      const distance = cameraRef.current.position.distanceTo(target1);
      const scaleNum =
        (1 / distance) *
        PLANET_DATA[hostName].planetScale *
        PLANET_DATA[hostName].orbitRad *
        PLANET_DATA[hostName].sunScale;
      planetRef.current.scale.set(scaleNum, scaleNum, scaleNum);
    } else if (
      plaOrSun === false &&
      sunRef.current &&
      controlsRef.current &&
      cameraRef.current
    ) {
      const step = zoomSpeed;
      if (sunRef.current && cameraRef.current && stopRef.current === true) {
        const cameraDistance = 20;
        const cameraOffset = new THREE.Vector3(
          cameraDistance,
          cameraDistance / 4,
          0
        );
        const target1 = new THREE.Vector3();
        sunRef.current.getWorldPosition(target1);
        const vec = new THREE.Vector3();
        vec.lerpVectors(
          cameraRef.current.position,
          target1.clone().add(cameraOffset),
          step * 0.5 * delta * 100
        );
        cameraRef.current.position.copy(vec);
        cameraRef.current.updateProjectionMatrix();
      }
      const target = new THREE.Vector3();
      sunRef.current.getWorldPosition(target);
      controlsRef.current.target.lerp(target, step * 0.7 * delta * 100);
      controlsRef.current.update();
    }
  });
  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        // zoomToCursor={true}
        zoomSpeed={4}
        rotateSpeed={2}
        onStart={() => {
          stopRef.current = false;
        }}
      />
      <ambientLight intensity={Math.PI / 10} />
      <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
      </Effects>
      <BakeShadows />
      {displayStar === true && (
        <Stars
          ref={starRef}
          radius={250000}
          count={20000}
          depth={6000}
          factor={200}
          speed={4}
        />
      )}
      <group scale={SPACE_SIZE}>
        {listOfExo.map((ele, index) => (
          <System
            key={index}
            plaOrSun={plaOrSun}
            hostName={hostName}
            setLeva={setLeva}
            displayPlaText={displayPlaText}
            displayStarText={displayStarText}
            revolSpeed={revolSpeed}
            sunRef={hostName === PLANET_DATA[ele].plaName ? sunRef : null}
            planetRef={hostName === PLANET_DATA[ele].plaName ? planetRef : null}
            position={PLANET_DATA[ele].position}
            planetScale={PLANET_DATA[ele].planetScale}
            sunScale={PLANET_DATA[ele].sunScale}
            systemName={PLANET_DATA[ele].systemName}
            plaName={PLANET_DATA[ele].plaName}
            orbitRad={PLANET_DATA[ele].orbitRad}
            plaTexture={PLANET_DATA[ele].plaTexture}
            varietyNum={PLANET_DATA[ele].varietyNum}
          />
        ))}
      </group>
    </>
  );
}

export default function Home() {
  const [planetData, setPlanetData] = useState(null);
  const [isLoading, setIsLoading] = useState("true");
  useEffect(() => {
    if (window) {
      try {
        const newPlanetData = {
          Earth: {
            plaName: "Earth",
            systemName: "Sun",
            orbitRad: 1 * ORBIT_TO_SUN * DISTANCE_FROM_EARTH_TO_SUN,
            planetScale: 1,
            sunScale: 1 * ORBIT_TO_SUN * SUN_RADIUS,
            position: [0, 0, 0],
            plaTexture: "earth",
            varietyNum: 1,
          },
        };
        const resultJson = JSON.parse(
          window.localStorage.getItem("resultData")
        );
        for (let i = 0; i < resultJson.length; i++) {
          const exoSpace = resultJson[i];
          if (exoSpace["hostname"] === "Sun") {
            continue;
          }
          const orbDis = exoSpace["Semi-Major Axis"].replace(" AU", "");
          // % of distance from earth to sun same for below
          const plSize = exoSpace["Planet Radius"].replace(" Earth radii", "");
          const sunSize = exoSpace["Stellar Radius"].replace(
            " Solar radii",
            ""
          );
          const worldPosDis = exoSpace["Distance from Earth"].replace(
            " parsecs",
            ""
          );
          const distance =
            Number(worldPosDis) *
            206264.806 *
            0.0000001 *
            DISTANCE_FROM_EARTH_TO_SUN;
          const theta = Math.random() * 2 * Math.PI;
          const phi = Math.random() * Math.PI;
          const x = distance * Math.sin(phi) * Math.cos(theta);
          const y = distance * Math.cos(phi);
          const z = distance * Math.sin(phi) * Math.sin(theta);
          const worldPosition = [x, y, z];
          newPlanetData[exoSpace["pl_name"]] = {
            plaName: exoSpace["pl_name"],
            systemName: exoSpace["hostname"],
            orbitRad:
              Number(orbDis) * ORBIT_TO_SUN * DISTANCE_FROM_EARTH_TO_SUN,
            planetScale: Number(plSize),
            sunScale: Number(sunSize) * ORBIT_TO_SUN * SUN_RADIUS,
            position: worldPosition,
            plaTexture: exoSpace["plaTexture"],
            varietyNum: exoSpace["varietyNum"],
          };
        }
        setPlanetData(newPlanetData);
        setIsLoading("false");
      } catch (error) {
        setIsLoading("error");
      }
    }
  }, []);
  return (
    <main className="h-screen m-[unset] relative bg-slate-950">
      <Canvas
        camera={{ position: [240, 120, 120], fov: 50, far: 500000, near: 0.1 }}
      >
        {isLoading === "true" ? (
          <Html>
            <div className={poppinsFont.className}>
              Your Universe is Loading...
            </div>
          </Html>
        ) : isLoading === "error" ? (
          <Html>
            <div className={poppinsFont.className}>
              There has been error loading your exoplanets. Please try again
              submitting your data...
            </div>
          </Html>
        ) : (
          planetData !== null && <Wrapper3D PLANET_DATA={planetData} />
        )}
      </Canvas>
    </main>
  );
}
