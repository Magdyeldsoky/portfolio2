"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const AntigravityInner = ({ mode, isTyping, isSuccess }) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const isMobile = viewport.width < 10;
  const count = isMobile ? 180 : 420; 

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 40,
        pos: new THREE.Vector3((Math.random() - 0.5) * 35, (Math.random() - 0.5) * 35, -8),
        basePos: new THREE.Vector3((Math.random() - 0.5) * 35, (Math.random() - 0.5) * 30, -5),
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    particles.forEach((p, i) => {
      let target = new THREE.Vector3().copy(p.basePos);

      if (isSuccess) {
        target.set(
          Math.cos(time * 2.5 + i) * (12 + Math.sin(time) * 4),
          Math.sin(time * 2.5 + i) * (8 + Math.cos(time) * 4),
          14
        );
      } else if (mode === "name" || mode === "email") {
        const yOffset = mode === "name" ? 7 : 1.5;
        const reactiveRadius = 3.5 + (isTyping % 12) * 0.25;
        target.set(
          8 + Math.cos(time * 4.5 + i) * reactiveRadius,
          yOffset + Math.sin(time * 4.5 + i) * (reactiveRadius * 0.5),
          3
        );
      } else if (mode === "message") {
        target.set(8 + (Math.random() - 0.5) * 12, -5 + (Math.random() - 0.5) * 6, 2);
      }

      p.pos.lerp(target, isSuccess ? 0.12 : 0.07);
      
      dummy.position.set(p.pos.x, p.pos.y, p.pos.z);
      dummy.rotation.set(time * 0.7, time * 0.4, 0);
      
      const s = isSuccess ? (2.2 + Math.sin(time * 12) * 0.4) : 0.65;
      dummy.scale.set(s, s, s);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <capsuleGeometry args={[0.035, 0.16, 2, 4]} />
      <meshStandardMaterial 
        color={isSuccess ? "#00f3ff" : "#f97316"} 
        emissive={isSuccess ? "#00f3ff" : "#f97316"} 
        emissiveIntensity={isSuccess ? 25 : 2.5} 
        toneMapped={false} 
      />
    </instancedMesh>
  );
};

const Antigravity = (props) => (
  <Canvas 
    flat
    camera={{ position: [0, 0, 25], fov: 45 }} 
    dpr={[1, 1.5]} 
    style={{ background: 'transparent', touchAction: 'none' }}
  >
    <ambientLight intensity={2} />
    <pointLight position={[10, 10, 10]} intensity={3} />
    <AntigravityInner {...props} />
  </Canvas>
);

export default Antigravity;