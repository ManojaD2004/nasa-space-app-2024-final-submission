import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MouseBallComponent() {
  const sphereRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
    
      setMousePos({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(({ camera }) => {
    if (sphereRef.current) {
        
      const x = (mousePos.x / window.innerWidth) * 2 - 1; 
      const y = -(mousePos.y / window.innerHeight) * 2 + 1; 

      // Create a vector in normalized device coordinates
      const vector = new THREE.Vector3(x, y, 0.5); // Z value set to 0.5
      vector.unproject(camera); // Convert from 2D screen space to 3D space

      // Calculate direction from camera to mouse position
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z; 

      // Set sphere position
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      sphereRef.current.position.copy(pos);
    }
  });

  return (
    <mesh ref={sphereRef}>
      <icosahedronGeometry args={[0.125, 8]} /> {/* Smaller size */}
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1.5} />
      <pointLight position={[0, 0, 0]} color="white" intensity={1.5} />
    </mesh>
  );
}

export default MouseBallComponent;
