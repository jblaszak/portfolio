import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useState, useRef, useCallback } from "react";
import * as THREE from "three";
import AnimatedText from "./AnimatedText";

export default function Button({
  onClick = null,
  text = "BUTTON",
  width = 1,
  height = 1,
  radius = 0.3,
  border = 0.1,
  fontSize = 10,
  position = [0, 0, 0],
  buttonPosition = [0, 0, 0],
}) {
  const buttonRef = useRef();
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const makeButtonShape = useCallback((x, y, w, h, r) => {
    let shape = new THREE.Shape();
    const minDimension = Math.min(w, h);
    if (r > 0.5 * minDimension) {
      r = 0.5 * minDimension;
    }
    shape.moveTo(x, y + r);
    shape.lineTo(x, y + h - r);
    shape.quadraticCurveTo(x, y + h, x + r, y + h);
    shape.lineTo(x + w - r, y + h);
    shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
    shape.lineTo(x + w, y + r);
    shape.quadraticCurveTo(x + w, y, x + w - r, y);
    shape.lineTo(x + r, y);
    shape.quadraticCurveTo(x, y, x, y + r);
    return shape;
  }, []);

  const backgroundShape = makeButtonShape(border, border, width, height, radius * 0.8);
  const borderShape = makeButtonShape(0, 0, width + 2 * border, height + 2 * border, radius);

  useFrame(({ camera }) => {
    // Make text face the camera
    buttonRef.current.quaternion.copy(camera.quaternion);
  });

  const spring = useSpring({
    backgroundColor: hovered ? "black" : "white",
  });

  return (
    <>
      <group position={position}>
        <group ref={buttonRef} position={buttonPosition}>
          {/* Grouped this way because text also gets a quaternion applied to it, this way they are the same */}
          <mesh
            position={[0, 0, -0.001]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={onClick}
          >
            <shapeGeometry attach="geometry" args={[borderShape]} />
            <meshBasicMaterial color="black" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <shapeGeometry attach="geometry" args={[backgroundShape]} />
            <a.meshBasicMaterial color={spring.backgroundColor} toneMapped={false} />
          </mesh>
        </group>
        <AnimatedText
          position={[0, 0, 0.002]}
          fontSize={fontSize}
          active={true}
          color={hovered ? "white" : "black"}
          children={text}
        />
      </group>
    </>
  );
}
