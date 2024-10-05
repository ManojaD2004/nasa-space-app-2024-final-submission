import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function PlanetAdjacentText({ displayName, scale }) {
  const textRef = useRef();

  useFrame(({ camera }) => {
    textRef.current.lookAt(camera.position);
  });

  return (
    <Text
      ref={textRef}
      scale={[scale, scale, scale]}
      color="#cbcbcb"
      anchorX="center"
      anchorY="middle"
      cursor="pointer"
      font="/fonts/fox_version_5_by_mickeyfan123_daxvfx5.ttf"
    >
      {displayName}
    </Text>
  );
}

export default PlanetAdjacentText;
