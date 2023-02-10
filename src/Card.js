import { useCallback, useRef } from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";
import { INITIAL_CAMERA_LOOKAT, INITIAL_CAMERA_POSITION } from "./constants";
import useNavigateStore from "./stores/useNavigate";

import classes from "./Card.module.css";

export default function Card({
  active,
  title,
  date,
  description,
  tech,
  siteLink,
  codeLink,
  video,
  videoCaption,
  videoAriaLabel,
}) {
  const { setVideo, setVideoCaption } = useNavigateStore((state) => state);

  const cardRef = useRef();
  const camera = useThree((s) => s.camera);

  const startCamera = [
    INITIAL_CAMERA_POSITION.x,
    INITIAL_CAMERA_POSITION.y,
    INITIAL_CAMERA_POSITION.z,
  ];
  const startLookAt = [INITIAL_CAMERA_LOOKAT.x, INITIAL_CAMERA_LOOKAT.y, INITIAL_CAMERA_LOOKAT.z];

  const [cameraSpring, api] = useSpring(
    () => ({
      position: startCamera,
      lookAt: startLookAt,
    }),
    []
  );

  const handleClick = useCallback(() => {
    let focused = false;
    return () => {
      console.log(cardRef.current);
      focused = !focused;
      api.start({
        position: focused
          ? [...cardRef.current.localToWorld(new THREE.Vector3(0, 0, 5))]
          : startCamera,
        lookAt: focused
          ? [...cardRef.current.localToWorld(new THREE.Vector3(0, 0, 0))]
          : startLookAt,
        onChange: (val) => {
          camera.position.copy(new THREE.Vector3(...val.value.position));
          camera.lookAt(new THREE.Vector3(...val.value.lookAt));
          // console.log(imageRef.current.localToWorld(new THREE.Vector3(0, 0, 0)));
        },
      });
    };
  }, []);

  return (
    <group ref={cardRef}>
      <Html
        scale={0.15}
        transform
        position={[3.5, 3, 0]}
        occlude="blending"
        // zIndexRange={[0, 1000]}
      >
        <div
          className={`${classes.card}${active ? ` ${classes.active}` : ""}`}
          onClick={handleClick()}
        >
          <h2>{title}</h2>
          <p className={classes.date}>{date}</p>
          <p className={classes.description}>{description}</p>
          <p className={classes.tech}>
            Tech: <span>{tech}</span>
          </p>
          <div className={classes.links}>
            {siteLink && (
              <a href={siteLink} target="_blank" rel="noopener noreferrer">
                Visit Site
              </a>
            )}
            {codeLink && (
              <a href={codeLink} target="_blank" rel="noopener noreferrer">
                See Code
              </a>
            )}
            {video && (
              <button
                aria-label={videoAriaLabel}
                onClick={() => {
                  setVideo(video);
                  setVideoCaption(videoCaption);
                }}
              >
                View Video
              </button>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}
