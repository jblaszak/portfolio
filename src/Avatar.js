import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import useNavigateStore from "./stores/useNavigate";

import * as THREE from "three";
import shadowTexture from "./assets/avatar_shadow.jpg";

export default function Avatar(props) {
  const shadowAlphaMap = useLoader(THREE.TextureLoader, shadowTexture);

  const setAvatar = useNavigateStore((state) => state.setAvatar);
  const setFocus = useNavigateStore((state) => state.setFocus);
  const setActions = useNavigateStore((state) => state.setActions);
  const targetRotation = useNavigateStore((state) => state.targetRotation);
  const targetPosition = useNavigateStore((state) => state.targetPosition);

  const avatarRef = useRef();
  const shadowRef = useRef();
  const { nodes, materials, animations } = useGLTF("./avatar.glb");
  const { actions } = useAnimations(animations, avatarRef);

  const [startPosition, setStartPosition] = useState(() => 0);
  const [totalTime, setTotalTime] = useState(() => 0);
  const [smoothedAvatarRotation] = useState(() =>
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))
  );

  useEffect(() => {
    setActions(actions);
    setAvatar(avatarRef);
    setFocus(avatarRef);
  }, []);

  useEffect(() => {
    setStartPosition(avatarRef.current.position.x);
    setTotalTime(0);
  }, [targetPosition]);

  function easeInOutCubic(t, b, c, d) {
    // Arguments: t = time, b = beginning value, c = change in value, d = duration
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  }

  const fadePoint = new THREE.Vector3();
  const frustum = new THREE.Frustum();

  useFrame((state, delta) => {
    if (targetPosition === null || targetRotation === null) return;

    // Move the shadow with the avatar
    shadowRef.current.position.copy(avatarRef.current.position);

    const frustum = new THREE.Frustum();
    const fadePoint = new THREE.Vector3().copy(avatarRef.current.position);
    fadePoint.y += 3;
    fadePoint.z += 1;
    const matrix = new THREE.Matrix4().multiplyMatrices(
      state.camera.projectionMatrix,
      state.camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(matrix);

    if (frustum.containsPoint(fadePoint)) {
      avatarRef.current.visible = true;
    } else {
      avatarRef.current.visible = false;
    }

    // Rotate the avatar
    const targetRotationQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, targetRotation, 0)
    );
    smoothedAvatarRotation.slerp(targetRotationQuaternion, delta);
    avatarRef.current.rotation.copy(new THREE.Euler().setFromQuaternion(smoothedAvatarRotation));

    // Move the avatar
    if (avatarRef.current.position.x === targetPosition) return;
    const moveDuration =
      actions["WALKING"]._clip.duration * 2 + actions["RUNNING"]._clip.duration * 4;

    let newTotalTime = totalTime + delta;
    if (newTotalTime > moveDuration) {
      newTotalTime = moveDuration;
    }
    setTotalTime(newTotalTime);

    const newPositionX = easeInOutCubic(
      newTotalTime,
      startPosition,
      targetPosition - startPosition,
      moveDuration
    );
    let newPosition = new THREE.Vector3(newPositionX, 0, 0);
    avatarRef.current.position.copy(newPosition);

    // Scale the shadow, min 3.5, max 6.5
    const shadowXScale = 3 * Math.sin((newTotalTime * Math.PI) / moveDuration) + 3.5;
    shadowRef.current.scale.copy(new THREE.Vector3(shadowXScale, 3.5, 3.5));
  });

  return (
    <group>
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} scale={3.5}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={"grey"} transparent alphaMap={shadowAlphaMap} />
      </mesh>
      <group ref={avatarRef} {...props} dispose={null} scale={2}>
        <group name="Scene">
          <group name="Armature">
            <primitive object={nodes.Hips} />
            <skinnedMesh
              name="Wolf3D_Body"
              castShadow
              receiveShadow
              geometry={nodes.Wolf3D_Body.geometry}
              material={materials.Wolf3D_Body}
              skeleton={nodes.Wolf3D_Body.skeleton}
            />
            <skinnedMesh
              name="Wolf3D_Hair"
              castShadow
              receiveShadow
              geometry={nodes.Wolf3D_Hair.geometry}
              material={materials.Wolf3D_Hair}
              skeleton={nodes.Wolf3D_Hair.skeleton}
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Footwear"
              castShadow
              receiveShadow
              geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
              material={materials.Wolf3D_Outfit_Footwear}
              skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Bottom"
              castShadow
              receiveShadow
              geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
              material={materials.Wolf3D_Outfit_Bottom}
              skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
            <skinnedMesh
              name="EyeLeft"
              geometry={nodes.EyeLeft.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeLeft.skeleton}
              morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
              morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            />
            <skinnedMesh
              name="EyeRight"
              geometry={nodes.EyeRight.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeRight.skeleton}
              morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
              morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            />
            <skinnedMesh
              name="Wolf3D_Outfit_Top"
              castShadow
              receiveShadow
              geometry={nodes.Wolf3D_Outfit_Top.geometry}
              material={materials.Wolf3D_Outfit_Top}
              skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
            <skinnedMesh
              name="Wolf3D_Teeth"
              geometry={nodes.Wolf3D_Teeth.geometry}
              material={materials.Wolf3D_Teeth}
              skeleton={nodes.Wolf3D_Teeth.skeleton}
              morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
              morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            />
            <skinnedMesh
              name="Wolf3D_Head"
              castShadow
              receiveShadow
              geometry={nodes.Wolf3D_Head.geometry}
              material={materials.Wolf3D_Skin}
              skeleton={nodes.Wolf3D_Head.skeleton}
              morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
              morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./avatar.glb");
