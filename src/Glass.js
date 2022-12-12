import { useState } from "react";
import { useSpring, a } from "@react-spring/three";

export default function Glass({ position, scale }) {
  const [hovered, setHovered] = useState(false);
  const { color } = useSpring({ color: hovered ? "#B9FFBE" : "lightblue" });

  return (
    <mesh
      castShadow
      scale={scale}
      position={position}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <boxGeometry args={[4, 6, 0.2]} />
      <a.meshStandardMaterial roughness={1} transparent opacity={0.6} color={color} />
    </mesh>
  );
}
