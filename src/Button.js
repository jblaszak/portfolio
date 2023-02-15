import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { useState, useRef, useCallback } from "react";
import * as THREE from "three";
import AnimatedText from "./AnimatedText";

export default function Button({
  onClick = null,
  onMouseOver = null,
  text = "BUTTON",
  width = 1,
  height = 1,
  radius = 0.3,
  border = 0.1,
  fontSize = 10,
  active = true,
  position = [0, 0, 0],
  transition = [0, 0, 0],
  buttonPosition = [0, 0, 0],
  faceCam = true,
}) {
  const buttonRef = useRef();
  const backingRef = useRef();
  const [lerpedPosition] = useState(new THREE.Vector3(...position));
  const [hovered, setHovered] = useState(false);

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
    if (faceCam) {
      backingRef.current.quaternion.copy(camera.quaternion);
    }

    const targetPosition = active
      ? new THREE.Vector3(...position)
      : new THREE.Vector3(
          position[0] + transition[0],
          position[1] + transition[1],
          position[2] + transition[2]
        );
    lerpedPosition.lerp(targetPosition, 0.1);
    buttonRef.current.position.copy(lerpedPosition);
  });

  const spring = useSpring({
    backgroundColor: hovered ? "black" : "white",
    opacity: active ? 1 : 0,
  });

  return (
    <>
      <group ref={buttonRef} position={position}>
        <group ref={backingRef} position={buttonPosition}>
          {/* Grouped this way because text also gets a quaternion applied to it, this way they are the same */}
          <mesh position={[0, 0, -0.001]}>
            <shapeGeometry attach="geometry" args={[borderShape]} />
            <a.meshBasicMaterial color={"black"} opacity={spring.opacity} transparent />
          </mesh>
          <mesh
            position={[0, 0, 0]}
            onPointerOver={() => {
              if (onMouseOver) onMouseOver();
              setHovered(true);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              let isOverCard = false;
              e.eventObject.traverseAncestors((obj) => {
                if (isOverCard) return;
                if (obj.name === "card") isOverCard = true;
              });
              document.body.style.cursor = isOverCard ? "pointer" : "auto";
              setHovered(false);
            }}
            onClick={onClick}
          >
            <shapeGeometry attach="geometry" args={[backgroundShape]} />
            <a.meshBasicMaterial
              color={spring.backgroundColor}
              toneMapped={false}
              opacity={spring.opacity}
              transparent
            />
          </mesh>
        </group>
        <AnimatedText
          position={[0, 0, 0.002]}
          fontSize={fontSize}
          active={active}
          color={hovered ? "white" : "black"}
          faceCam={faceCam}
          children={text}
        />
      </group>
    </>
  );
}
