"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const AntigravityInner = ({ mode, isTyping, isSuccess }) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [themeColor, setThemeColor] = useState("#f97316");

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 400; i++) {
      temp.push({
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 100,
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10,
        ),
        basePos: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10,
        ),
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      p.t += p.speed;
      let target = new THREE.Vector3().copy(p.basePos);

      if (isSuccess) {
        // حالة النجاح: يتجمعوا في المنتصف قدام الشاشة
        target.set(Math.cos(time + i) * 5, Math.sin(time + i) * 2, 15);
      } else if (mode === "name") {
        // ورا خانة الاسم
        target.set(5 + Math.cos(p.t) * 4, 6 + Math.sin(p.t) * 2, 0);
      } else if (mode === "email") {
        // ورا خانة الإيميل
        target.set(5 + Math.cos(p.t) * 4, 2 + Math.sin(p.t) * 2, 0);
      } else {
        // الحالة العادية: يلفوا في السكشن
        target.x += Math.sin(time + i) * 2;
        target.y += Math.cos(time + i) * 2;
      }

      // تأثير الكتابة (Jitter)
      if (isTyping > 0 && mode !== "") {
        target.x += (Math.random() - 0.5) * 0.5;
        target.y += (Math.random() - 0.5) * 0.5;
      }

      p.pos.lerp(target, 0.05);
      dummy.position.set(p.pos.x, p.pos.y, p.pos.z);
      dummy.rotation.set(p.t, p.t, 0);
      const s = isSuccess ? 2 : 0.8;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, 400]}>
      <capsuleGeometry args={[0.04, 0.15, 4, 8]} />
      <meshStandardMaterial
        color={themeColor}
        emissive={themeColor}
        emissiveIntensity={isSuccess ? 10 : 2}
        toneMapped={false}
      />
    </instancedMesh>
  );
};

const Antigravity = (props) => (
  <Canvas
    camera={{ position: [0, 0, 25], fov: 40 }}
    dpr={[1, 2]}
    style={{ background: "transparent" }}
  >
    <ambientLight intensity={2} />
    <pointLight position={[10, 10, 10]} />
    <AntigravityInner {...props} />
  </Canvas>
);

export default Antigravity;
