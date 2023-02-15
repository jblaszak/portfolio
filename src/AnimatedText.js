import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useRef, forwardRef, useState } from "react";
import * as THREE from "three";
import fontBold from "./assets/fonts/playfairdisplay-black-webfont.woff";
import font from "./assets/fonts/playfairdisplay-bold-webfont.woff";

const AnimatedText = forwardRef(
  (
    {
      children,
      position = [0, 0, 0],
      active = true,
      color = "black",
      transition = [0, 0, 0],
      fontStyle = "regular",
      textAlign = "center",
      anchorX = "center",
      anchorY = "middle",
      fontSize = 16,
      width = null,
      faceCam = true,
    },
    ref
  ) => {
    const textRef = useRef();
    if (ref === null) {
      ref = textRef;
    }

    const [lerpedPosition] = useState(new THREE.Vector3(...position));
    const currentColor = new THREE.Color();

    const springs = useSpring({
      opacity: active ? 1 : 0,
    });

    useFrame(({ camera }) => {
      // Make text face the camera
      if (faceCam) {
        ref.current.quaternion.copy(camera.quaternion);
      }
      // Animate font color
      ref.current.material.color.lerp(currentColor.set(color), 0.1);

      // Animate position
      const targetPosition = active
        ? new THREE.Vector3(...position)
        : new THREE.Vector3(
            position[0] + transition[0],
            position[1] + transition[1],
            position[2] + transition[2]
          );
      lerpedPosition.lerp(targetPosition, 0.1);
      ref.current.position.copy(lerpedPosition);
    });

    const fontProps = {
      // color: "black",
      font: fontStyle === "bold" ? fontBold : font,
      fontSize: fontSize / 20,
      lineHeight: 1.2,
      maxWidth: width ?? 100,
      textAlign: textAlign,
      anchorX: anchorX,
      anchorY: anchorY,
      "material-toneMapped": false,
    };

    return (
      <>
        <Text ref={ref} {...fontProps}>
          <a.meshBasicMaterial
            side={THREE.FrontSide}
            toneMapped={false}
            transparent
            opacity={springs.opacity}
          />
          {children}
        </Text>
      </>
    );
  }
);

export default AnimatedText;
