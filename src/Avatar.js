import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Avatar({ animation, position, rotation }) {
  const group = useRef();
  const model = useGLTF("./avatar.glb");
  const animations = useAnimations(model.animations, group);

  useEffect(() => {
    const action = animations.actions[animation];
    action.reset().fadeIn(0.25).play();
    return () => {
      action.fadeOut(0.25);
    };
  });

  return (
    <primitive ref={group} object={model.scene} scale={2} position={position} rotation={rotation} />
  );
}

useGLTF.preload("./avatar.glb");
