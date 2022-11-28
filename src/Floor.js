export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} scale={100} receiveShadow>
      <planeGeometry />
      <meshStandardMaterial color={"white"} />
    </mesh>
  );
}
