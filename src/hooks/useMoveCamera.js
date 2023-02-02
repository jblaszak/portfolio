import useNavigateStore from "../stores/useNavigate";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { INITIAL_CAMERA_POSITION, INITIAL_CAMERA_LOOKAT } from "../constants";

const useMoveCamera = () => {
  const avatar = useNavigateStore((state) => state.avatar);
  const focus = useNavigateStore((state) => state.focus);

  // Seems stupid to declare things like this but if you use the actual vector in the useFrame below,
  // the lerp function changes INITIAL_CAMERA variables :(
  const [initialCameraX, initialCameraY, initialCameraZ] = [...INITIAL_CAMERA_POSITION];
  const [initialLookAtX, initialLookAtY, initialLookAtZ] = [...INITIAL_CAMERA_LOOKAT];

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(initialCameraX, initialCameraY, initialCameraZ)
  );
  const [smoothedLookAtPosition] = useState(
    () => new THREE.Vector3(initialLookAtX, initialLookAtY, initialLookAtZ)
  );

  useFrame((state, delta) => {
    if (!avatar.current) return;

    const cameraPositionTarget = new THREE.Vector3();
    if (focus === avatar) {
      cameraPositionTarget.copy(focus.current.position);
      cameraPositionTarget.x += initialCameraX;
      cameraPositionTarget.y += initialCameraY;
      cameraPositionTarget.z += initialCameraZ;
    } else {
      const newTarget = focus.current.localToWorld(new THREE.Vector3(0, 0, 5));
      cameraPositionTarget.copy(newTarget);
    }

    const lookAtPositionTarget = new THREE.Vector3();
    if (focus === avatar) {
      lookAtPositionTarget.copy(focus.current.position);
      lookAtPositionTarget.x += initialLookAtX;
      lookAtPositionTarget.y += initialLookAtY;
      lookAtPositionTarget.z += initialLookAtZ;
    } else {
      const newTarget = focus.current.localToWorld(new THREE.Vector3(0, 0, 0));
      lookAtPositionTarget.copy(newTarget);
    }

    const lerpSpeed = focus === avatar ? 20 * delta : 5 * delta;

    smoothedCameraPosition.lerp(cameraPositionTarget, lerpSpeed);
    smoothedLookAtPosition.lerp(lookAtPositionTarget, lerpSpeed);
    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedLookAtPosition);
  });
};

export default useMoveCamera;