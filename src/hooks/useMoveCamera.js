import useNavigateStore from "../stores/useNavigate";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { INITIAL_CAMERA_POSITION, INITIAL_CAMERA_LOOKAT } from "../constants";

const useMoveCamera = () => {
  // Seems stupid to declare things like this but if you use the actual vector in the useFrame below,
  // the lerp function changes INITIAL_CAMERA variables :(
  const [initialCameraX, initialCameraY, initialCameraZ] = [...INITIAL_CAMERA_POSITION];
  const [initialLookAtX, initialLookAtY, initialLookAtZ] = [...INITIAL_CAMERA_LOOKAT];

  const smoothedCameraPosition = useRef(
    new THREE.Vector3(initialCameraX, initialCameraY, initialCameraZ)
  );
  const smoothedLookAtPosition = useRef(
    new THREE.Vector3(initialLookAtX, initialLookAtY, initialLookAtZ)
  );
  const cameraPositionTarget = new THREE.Vector3();
  const lookAtPositionTarget = new THREE.Vector3();
  const portalDist = new THREE.Vector3(0, 0, 4);
  const cardDist = new THREE.Vector3(0, 0, 1);
  const cameraDist = new THREE.Vector3();
  const lookAtDist = new THREE.Vector3(0, 0, 0);
  const lookAtDistCopy = new THREE.Vector3();

  useFrame((state, delta) => {
    const focus = useNavigateStore.getState().focus;
    const targetSection = useNavigateStore.getState().targetSection;
    const currentSection = useNavigateStore.getState().currentSection;
    if (!focus?.current) return;

    const name = focus.current.name;

    if (name === "avatar") {
      cameraPositionTarget.copy(focus.current.position);
      cameraPositionTarget.x += initialCameraX;
      cameraPositionTarget.y += initialCameraY;
      cameraPositionTarget.z += initialCameraZ;
    } else {
      // Seems stupid but somehow localToWorld changes the original so just referencing it doesn't work
      cameraDist.copy(name === "portal" ? portalDist : cardDist);
      cameraPositionTarget.copy(focus.current.localToWorld(cameraDist));
    }

    if (name === "avatar") {
      lookAtPositionTarget.copy(focus.current.position);
      lookAtPositionTarget.x += initialLookAtX;
      lookAtPositionTarget.y += initialLookAtY;
      lookAtPositionTarget.z += initialLookAtZ;
    } else {
      lookAtDistCopy.copy(lookAtDist);
      lookAtPositionTarget.copy(focus.current.localToWorld(lookAtDistCopy));
    }

    const lerpSpeed = targetSection !== currentSection ? 20 * delta : 5 * delta;

    smoothedCameraPosition.current.lerp(cameraPositionTarget, lerpSpeed);
    smoothedLookAtPosition.current.lerp(lookAtPositionTarget, lerpSpeed);
    state.camera.position.copy(smoothedCameraPosition.current);
    state.camera.lookAt(smoothedLookAtPosition.current);
  });
};

export default useMoveCamera;
