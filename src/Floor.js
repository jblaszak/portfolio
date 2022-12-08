export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} scale={100} receiveShadow>
      <planeGeometry />
      <shadowMaterial opacity={0.4} />
    </mesh>
  );
}
