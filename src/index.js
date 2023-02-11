import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
// import { Preload } from "@react-three/drei";
// import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Loader from "./Loader";
import Scene from "./Scene";
import VideoModal from "./Interface/VideoModal";
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
        <Suspense fallback={null}>
          {/* <Perf position="bottom-left" /> */}
          <Scene moveCharacter={moveCharacter} />
        </Suspense>
      </Canvas>
      <Loader />
      <Navigation moveCharacter={moveCharacter} />
      <VideoModal />
    </>
  );
}
