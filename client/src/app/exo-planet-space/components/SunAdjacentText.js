import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRouter } from "next/navigation";

function SunAdjacentText({ displayName, hostName, scale }) {
  const router=useRouter();
  const textRef = useRef();
  const textOffset = new THREE.Vector3(scale * 1.4, scale * 1.4, scale * -0.7);

  useFrame(({ camera }) => {
    textRef.current.lookAt(camera.position);
  });
  const handleClick = () => {
 
    //router.push(`/exo-planet-comparision?planet1=${encodeURIComponent(hostName)}`);
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

export default SunAdjacentText;
