import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useNavigateStore from "./stores/useNavigate";
import * as THREE from "three";

export default function Avatar() {
  const setAvatar = useNavigateStore((state) => state.setAvatar);
  const setActions = useNavigateStore((state) => state.setActions);
  const targetRotation = useNavigateStore((state) => state.targetRotation);
  const targetPosition = useNavigateStore((state) => state.targetPosition);

  const avatarRef = useRef();
  const model = useGLTF("./avatar.glb");
  const { actions } = useAnimations(model.animations, avatarRef);

  const [startPosition, setStartPosition] = useState(() => 0);
  const [totalTime, setTotalTime] = useState(() => 0);
  const [smoothedAvatarRotation] = useState(() =>
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))
  );

  useEffect(() => {
    setActions(actions);
    setAvatar(avatarRef);
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

  useFrame((state, delta) => {
    if (targetPosition === null || targetRotation === null) return;

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
  });

  return <primitive ref={avatarRef} object={model.scene} scale={2} />;
}

useGLTF.preload("./avatar.glb");
