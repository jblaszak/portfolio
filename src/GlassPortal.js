export default function GlassPortal({ position }) {
  const geometry = <boxGeometry args={[4, 6, 0.2]} />;
  const material = (
    <meshStandardMaterial roughness={1} transparent opacity={0.6} color={"lightblue"} />
  );
  return (
    <group position={position}>
      <mesh position={[0, 3, -0.4]} scale={[1.21, 1.136, 1]} castShadow>
        {geometry}
        {material}
      </mesh>
      <mesh position={[0, 3, -0.2]} scale={[1.1, 1.066, 1]} castShadow>
        {geometry}
        {material}
      </mesh>
      <mesh position={[0, 3, 0]} castShadow>
        {geometry}
        {material}
      </mesh>
    </group>
  );
}
