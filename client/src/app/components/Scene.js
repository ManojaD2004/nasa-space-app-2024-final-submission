'use client';

import { useState, useRef ,useEffect } from 'react';
import { Canvas, useFrame,useLoader } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, useGLTF, Loader } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';
import LoadingScreen from './Loading';
import MouseBallComponent from './MouseBalll';
import Overlay from './Overlay';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export default function Scene() {
  // const [loading, setLoading] = useState(true);

  // if (loading) return <LoadingScreen setLoading={setLoading}/>
  return (
        <div className="relative overflow-hidden bg-black w-[100%] h-[100%]">
          <Canvas camera={{ position: [0, 0, 1], }}>
          <ambientLight intensity={0.5} />
    
            <directionalLight position={[5, 5, 5]} intensity={2} />
    {/* <MouseBallComponent/> */}
            <Stars />
            <Astronaut />
          </Canvas>
          <Loader/>
    <Overlay/>
    </div>
  );
}

function Stars() {
  const starsRef = useRef();
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(5000), { radius: 1.5 })
  );

  useFrame((state, delta) => {
    starsRef.current.rotation.x -= delta / 10;
    starsRef.current.rotation.y -= delta / 15;
  });

  return (
    <>
      <Points
        ref={starsRef}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <OrbitControls 
        target={[0, 0, 0]} 
        enableZoom={true} 
        minDistance={1} 
        maxDistance={2} 
      />
    </>
  );
}

function Astronaut() {
  const astronautRef = useRef();
  const { scene } = useGLTF("/model/mercenary_astronaut.glb");
  const speedX = 0.0055;
  const speedY = 0.002;
  // const bounceFactor = 0.5;

  const velocityX = useRef(speedX);
  const velocityY = useRef(speedY);

  useFrame((state, delta) => {
    if (astronautRef.current) {
      astronautRef.current.rotation.x -= delta  * Math.random();
      astronautRef.current.rotation.y -= delta * Math.random();

      astronautRef.current.position.x += velocityX.current;
      astronautRef.current.position.y += velocityY.current;

      const astronautWidth = 0.5;
      const rightEdge = (window.innerWidth / 450) - astronautWidth;
      const leftEdge = -rightEdge;

      const astronautHeight = 0.5;
      const topEdge = (window.innerHeight / 390) - astronautHeight;
      const bottomEdge = -topEdge;

      if (astronautRef.current.position.x > rightEdge || astronautRef.current.position.x < leftEdge) {
        velocityX.current = -velocityX.current;
      }

      if (astronautRef.current.position.y > topEdge || astronautRef.current.position.y < bottomEdge) {
        velocityY.current = -velocityY.current;
      }
    }
  });

  return (
    <>
    <primitive
      ref={astronautRef}
      object={scene}
 
      position={[0, -0.5, -2]}
      scale={0.5}
    />
    <OrbitControls 
    target={[0, 0, 0]} 
    enableZoom={true} 
    minDistance={1} 
    maxDistance={10} 
  />
    </>
  );
}

