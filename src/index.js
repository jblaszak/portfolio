import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./Scene";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Canvas camera={{ position: new THREE.Vector3(8, 5, 40) }}>
    <Scene />
  </Canvas>
);
