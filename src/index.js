import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Interface from "./Interface/Interface";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Canvas shadows camera={{ position: new THREE.Vector3(0, 5, 10) }}>
      <Perf position="bottom-left" />
      <OrbitControls makedefault />
      <Scene />
    </Canvas>
    <Interface />
  </>
);
