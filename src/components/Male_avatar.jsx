import React, { useMemo, useRef } from "react";
import { useGraph, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export default function Model(props) {
  const group = useRef();
  const { viewport } = useThree();
  const { scene } = useGLTF("/male_avatar.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  useMemo(() => {
    Object.values(materials).forEach((mat) => {
      mat.envMapIntensity = 1.5;
    });

    if (materials.Wolf3D_Skin) {
      materials.Wolf3D_Skin.color.set("#FFDBAC");
      materials.Wolf3D_Skin.roughness = 0.6;
    }

    if (materials.Wolf3D_Glasses) {
      materials.Wolf3D_Glasses.color.set("#050505");
      materials.Wolf3D_Glasses.metalness = 1;
      materials.Wolf3D_Glasses.roughness = 0.1;
    }

    if (materials.Wolf3D_Outfit_Top) {
      materials.Wolf3D_Outfit_Top.color.set("#111111");
    }
  }, [materials]);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      x * 0.3,
      0.07,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -y * 0.1,
      0.07,
    );
  });

  const isMobile = viewport.width < 5;

  // دي الأرقام اللي هتخليه يظهر بنصه الفوقاني وميختفيش
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
      <skinnedMesh
        geometry={nodes.Object_7.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.Object_7.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_9.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.Object_9.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_11.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Object_11.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_13.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Object_13.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_15.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Object_15.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_17.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Object_17.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_19.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Object_19.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_21.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Object_21.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_23.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Object_23.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_25.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Object_25.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/male_avatar.glb");
