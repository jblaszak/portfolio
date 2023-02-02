import React from "react";
import ReactDOM from "react-dom/client";
import { Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Scene from "./Scene";
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
  return (
    <>
      <Canvas
        shadows
        camera={{ position: INITIAL_CAMERA_POSITION, near: 1.5 }}
        onCreated={(state) => {
          state.camera.lookAt(INITIAL_CAMERA_LOOKAT);
        }}
        // eventSource={document.getElementById("root")}
        // eventPrefix="client"
      >
        {/* <OrbitControls makeDefault /> */}
        <Preload all />
        <Perf position="bottom-left" />
        <Scene />
      </Canvas>
      <Navigation />
    </>
  );
}
