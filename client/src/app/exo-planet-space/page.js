"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  extend,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
  BakeShadows,
  Effects,
  Html,
  OrbitControls,
  Stars,
  Text,
} from "@react-three/drei";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { UnrealBloomPass } from "three-stdlib";
import resultJson from "@/data/result";
extend({ UnrealBloomPass });
import { Poppins } from "next/font/google";
import { folder, useControls } from "leva";

const poppinsFont = Poppins({ subsets: ["latin"], weight: "500" });

const SPACE_SIZE = 3;
const ORBIT_TO_SUN = 0.003;
const DISTANCE_FROM_EARTH_TO_SUN = 23479.8304;
const SUN_RADIUS = 109.2983;
const LIMIT_VALUE = resultJson.length;

const DEFAULT_DATA = {
  Sun: {
    pl_name: "Earth",
    sun_name: "Sun",
    orbit_distance: 1,
    pl_size: 1,
    sun_size: 1,
    world_position: [0, 0, 0],
    plaTexture: "/texture/solar/earth/2k_earth_daymap.jpg",
  },
};

const TEXTURE_PACK = [
  "/texture/solar/jupiter/2k_jupiter.jpg",
  "/texture/solar/mars/2k_mars.jpg",
  "/texture/solar/mercury/2k_mercury.jpg",
  "/texture/solar/neptune/2k_neptune.jpg",
  "/texture/solar/saturn/2k_saturn.jpg",
  "/texture/solar/uranus/2k_uranus.jpg",
  "/texture/solar/venus/2k_venus_surface.jpg",
];

for (let i = 0; i < LIMIT_VALUE; i++) {
  const exoSpace = resultJson[i];
  if (exoSpace["hostname"] === "Sun") {
    continue;
  }
  const orbDis = exoSpace["Semi-Major Axis"].replace(" AU", "");
  // % of distance from earth to sun same for below
  const plSize = exoSpace["Planet Radius"].replace(" Earth radii", "");
  const sunSize = exoSpace["Stellar Radius"].replace(" Solar radii", "");
  const worldPosDis = exoSpace["Distance from Earth"].replace(" parsecs", "");
  const distance = Number(worldPosDis) * 300;
  const theta = Math.random() * 2 * Math.PI;
  const phi = Math.random() * Math.PI;
  const x = distance * Math.sin(phi) * Math.cos(theta);
  const y = distance * Math.cos(phi);
  const z = distance * Math.sin(phi) * Math.sin(theta);
  const worldPosition = [x, y, z];
  DEFAULT_DATA[exoSpace["hostname"]] = {
    pl_name: exoSpace["pl_name"],
    sun_name: exoSpace["hostname"],
    orbit_distance: orbDis === "" ? 1 : Number(orbDis),
    pl_size: plSize === "" ? 1 : Number(plSize),
    sun_size: sunSize === "" ? 1 : Number(sunSize),
    world_position: worldPosition,
    plaTexture: TEXTURE_PACK[Math.floor(Math.random() * TEXTURE_PACK.length)],
  };
}

function AdjacentText({
  displayName,
  hostName,
  scale = 17,
  plaFlag = false,
  setLeva,
}) {
  const textRef = useRef();
  const textOffset = new THREE.Vector3(
    (scale / 17) * 50,
    (scale / 17) * 50,
    (scale / 17) * -30
  );

  useFrame(({ camera }) => {
    textRef.current.lookAt(camera.position);
  });
  const handleClick = () => {
    if (plaFlag === false) {
      window.open(`/exo-planet-space/planet/${hostName}`, "_blank");
    } else {
      setLeva({
        "Change View (Planet/Star)": true,
      });
    }
  };

  return (
    <Text
      position={textOffset}
      ref={textRef}
      scale={[scale, scale, scale]}
      color="#cbcbcb"
      anchorX="center"
      anchorY="middle"
      onClick={handleClick}
      cursor="pointer"
      font="/fonts/fox_version_5_by_mickeyfan123_daxvfx5.ttf"
    >
      {displayName}
    </Text>
  );
}

function BigSphereObj({
  scaleRatio,
  sunRef,
  setLeva,
  hostName,
  systemName,
  displayPlaText,
  intenLight,
  colorMapLoc = "/texture/solar/sun/2k_sun.jpg",
  emissiveColor = "orange",
}) {
  const meshRef = useRef();
  const colorMap = useLoader(TextureLoader, colorMapLoc);
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={sunRef}>
      {hostName !== systemName && displayPlaText === true && (
        <Html>
          <div className={poppinsFont.className}>
            <div
              onClick={() => {
                setLeva({
                  "Select Planet": systemName,
                  "Change View (Planet/Star)": false,
                });
              }}
              className="text-white text-lg select-none cursor-pointer"
            >
              {systemName}
            </div>
          </div>
        </Html>
      )}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} ref={meshRef}>
        <pointLight
          position={[0, 0, 0]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={hostName === systemName ? Math.PI * 1.2 * intenLight : 0}
        />
        <sphereGeometry
          args={[SPACE_SIZE * ORBIT_TO_SUN * SUN_RADIUS * scaleRatio, 64, 64]}
        />
        <meshStandardMaterial
          map={colorMap}
          emissive={emissiveColor}
          emissiveIntensity={hostName === systemName ? 2 : 0}
          toneMapped={false}
        />
      </mesh>
    </mesh>
  );
}

function SmallSphereObj({
  colorMapLoc = "/texture/solar/earth/2k_earth_daymap.jpg",
  scaleRatio,
  planetRef,
  plaName = "Earth",
}) {
  const meshRef1 = useRef();
  const [colorMap, displacementMap, normalMap] = useLoader(TextureLoader, [
    colorMapLoc,
    "/texture/solar/earth/2k_earth_specular_map.jpg",
    "/texture/solar/earth/2k_earth_normal_map.jpg",
  ]);
  const [hovered, setHover] = useState(false);
  useFrame((state, delta) => {
    meshRef1.current.rotation.y += delta;
  });
  return (
    <group
      // scale={hovered ? 3 : 1}
      onPointerOver={(event) => {
        setHover(true);
      }}
      onPointerOut={(event) => {
        setHover(false);
      }}
    >
      <mesh rotation={[-Math.PI / 10, 0, 0]} ref={planetRef}>
        <mesh ref={meshRef1} rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[SPACE_SIZE * scaleRatio, 64, 64]} />
          <meshStandardMaterial
            map={colorMap}
            displacementScale={-0.1 * SPACE_SIZE * scaleRatio}
            displacementMap={displacementMap}
            normalMap={normalMap}
            toneMapped={false}
          />
        </mesh>
      </mesh>
    </group>
  );
}

function OrbitComponent({
  xRadius,
  yRadius,
  colorMapLoc,
  speedPla,
  scaleRatio,
  planetRef,
  hostName,
  plaName,
  systemName,
  setLeva,
  displayPlaText,
  revolSpeed,
  plaOrSun,
  zValue = 1,
}) {
  const ellipseCurve = new THREE.EllipseCurve(
    0,
    0,
    xRadius * SPACE_SIZE * ORBIT_TO_SUN,
    yRadius * SPACE_SIZE * ORBIT_TO_SUN,
    0,
    2 * Math.PI,
    false,
    0
  );
  const boxRef = useRef();
  const timeRef = useRef(0);

  const points = ellipseCurve.getPoints(500);
  useFrame((state, delta) => {
    if (boxRef.current) {
      timeRef.current += delta * 10 * revolSpeed;
      const newP = ellipseCurve.getPoint(timeRef.current * speedPla);
      boxRef.current.position.x = newP.x;
      boxRef.current.position.y = newP.y;
    }
  });
  return (
    <mesh position={[0, 0, 0]} rotation={[(Math.PI / 2) * zValue, 0, 0]}>
      {hostName === systemName && (
        <mesh ref={boxRef} position={[0, 0, 0]}>
          {displayPlaText === true && (
            <mesh>
              <AdjacentText
                displayName={plaName}
                hostName={hostName}
                scale={plaOrSun === false ? xRadius * SPACE_SIZE * 0.0001 : 1}
                plaFlag={true}
                setLeva={setLeva}
              />
            </mesh>
          )}
          <SmallSphereObj
            colorMapLoc={colorMapLoc}
            scaleRatio={scaleRatio}
            planetRef={planetRef}
            plaName={plaName}
          />
        </mesh>
      )}
      <mesh>
        <Line
          points={points}
          color={"cyan"}
          lineWidth={1}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
    </mesh>
  );
}

function ThreeDComp({
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
  revolSpeed,
  plaTexture,
}) {
  const earthOrbit = DISTANCE_FROM_EARTH_TO_SUN * orbitRad;
  return (
    <group position={position}>
      {hostName === systemName && (
        <AdjacentText displayName={hostName} scale={orbitRad * 17 * sunScale} hostName={hostName} />
      )}
      <BigSphereObj
        scaleRatio={sunScale}
        sunRef={sunRef}
        hostName={hostName}
        systemName={systemName}
        setLeva={setLeva}
        plaName={plaName}
        displayPlaText={displayPlaText}
        intenLight={orbitRad * sunScale}
      />
      <OrbitComponent
        xRadius={earthOrbit}
        yRadius={earthOrbit}
        colorMapLoc={plaTexture}
        speedPla={0.01}
        scaleRatio={
          plaOrSun === false ? planetScale * ORBIT_TO_SUN : planetScale
        }
        planetRef={planetRef}
        hostName={hostName}
        systemName={systemName}
        plaOrSun={plaOrSun}
        setLeva={setLeva}
        plaName={plaName}
        displayPlaText={displayPlaText}
        revolSpeed={revolSpeed}
      />
    </group>
  );
}

function Wrapper3D({
  plaOrSun,
  hostName,
  setLeva,
  zoomSpeed,
  displayPlaText,
  displayStar,
  revolSpeed,
}) {
  const controlsRef = useRef();
  const planetRef = useRef();
  const cameraRef = useRef();
  const sunRef = useRef();
  const extractValue = plaOrSun;
  const listOfExo = Object.keys(DEFAULT_DATA).slice(0, LIMIT_VALUE);
  const starRef = useRef();
  const stopRef = useRef(true);
  useThree(({ camera }) => {
    cameraRef.current = camera;
  });
  useEffect(() => {
    stopRef.current = true;
    if (plaOrSun === true && planetRef.current && cameraRef.current) {
      const target = new THREE.Vector3();
      const target1 = new THREE.Vector3();
      sunRef.current.getWorldPosition(target1);
      planetRef.current.getWorldPosition(target);
      const cameraDistance = 16;
      const cameraOffset = new THREE.Vector3(cameraDistance, 0, 0);
      cameraRef.current.position.copy(target.clone().add(cameraOffset));
      cameraRef.current.lookAt(target1);
      cameraRef.current.rotation.set(0, Math.PI / 2, 0);
    }
  }, [extractValue, hostName]);

  useFrame((state, delta) => {
    if (
      plaOrSun === true &&
      planetRef.current &&
      controlsRef.current &&
      cameraRef.current
    ) {
      const step = zoomSpeed;
      const target = new THREE.Vector3();
      planetRef.current.getWorldPosition(target);
      controlsRef.current.target.lerp(target, step);
      controlsRef.current.update();
      const target1 = controlsRef.current.target;
      const distance = cameraRef.current.position.distanceTo(target1);
      planetRef.current.scale.set(
        (10 / distance) *
          DEFAULT_DATA[hostName].pl_size *
          DEFAULT_DATA[hostName].orbit_distance *
          DEFAULT_DATA[hostName].sun_size,
        (10 / distance) *
          DEFAULT_DATA[hostName].pl_size *
          DEFAULT_DATA[hostName].orbit_distance *
          DEFAULT_DATA[hostName].sun_size,
        (10 / distance) *
          DEFAULT_DATA[hostName].pl_size *
          DEFAULT_DATA[hostName].orbit_distance *
          DEFAULT_DATA[hostName].sun_size
      );
    } else if (
      plaOrSun === false &&
      sunRef.current &&
      controlsRef.current &&
      starRef.current
    ) {
      if (sunRef.current && cameraRef.current && stopRef.current === true) {
        const step = zoomSpeed;
        const target1 = new THREE.Vector3();
        sunRef.current.getWorldPosition(target1);
        starRef.current.position.set(target1.x, target1.y, target1.z);
        const cameraDistance = 20;
        const cameraOffset = new THREE.Vector3(
          cameraDistance,
          cameraDistance / 4,
          0
        );
        const vec = new THREE.Vector3();
        vec.lerpVectors(
          cameraRef.current.position,
          target1.clone().add(cameraOffset),
          step
        );
        cameraRef.current.position.copy(vec);
        cameraRef.current.lookAt(sunRef.current.position);
        cameraRef.current.updateProjectionMatrix();
      }
      const target = new THREE.Vector3();
      sunRef.current.getWorldPosition(target);
      controlsRef.current.target.copy(target);
      controlsRef.current.update();
    }
  });
  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        zoomToCursor={true}
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
          radius={10000}
          count={20000}
          depth={6000}
          factor={200}
          // fade={true}
          speed={4}
        />
      )}

      {listOfExo.map((ele, index) => (
        <ThreeDComp
          key={index}
          plaOrSun={plaOrSun}
          position={DEFAULT_DATA[ele].world_position}
          sunRef={hostName === DEFAULT_DATA[ele].sun_name ? sunRef : null}
          planetRef={hostName === DEFAULT_DATA[ele].sun_name ? planetRef : null}
          planetScale={DEFAULT_DATA[ele].pl_size}
          sunScale={DEFAULT_DATA[ele].sun_size}
          hostName={hostName}
          systemName={DEFAULT_DATA[ele].sun_name}
          plaName={DEFAULT_DATA[ele].pl_name}
          setLeva={setLeva}
          orbitRad={DEFAULT_DATA[ele].orbit_distance}
          plaTexture={DEFAULT_DATA[ele].plaTexture}
          displayPlaText={displayPlaText}
          revolSpeed={revolSpeed}
        />
      ))}
    </>
  );
}

const plaArray = Object.keys(DEFAULT_DATA);

const planetSelect = {};
for (let i = 0; i < LIMIT_VALUE; i++) {
  planetSelect[plaArray[i]] = plaArray[i];
}
export default function Home() {
  const [leavCont, setLeva] = useControls(() => ({
    "Universe Settings": folder({
      "Select Planet": {
        options: planetSelect,
      },
      "Change View (Planet/Star)": {
        value: false,
      },
      "Display Planet Text": {
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
    }),
    "Star Settings": folder({
      "Display Star": {
        value: true,
      },
    }),
  }));
  // console.log(leavCont);
  // const listOfExo = Object.keys(DEFAULT_DATA).slice(0, leavCont.size);
  return (
    <main className="h-screen m-[unset] relative bg-slate-950">
      <Canvas
        camera={{ position: [240, 120, 120], fov: 50, far: 500000, near: 1 }}
      >
        <Wrapper3D
          hostName={leavCont["Select Planet"]}
          plaOrSun={leavCont["Change View (Planet/Star)"]}
          setLeva={setLeva}
          zoomSpeed={leavCont["Speed Of Zoom"]}
          displayPlaText={leavCont["Display Planet Text"]}
          displayStar={leavCont["Display Star"]}
          revolSpeed={leavCont["Revolution Speed"]}
        />
      </Canvas>
    </main>
  );
}
