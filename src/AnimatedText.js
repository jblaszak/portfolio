import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useRef, useCallback, useState } from "react";
import * as THREE from "three";
import fontBold from "./assets/fonts/playfairdisplay-black-webfont.woff";
import font from "./assets/fonts/playfairdisplay-bold-webfont.woff";

export default function AnimatedText({
  children,
  position = [0, 0, 0],
  active = true,
  color = "black",
  transition = [0, 0, 0],
  fontStyle = "regular",
  fontSize = 16,
  width = null,
}) {
  const textRef = useRef();
  const [lerpedPosition] = useState(new THREE.Vector3(...position));
  const currentColor = new THREE.Color();

  const springs = useSpring({
    opacity: active ? 1 : 0,
  });

  useFrame(({ camera }) => {
    // Make text face the camera
    textRef.current.quaternion.copy(camera.quaternion);
    // Animate font color
    textRef.current.material.color.lerp(currentColor.set(color), 0.1);
    // textRef.current.material.opacity = springs.opacity;
    // console.log(textRef.current.material);
    // textRef.current.material.baseMaterial.color.set("black");
    const targetPosition = active
      ? new THREE.Vector3(...position)
      : new THREE.Vector3(
          position[0] + transition[0],
          position[1] + transition[1],
          position[2] + transition[2]
        );
    // console.log(targetPosition);
    lerpedPosition.lerp(targetPosition, 0.1);
    textRef.current.position.copy(lerpedPosition);
  });

  // useFrame(({ camera }) => {
  //   // Make text face the camera
  //   textRef.current.quaternion.copy(camera.quaternion);
  // });
  const fontProps = {
    // color: "black",
    font: fontStyle === "bold" ? fontBold : font,
    fontSize: fontSize / 20,
    lineHeight: 1.2,
    maxWidth: width ?? 100,
    textAlign: "center",
    "material-toneMapped": false,
  };

  return (
    <>
      <Text ref={textRef} {...fontProps}>
        <a.meshBasicMaterial
          side={THREE.FrontSide}
          // color={fontProps.color}
          toneMapped={false}
          transparent
          opacity={springs.opacity}
        />
        {children}
      </Text>
    </>
  );
}
