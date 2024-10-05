import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function PlanetSphere({ colorMapLoc, scaleRatio, varietyNum, opacity }) {
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
    <mesh rotation={[0, 0, -Math.PI / 10]}>
      <mesh ref={meshRef} rotation={[0, 0, 0]}>
        <sphereGeometry args={[scaleRatio, 64, 64]} />
        <meshStandardMaterial
          opacity={opacity}
          map={colorMap}
          displacementScale={0.1 * scaleRatio}
          displacementMap={displacementMap}
          normalMap={normalMap}
          toneMapped={false}
          transparent={true}
        />
      </mesh>
    </mesh>
  );
}

export default PlanetSphere;
