import React, { useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function PlanetAdjacentText({ displayName, scale, setLeva, plaOrSun }) {
  const textRef = useRef();

  useFrame(({ camera }) => {
    textRef.current.lookAt(camera.position);
  });
  const handleClick = () => {
    if (plaOrSun) {
      // window.open(
      //   `/exo-planet-comparision?planet1=${encodeURIComponent(displayName)}`
      // );
    } else {
      setLeva({
        "Change View (Planet/Star)": true,
      });
    }
  };

  return (
    <Text
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

export default PlanetAdjacentText;
