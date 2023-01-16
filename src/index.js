import React from "react";
import ReactDOM from "react-dom/client";
import { ScrollControls, useContextBridge, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import Scene from "./Scene";
import Navigation from "./Interface/Navigation";
import VideoModal from "./Interface/VideoModal";
import { SectionContextProvider, SectionContext } from "./SectionContext";
import { VideoContextProvider, VideoContext } from "./VideoContext";
import * as THREE from "three";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <VideoContextProvider>
      <SectionContextProvider>
        <App />
      </SectionContextProvider>
    </VideoContextProvider>
  </>
);

function App() {
  const ContextBridge = useContextBridge(VideoContext, SectionContext);

  return (
    <>
      <Canvas
        shadows
        camera={{ position: new THREE.Vector3(0.0, 4.4, 6.3) }}
        onCreated={(state) => {
          state.camera.lookAt(new THREE.Vector3(0.0, 2.6, -8.3));
        }}
      >
        {/* <OrbitControls makeDefault /> */}
        <Preload all />
        <ContextBridge>
          {/* <Perf position="bottom-left" /> */}
          <ScrollControls horizontal damping={5} pages={6}>
            <Scene />
          </ScrollControls>
        </ContextBridge>
      </Canvas>
      <Navigation />
      <VideoModal />
    </>
  );
}
