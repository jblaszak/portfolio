import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, Clone } from "@react-three/drei";

export default function Avatar({ ...props }) {
  const group = useRef();
  const model = useGLTF("./avatar.glb");
  const animations = useAnimations(model.animations, group);

  useEffect(() => {
    animations.actions["IDLE"].play();
  });

  return <primitive ref={group} object={model.scene} scale={2} />;
}

useGLTF.preload("./avatar.glb");
