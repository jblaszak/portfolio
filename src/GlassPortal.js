import Glass from "./Glass";

export default function GlassPortal({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <Glass position={[0, 3, -0.4]} scale={[1.21, 1.136, 1]} />
      <Glass position={[0, 3, -0.2]} scale={[1.1, 1.066, 1]} />
      <Glass position={[0, 3, 0]} scale={1} />
    </group>
  );
}
