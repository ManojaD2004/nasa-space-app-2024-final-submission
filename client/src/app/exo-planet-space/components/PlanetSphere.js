import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function PlanetSphere({ colorMapLoc, scaleRatio, planetRef, varietyNum }) {
  const meshRef = useRef();
  const [colorMap, displacementMap, normalMap] = useLoader(TextureLoader, [
    `/texture/${colorMapLoc}/2k_${colorMapLoc}_${varietyNum}.jpg`,
    `/texture/${colorMapLoc}/2k_${colorMapLoc}_specular_map.jpg`,
    `/texture/${colorMapLoc}/2k_${colorMapLoc}_normal_map.jpg`,
  ]);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta;
    }
  });
  return (
    <group>
      <mesh rotation={[-Math.PI / 10, 0, 0]} ref={planetRef}>
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[scaleRatio, 64, 64]} />
          <meshStandardMaterial
            map={colorMap}
            displacementScale={0.1 * scaleRatio}
            displacementMap={displacementMap}
            normalMap={normalMap}
            toneMapped={false}
          />
        </mesh>
      </mesh>
    </group>
  );
}

export default PlanetSphere;
