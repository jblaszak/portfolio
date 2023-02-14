import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import useNavigateStore from "./stores/useNavigate";

import * as THREE from "three";
import shadowTexture from "./assets/avatar_shadow.jpg";

export default function Avatar(props) {
  const shadowAlphaMap = useLoader(THREE.TextureLoader, shadowTexture);

  const setAvatar = useNavigateStore((state) => state.setAvatar);
  const setFocus = useNavigateStore((state) => state.setFocus);
  const setActions = useNavigateStore((state) => state.setActions);
  const currentAction = useNavigateStore((state) => state.currentAction);
  const targetRotation = useNavigateStore((state) => state.targetRotation);
  const targetPosition = useNavigateStore((state) => state.targetPosition);

  const avatarRef = useRef();
  const shadowRef = useRef();
  const invisibleRef = useRef();
  const totalTime = useRef(0);
  const { nodes, materials, animations } = useGLTF("./avatar.glb");
  const { actions } = useAnimations(animations, avatarRef);

  const [startPosition, setStartPosition] = useState(() => 0);

  const { width, height } = useThree();
  const headCam = useRef();

  const mousePos = new THREE.Vector2();
  const targetRotationQuaternion = new THREE.Quaternion();
  const smoothedAvatarRotation = useRef(
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0, "YXZ"))
  );
  const rotationEuler = new THREE.Euler();
  const newPosition = new THREE.Vector3();
  const shadowScale = new THREE.Vector3();

  console.log("rerendered avatar");

  useEffect(() => {
    setActions(actions);
    setAvatar(avatarRef);
    setFocus(avatarRef);
  }, [actions, setActions, setAvatar, setFocus]);

  useEffect(() => {
    setStartPosition(avatarRef.current.position.x);
    totalTime.current = 0;
  }, [targetPosition]);

  useEffect(() => {
    if (!actions || !currentAction) return;
    const action = actions[currentAction];
    action.reset().fadeIn(0.5).play();
    return () => action.fadeOut(0.5);
  }, [currentAction, actions]);

  function easeInOutCubic(t, b, c, d) {
    // Arguments: t = time, b = beginning value, c = change in value, d = duration
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  }

  useFrame(({ camera, raycaster, mouse, scene }, delta) => {
    mousePos.copy(mouse);
    const rotY = avatarRef.current.rotation.y;
    mousePos.x *= -Math.cos(rotY);
    raycaster.setFromCamera(mousePos, headCam.current);
    const intersects = raycaster.intersectObjects([invisibleRef.current], true);

    if (intersects.length > 0) {
      nodes.Head.lookAt(intersects[0].point);
    }

    // Move the shadow with the avatar
    shadowRef.current.position.copy(avatarRef.current.position);

    // Faster way to handle visibility of avatar when camera is near
    if (camera.position.z < 2) {
      avatarRef.current.visible = false;
    } else {
      avatarRef.current.visible = true;
    }

    if (targetPosition === null || targetRotation === null) return;
    // Rotate the avatar
    // const targetRotationQuaternion = new THREE.Quaternion().setFromAxisAngle(yAxis, targetRotation);
    rotationEuler.set(0, targetRotation, 0, "YXZ");
    targetRotationQuaternion.setFromEuler(rotationEuler);
    smoothedAvatarRotation.current.slerp(targetRotationQuaternion, delta);
    rotationEuler.setFromQuaternion(smoothedAvatarRotation.current, "YXZ");
    avatarRef.current.rotation.copy(rotationEuler);

    // Move the avatar
    if (avatarRef.current.position.x === targetPosition) return;
    const moveDuration =
      actions["WALKING"]._clip.duration * 2 + actions["RUNNING"]._clip.duration * 4;

    let newTotalTime = totalTime.current + delta;
    if (newTotalTime > moveDuration) {
      newTotalTime = moveDuration;
    }

    totalTime.current = newTotalTime;

    const newPositionX = easeInOutCubic(
      newTotalTime,
      startPosition,
      targetPosition - startPosition,
      moveDuration
    );
    newPosition.set(newPositionX, 0, 0);
    avatarRef.current.position.copy(newPosition);

    // Scale the shadow, min 3.5, max 6.5
    shadowScale.set(3 * Math.sin((newTotalTime * Math.PI) / moveDuration) + 3.5, 3.5, 3.5);
    shadowRef.current.scale.copy(shadowScale);
  });

  return (
    <group>
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} scale={3.5}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={"grey"} transparent alphaMap={shadowAlphaMap} />
      </mesh>
      <group ref={avatarRef} {...props} dispose={null} scale={2} name="avatar">
        <PerspectiveCamera
          makeDefault={false}
          ref={headCam}
          aspect={width / height}
          fov={60}
          near={0.25}
          far={10}
          position={[0, 1.8, 0]}
          rotation={[0, Math.PI, 0]}
        />
        <mesh ref={invisibleRef} position={[0, 0, 0]}>
          <sphereGeometry args={[5, 16, 16]} />
          <meshBasicMaterial color={"white"} side={THREE.DoubleSide} transparent opacity={0} />
        </mesh>
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
            />
            <skinnedMesh
              name="EyeRight"
              geometry={nodes.EyeRight.geometry}
              material={materials.Wolf3D_Eye}
              skeleton={nodes.EyeRight.skeleton}
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
            />
            <skinnedMesh
              name="Wolf3D_Head"
              castShadow
              receiveShadow
              geometry={nodes.Wolf3D_Head.geometry}
              material={materials.Wolf3D_Skin}
              skeleton={nodes.Wolf3D_Head.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./avatar.glb");
