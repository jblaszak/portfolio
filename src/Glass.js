import { useState } from "react";

export default function Glass({ position, scale }) {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      castShadow
      scale={scale}
      position={position}
      onPointerEnter={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerLeave={(e) => (e.stopPropagation(), setHovered(false))}
    >
      <boxGeometry args={[4, 6, 0.2]} />;
      <meshStandardMaterial
        roughness={1}
        transparent
        opacity={0.6}
        color={hovered ? "#B9FFBE" : "lightblue"}
      />
    </mesh>
  );
}
