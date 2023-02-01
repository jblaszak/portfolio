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

  const [totalTranslation, setTotalTranslation] = useState(() => new THREE.Vector3(0, 0, 0));
  const [smoothedAvatarRotation] = useState(() =>
    new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0))
  );

  useEffect(() => {
    setActions(actions);
    setAvatar(avatarRef);
  }, []);

  useEffect(() => {
    const startPosition = avatarRef.current.position.x;
    setTotalTranslation(targetPosition - startPosition);
  }, [targetPosition]);

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

    const movement = totalTranslation * (delta / moveDuration);
    let newPosition = new THREE.Vector3(avatarRef.current.position.x + movement, 0, 0);
    if (movement < 0 && newPosition.x < targetPosition) newPosition.x = targetPosition;
    if (movement > 0 && newPosition.x > targetPosition) newPosition.x = targetPosition;
    avatarRef.current.position.copy(newPosition);
  });

  return <primitive ref={avatarRef} object={model.scene} scale={2} />;
}

useGLTF.preload("./avatar.glb");
