import React from "react";
import ReactDOM from "react-dom/client";
import { useContextBridge, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Scene from "./Scene";
import Navigation from "./Interface/Navigation";
import { SectionContextProvider, SectionContext } from "./SectionContext";
import { INITIAL_CAMERA_LOOKAT, INITIAL_CAMERA_POSITION } from "./constants";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <SectionContextProvider>
      <App />
    </SectionContextProvider>
  </>
);

function App() {
  const ContextBridge = useContextBridge(SectionContext);

  return (
    <>
      <Canvas
        shadows
        camera={{ position: INITIAL_CAMERA_POSITION }}
        onCreated={(state) => {
          state.camera.lookAt(INITIAL_CAMERA_LOOKAT);
        }}
      >
        {/* <OrbitControls makeDefault /> */}
        <Preload all />
        <ContextBridge>
          <Perf position="bottom-left" />
          <Scene />
        </ContextBridge>
      </Canvas>
      <Navigation />
    </>
  );
}
