import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useNavigateStore from "./stores/useNavigate";
import usePrevious from "./hooks/usePrevious";
import * as THREE from "three";

export default function Avatar() {
  const setAvatar = useNavigateStore((state) => state.setAvatar);
  const setActions = useNavigateStore((state) => state.setActions);

  const avatarRef = useRef();
  const model = useGLTF("./avatar.glb");
  const { actions } = useAnimations(model.animations, avatarRef);

  useEffect(() => {
    setActions(actions);
    setAvatar(avatarRef);
  }, []);

  // const [smoothedAvatarPosition] = useState(() => new THREE.Vector3(0, 0, 0));
  // const [smoothedAvatarRotation] = useState(() =>
  //   new THREE.Quaternion().setFromEuler(new THREE.Euler(0, targetRotation, 0))
  // );

  // useEffect(() => {
  //   let index = 0;
  //   const actionsToPlay = [];

  //   mixer.addEventListener("finished", playNextAction);
  //   // const action = actions[animation];
  //   // action.reset().fadeIn(0.25).play();
  //   for (let i = 0; i < animationList.length; i++) {
  //     const actionName = animationList[i];
  //     const action = actions[actionName];
  //     if (actionName !== "IDLE") {
  //       action.loop = THREE.LoopOnce;
  //     }
  //     actionsToPlay.push(action);
  //   }

  //   playNextAction();

  //   function playNextAction() {
  //     if (index === actionsToPlay.length) return;
  //     // if (index !== 0) actionsToPlay[index - 1].fadeOut(0.25);
  //     actionsToPlay[index].reset().fadeIn(0.25).play();
  //     index++;
  //   }

  //   return () => {
  //     // action.fadeOut(0.25);
  //     mixer.removeEventListener("finished", playNextAction);
  //   };
  //   // console.log(animations);
  // });

  // useEffect(() => {
  //   let delay = 0;
  //   let action = null;
  //   for (let i = 0; i < animationList.length; i++) {
  //     setTimeout(() => {
  //       const actionName = animationList[i];
  //       this.action = actions[actionName];
  //       this.action.reset().fadeIn(0.25).play();
  //       this.delay += this.action.duration;
  //     }, delay);
  //   }
  //   return () => action.fadeOut(0.25);
  // }, [animationList, actions]);

  // useEffect(() => {
  //   function nextAction() {
  //     setIndex((prev) => prev + 1);
  //   }
  //   mixer.addEventListener("finished", nextAction);

  //   return () => {
  //     mixer.removeEventListener("finished", nextAction);
  //   };
  // }, [mixer]);

  // useEffect(() => {
  //   if (actionsToPlay.length === 0) return;
  //   actionsToPlay[index].reset().fadeIn(0.25).play();
  //   return () => actionsToPlay[index].fadeOut(0.25);
  // }, [index, actionsToPlay]);

  // useFrame((state, delta) => {
  //   const targetPosition = new THREE.Vector3(targetSection * 4, 0, 0);
  //   smoothedAvatarPosition.lerp(targetPosition, delta);
  //   avatar.current.position.copy(smoothedAvatarPosition);

  //   const targetRotationQuaternion = new THREE.Quaternion().setFromEuler(
  //     new THREE.Euler(0, targetRotation, 0)
  //   );
  //   smoothedAvatarRotation.slerp(targetRotationQuaternion, delta);
  //   // console.log(avatar.current.rotation);
  //   avatar.current.rotation.copy(new THREE.Euler().setFromQuaternion(smoothedAvatarRotation));
  //   // );

  //   // console.log(avatar.current);
  // });

  return (
    <primitive
      ref={avatarRef}
      object={model.scene}
      scale={2}
      // position={position}
      // rotation={rotation}
    />
  );
}

useGLTF.preload("./avatar.glb");
