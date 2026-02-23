"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const AntigravityInner = ({
  count = 300,
  magnetRadius = 12,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.08,
  colorVar = "--primary",
  rotationSpeed = 0.2,
  fieldStrength = 10,
}) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const [themeColor, setThemeColor] = useState("#ffffff");
  const virtualMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const val = getComputedStyle(root).getPropertyValue(colorVar).trim();
      setThemeColor(val.includes(" ") ? `hsl(${val})` : val || "#ffffff");
    };
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [colorVar]);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 1.5;
      const y = (Math.random() - 0.5) * viewport.height * 1.5;
      const z = (Math.random() - 0.5) * 10;
      temp.push({
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: x,
        my: y,
        mz: z,
        cx: x,
        cy: y,
        cz: z,
        rOff: (Math.random() - 0.5) * 2,
      });
    }
    return temp;
  }, [count, viewport]);

  useFrame((state) => {
    const { pointer: m, viewport: v, clock } = state;
    const time = clock.getElapsedTime();
    const dynamicRadius = v.width < 15 ? magnetRadius * 0.6 : magnetRadius;

    virtualMouse.current.x +=
      ((m.x * v.width) / 2 - virtualMouse.current.x) * 0.1;
    virtualMouse.current.y +=
      ((m.y * v.height) / 2 - virtualMouse.current.y) * 0.1;

    particles.forEach((p, i) => {
      p.t += p.speed;
      const dx = p.mx - virtualMouse.current.x;
      const dy = p.my - virtualMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let tx = p.mx,
        ty = p.my,
        tz = p.mz;

      if (dist < dynamicRadius) {
        const angle = Math.atan2(dy, dx) + time * rotationSpeed;
        const wave = Math.sin(p.t * waveSpeed + angle) * waveAmplitude;
        const r = ringRadius + wave + p.rOff * (5 / (fieldStrength + 0.1));
        tx = virtualMouse.current.x + Math.cos(angle) * r;
        ty = virtualMouse.current.y + Math.sin(angle) * r;
        tz = p.mz + Math.sin(p.t) * waveAmplitude;
      }

      p.cx += (tx - p.cx) * lerpSpeed;
      p.cy += (ty - p.cy) * lerpSpeed;
      p.cz += (tz - p.cz) * lerpSpeed;

      dummy.position.set(p.cx, p.cy, p.cz);
      dummy.lookAt(virtualMouse.current.x, virtualMouse.current.y, p.cz);
      dummy.rotateX(Math.PI / 2);
      const s =
        Math.max(0.1, 1 - Math.abs(dist - ringRadius) / 12) * particleSize;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <capsuleGeometry args={[0.06, 0.25, 4, 8]} />
      <meshStandardMaterial
        color={themeColor}
        emissive={themeColor}
        emissiveIntensity={0.6}
      />
    </instancedMesh>
  );
};

const Antigravity = (props) => (
  <Canvas camera={{ position: [0, 0, 35], fov: 35 }} dpr={[1, 2]}>
    <ambientLight intensity={0.8} />
    <pointLight position={[10, 10, 10]} />
    <AntigravityInner {...props} />
  </Canvas>
);

export default Antigravity;
