import React from "react";
import ReactDOM from "react-dom/client";
import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Scene from "./Scene";
import useMoveCharacter from "./hooks/useMoveCharacter";
import Navigation from "./Interface/Navigation";
import { INITIAL_CAMERA_LOOKAT, INITIAL_CAMERA_POSITION } from "./constants";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);

function App() {
  const moveCharacter = useMoveCharacter();
  console.log("rendered root");
  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: INITIAL_CAMERA_POSITION }}
        onCreated={(state) => {
          state.camera.lookAt(INITIAL_CAMERA_LOOKAT);
        }}
        // eventSource={document.getElementById("root")}
        // eventPrefix="client"
      >
        {/* <OrbitControls makeDefault /> */}
        <Preload all />
        <Perf position="bottom-left" />
        <Scene moveCharacter={moveCharacter} />
      </Canvas>
      <Navigation moveCharacter={moveCharacter} />
    </>
  );
}
