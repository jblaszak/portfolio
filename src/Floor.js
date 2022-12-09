export default function Floor() {
  return (
    <mesh position={[75, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[150, 50, 1]} receiveShadow>
      <planeGeometry />
      <shadowMaterial opacity={0.4} />
    </mesh>
  );
}
