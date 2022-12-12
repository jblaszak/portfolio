import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./Scene";
import { Perf } from "r3f-perf";
import Interface from "./Interface/Interface";
import { ScrollControls } from "@react-three/drei";
import CanvasContextProvider from "./CanvasContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CanvasContextProvider>
      <Canvas
        shadows
        camera={{ position: new THREE.Vector3(0.0, 4.4, 6.3) }}
        onCreated={(state) => {
          state.camera.lookAt(new THREE.Vector3(0.0, 2.6, -8.3));
        }}
      >
        <Perf position="bottom-left" />
        <ScrollControls horizontal damping={4} pages={6}>
          <Scene />
        </ScrollControls>
      </Canvas>
      <Interface />
    </CanvasContextProvider>
  </>
);
