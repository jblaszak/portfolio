import Portal from "./Portal";
import "./style.css";

export default function Scene() {
  return (
    <>
      <color attach="background" args={["#06092c"]} />
      <pointLight position={[-20, 10, 25]} />
      <ambientLight intensity={0.5} />
      <Portal portalPosition={[0, 0.5, 0]} />
      <gridHelper args={[50, 50, "#4D089A", "#4D089A"]} position={[0, 0, 0]} />
    </>
  );
}
