import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function SunSphere({ sunScale, sunRef, intenLight }) {
  const meshRef = useRef();
  const colorMap = useLoader(TextureLoader, "/texture/sun/2k_sun.jpg");
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  return (
    <mesh ref={sunRef}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} ref={meshRef}>
        <pointLight
          position={[0, 0, 0]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI * 0.6 * intenLight}
        />
        <sphereGeometry args={[sunScale, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          emissive={"orange"}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </mesh>
  );
}

export default SunSphere;
