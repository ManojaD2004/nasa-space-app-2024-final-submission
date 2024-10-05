import { BakeShadows, Effects, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { UnrealBloomPass } from "three-stdlib";
import PlanetSphere from "./PlanetSphere";
import resultJson from "@/data/result";
import * as THREE from "three";
import PlanetAdjacentText from "./PlanetAdjacentText";
extend({ UnrealBloomPass });

function Wrapper3D({
  planetSize1,
  planetSize2,
  planetName1,
  planetName2,
  planetTexture1,
  planetTexture2,
}) {
  const planetRef1 = useRef();
  const planetRef2 = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const stopRef = useRef(true);
  const [planetFocus, setPlanetFocus] = useState(null);
  useThree(({ camera }) => {
    cameraRef.current = camera;
  });
  useEffect(() => {
    stopRef.current = true;
  }, [planetFocus]);
  useFrame((_, delta) => {
    const step = 0.1;
    if (
      planetFocus !== null &&
      planetFocus === planetName1 &&
      planetRef1.current
    ) {
      const target = new THREE.Vector3();
      planetRef1.current.getWorldPosition(target);
      if (cameraRef.current && controlsRef.current && stopRef.current) {
        const vec = new THREE.Vector3();
        const cameraDistance =
          planetSize1 *
          7 *
          (25 / (planetSize2 > planetSize1 ? planetSize2 : planetSize1));
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
    } else if (
      planetFocus !== null &&
      planetFocus === planetName2 &&
      planetRef2.current
    ) {
      const target = new THREE.Vector3();
      planetRef2.current.getWorldPosition(target);
      if (cameraRef.current && controlsRef.current && stopRef.current) {
        const vec = new THREE.Vector3();
        const cameraDistance =
          planetSize2 *
          7 *
          (25 / (planetSize2 > planetSize1 ? planetSize2 : planetSize1));
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
    } else {
      const target = new THREE.Vector3(0, 0, 0);
      controlsRef.current.target.lerp(target, step * 0.7 * delta * 100);
      controlsRef.current.update();
    }
  });
  return (
    <>
      <ambientLight intensity={Math.PI / 15} />
      <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
      </Effects>
      <BakeShadows />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        // zoomToCursor={true}
        zoomSpeed={2}
        rotateSpeed={2}
        onStart={() => {
          stopRef.current = false;
        }}
        ref={controlsRef}
      />
      <Stars radius={2500} count={20000} depth={600} factor={20} speed={4} />
      <group
        scale={25 / (planetSize2 > planetSize1 ? planetSize2 : planetSize1)}
        position={[0, 0, 0]}
      >
        <mesh
          ref={planetRef1}
          onClick={() => {
            if (planetFocus === planetName1) {
              setPlanetFocus(null);
            } else {
              setPlanetFocus(planetName1);
            }
          }}
          position={[0, (planetSize1 + planetSize2) * 0.6, 0]}
        >
          <mesh position={[planetSize1 * 2, 0, planetSize1]}>
            <PlanetAdjacentText
              displayName={planetName1}
              scale={0.2 * planetSize1}
            />
          </mesh>
          <PlanetSphere
            scaleRatio={planetSize1}
            colorMapLoc={planetTexture1["plaTexture"]}
            varietyNum={planetTexture1["varietyNum"]}
            opacity={
              planetFocus === null || planetFocus !== planetName2 ? 1 : 0.2
            }
          />
        </mesh>
        <mesh
          ref={planetRef2}
          onClick={() => {
            if (planetFocus === planetName2) {
              setPlanetFocus(null);
            } else {
              setPlanetFocus(planetName2);
            }
          }}
          position={[0, -(planetSize1 + planetSize2) * 0.6, 0]}
        >
          <mesh position={[planetSize2 * 2, 0, planetSize2]}>
            <PlanetAdjacentText
              displayName={planetName2}
              scale={0.2 * planetSize2}
            />
          </mesh>
          <PlanetSphere
            scaleRatio={planetSize2}
            colorMapLoc={planetTexture2["plaTexture"]}
            varietyNum={planetTexture2["varietyNum"]}
            opacity={
              planetFocus === null || planetFocus !== planetName1 ? 1 : 0.2
            }
          />
        </mesh>
      </group>
      <mesh position={[5000, 0, -2500]}>
        <sphereGeometry args={[20, 64, 64]} />
        <meshStandardMaterial
          emissive={"orange"}
          emissiveIntensity={2}
          toneMapped={false}
        />
        <pointLight
          angle={0.15}
          penumbra={1}
          decay={0.2}
          intensity={Math.PI * 2.5}
        />
      </mesh>
    </>
  );
}

function PlanetsCompare({ planetName1, planetName2 }) {
  const planetData1 = resultJson.find(
    (item) => item["pl_name"] === planetName1
  );
  const planetData2 = resultJson.find(
    (item) => item["pl_name"] === planetName2
  );
  const planetSize1 = Number(
    planetData1["Planet Radius"].replace(" Earth radii", "")
  );
  const planetSize2 = Number(
    planetData2["Planet Radius"].replace(" Earth radii", "")
  );
  const planetTexture1 = {
    plaTexture: planetData1["plaTexture"],
    varietyNum: planetData1["varietyNum"],
  };
  const planetTexture2 = {
    plaTexture: planetData2["plaTexture"],
    varietyNum: planetData2["varietyNum"],
  };
  return (
    <Canvas
      camera={{ position: [240, 60, 0], fov: 30, far: 500000, near: 0.1 }}
    >
      <Wrapper3D
        planetSize1={planetSize1}
        planetSize2={planetSize2}
        planetName1={planetName1}
        planetName2={planetName2}
        planetTexture1={planetTexture1}
        planetTexture2={planetTexture2}
      />
    </Canvas>
  );
}

export default PlanetsCompare;
