import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useRef } from "react";
import * as THREE from "three";
import fontBold from "./assets/fonts/playfairdisplay-black-webfont.woff";
import font from "./assets/fonts/playfairdisplay-bold-webfont.woff";

export default function AnimatedText({
  children,
  position = [0, 0, 0],
  active = true,
  transition = [0, 0, 0],
  fontStyle = "regular",
  fontSize = 16,
}) {
  const textRef = useRef();

  const fontProps = {
    color: "black",
    font: fontStyle === "bold" ? fontBold : font,
    fontSize: fontSize / 20,
    lineHeight: 1,
    "material-toneMapped": false,
  };

  const springs = useSpring({
    textPosition: active
      ? position
      : [position[0] + transition[0], position[1] + transition[1], position[2] + transition[2]],
    opacity: active ? 1 : 0,
  });

  useFrame(({ camera }) => {
    // Make text face the camera
    textRef.current.quaternion.copy(camera.quaternion);
  });

  const IntermediateAnimatedText = a((props) => {
    return (
      <Text ref={textRef} position={props.position} {...fontProps}>
        <a.meshBasicMaterial
          side={THREE.FrontSide}
          color={fontProps.color}
          transparent
          opacity={props.opacity}
        />
        {props.children}
      </Text>
    );
  });

  return (
    <>
      <IntermediateAnimatedText
        position={springs.textPosition}
        opacity={springs.opacity}
        children={children}
      />
    </>
  );
}
