import React from "react";
import ReactDOM from "react-dom/client";
import { OrbitControls, ScrollControls, useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Scene from "./Scene";
import Navigation from "./Interface/Navigation";
import VideoModal from "./Interface/VideoModal";
import { CanvasContextProvider, CanvasContext } from "./CanvasContext";
import { VideoContextProvider, VideoContext } from "./VideoContext";
import { ActiveProjectContextProvider, ActiveProjectContext } from "./ActiveProjectContext";
import * as THREE from "three";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CanvasContextProvider>
      <ActiveProjectContextProvider>
        <VideoContextProvider>
          <App />
        </VideoContextProvider>
      </ActiveProjectContextProvider>
    </CanvasContextProvider>
  </>
);

function App() {
  const ContextBridge = useContextBridge(CanvasContext, ActiveProjectContext, VideoContext);

  return (
    <>
      <Canvas
        shadows
        camera={{ position: new THREE.Vector3(0.0, 4.4, 6.3) }}
        onCreated={(state) => {
          state.camera.lookAt(new THREE.Vector3(0.0, 2.6, -8.3));
        }}
      >
        <OrbitControls makeDefault />
        <ContextBridge>
          <Perf position="bottom-left" />
          <ScrollControls horizontal damping={4} pages={6}>
            <Scene />
          </ScrollControls>
        </ContextBridge>
      </Canvas>
      <Navigation />
      <VideoModal />
    </>
  );
}
