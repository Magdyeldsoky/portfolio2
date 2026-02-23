import React, { useMemo, useRef } from "react";
import { useGraph, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export default function Model(props) {
  const group = useRef();
  const { viewport } = useThree();
  const { scene } = useGLTF("/portfolio2/male_avatar.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  useMemo(() => {
    Object.values(materials).forEach((mat) => {
      mat.precision = "lowp";
      mat.envMapIntensity = 1;
    });

    if (materials.Wolf3D_Skin) {
      materials.Wolf3D_Skin.color.set("#FFDBAC");
      materials.Wolf3D_Skin.roughness = 0.8;
      materials.Wolf3D_Skin.metalness = 0;
    }

    if (materials.Wolf3D_Glasses) {
      materials.Wolf3D_Glasses.color.set("#050505");
      materials.Wolf3D_Glasses.metalness = 0.5;
      materials.Wolf3D_Glasses.roughness = 0.2;
    }
  }, [materials]);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.3,
      0.05,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.1,
      0.05,
    );
  });

  const isMobile = viewport.width < 5;
  const responsiveScale = isMobile ? 3 : 4.2;
  const responsivePosition = isMobile ? [0, -3.5, 0] : [0, -5, 0];

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={responsiveScale}
      position={responsivePosition}
    >
      <primitive object={nodes.GLTF_created_0_rootJoint} />
      {Object.values(nodes).map((node, index) => {
        if (node.isMesh || node.isSkinnedMesh) {
          return (
            <skinnedMesh
              key={index}
              geometry={node.geometry}
              material={materials[node.material.name]}
              skeleton={node.skeleton}
              frustumCulled={true}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("/portfolio2/male_avatar.glb");
