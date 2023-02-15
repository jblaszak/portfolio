import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import useNavigateStore from "./stores/useNavigate";
import AnimatedText from "./AnimatedText";
import Button from "./Button";
import openLink from "./helpers/openLink";
import * as THREE from "three";

import paperImage from "./assets/paper.jpg";

export default function InfoCard({
  position,
  rotation,
  title,
  date,
  description,
  tech,
  siteLink = null,
  codeLink = null,
  video = null,
}) {
  const focus = useNavigateStore((state) => state.focus);

  const [paperTexture] = useLoader(THREE.TextureLoader, [paperImage]);

  const cardRef = useRef();
  const cardContentsRef = useRef();
  const titleRef = useRef();
  const lineRef = useRef();
  const [activeStatuses, setActiveStatuses] = useState(() => {
    const activeMap = new Map([
      ["title", false],
      ["date", false],
      ["line", false],
      ["description", false],
      ["tech", false],
    ]);

    if (siteLink) activeMap.set("siteLink", false);
    if (codeLink) activeMap.set("codeLink", false);
    if (video) activeMap.set("video", false);

    return activeMap;
  });

  const hovered = useRef(false);
  const lineTargetPosition = new THREE.Vector3(
    title.position[0],
    title.position[1] - 0.175,
    title.position[2]
  );
  const lineTargetScale = new THREE.Vector3(0, 0.03, 1);
  const [lerpedLineTargetPosition] = useState(new THREE.Vector3().copy(lineTargetPosition));
  const [lerpedLineScale] = useState(new THREE.Vector3().copy(lineTargetScale));
  const delay = 250;
  const scale = new THREE.Vector3(0.2, 0.2, 1);

  const handleClick = () => {
    if (focus !== cardRef) {
      useNavigateStore.setState({ focus: cardRef });

      const keys = [...activeStatuses.keys()];
      let i = 0;
      const newStatuses = new Map(activeStatuses);

      const interval = setInterval(() => {
        newStatuses.set(keys[i], true);
        const entries = newStatuses.entries();
        const newMap = new Map(entries);
        setActiveStatuses(newMap);

        i++;
        if (i >= keys.length) clearInterval(interval);
      }, delay);

      cardContentsRef.current.traverse((obj) => {
        if (obj.type === "Mesh") {
          obj.raycast = THREE.Mesh.prototype.raycast;
        }
      });
      cardContentsRef.current.visible = true;
    } else {
      const avatar = useNavigateStore.getState().avatar;
      useNavigateStore.setState({ focus: avatar });

      const newStatuses = new Map(activeStatuses);
      for (const key of newStatuses.keys()) {
        newStatuses.set(key, false);
      }
      setActiveStatuses(newStatuses);

      cardContentsRef.current.traverse((obj) => {
        if (obj.type === "Mesh") {
          obj.raycast = () => null;
        }
      });
      cardContentsRef.current.visible = false;
    }
  };

  useEffect(() => {
    if (!cardContentsRef.current) return;

    cardContentsRef.current.traverse((obj) => {
      if (obj.type === "Mesh") {
        obj.raycast = () => null;
      }
    });
  }, []);

  useFrame((state) => {
    if (!titleRef.current) return;
    if (titleRef.current.geometry.boundingBox.max.x === -Infinity) return;

    // Scale card on hover, only if avatar is focus
    const scaleFactor =
      hovered.current && focus.current.name === "avatar"
        ? 1 + (4 * Math.sin(state.clock.elapsedTime * 7.5)) / 100
        : 1;
    scale.set(0.2 * scaleFactor, 0.2 * scaleFactor, 1);
    cardRef.current.scale.copy(scale);

    // Scale size/position of line when toggling between active state
    const positions = activeStatuses.get("line")
      ? [
          title.position[0] + titleRef.current.geometry.boundingBox.max.x / 2,
          title.position[1] - 0.175,
          title.position[2],
        ]
      : [title.position[0], title.position[1] - 0.175, title.position[2]];
    lineTargetPosition.set(...positions);
    lerpedLineTargetPosition.lerp(lineTargetPosition, 0.1);
    lineRef.current.position.copy(lerpedLineTargetPosition);

    lineTargetScale.set(
      activeStatuses.get("line") ? titleRef.current.geometry.boundingBox.max.x : 0,
      0.03,
      1
    );
    lerpedLineScale.lerp(lineTargetScale, 0.1);
    lineRef.current.scale.copy(lerpedLineScale);
  });

  return (
    <>
      <group
        ref={cardRef}
        onClick={(e) => {
          //   e.stopPropagation();
          handleClick();
        }}
        onPointerOver={(e) => {
          hovered.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = "auto";
        }}
        position={position}
        rotation={rotation}
        name="card"
      >
        <mesh position={[0, 0, -0.15]}>
          <planeGeometry attach="geometry" args={[5.4, 4.4]} />
          <meshBasicMaterial map={paperTexture} toneMapped={false} />
        </mesh>
        <group ref={cardContentsRef} visible={false}>
          <AnimatedText
            ref={titleRef}
            position={title.position}
            transition={title.transition}
            active={activeStatuses.get("title")}
            fontStyle={"bold"}
            fontSize={6}
            anchorX={"left"}
            faceCam={false}
          >
            {title.text}
          </AnimatedText>
          <AnimatedText
            position={date.position}
            transition={date.transition}
            active={activeStatuses.get("date")}
            fontSize={4}
            faceCam={false}
          >
            {date.text}
          </AnimatedText>
          <mesh ref={lineRef}>
            <planeGeometry attach="geometry" args={[1, 1]} />
            <meshBasicMaterial color="black" toneMapped={false} />
          </mesh>
          <AnimatedText
            position={description.position}
            transition={description.transition}
            active={activeStatuses.get("description")}
            fontSize={4.5}
            anchorX={"left"}
            textAlign={"left"}
            faceCam={false}
            width={4}
          >
            {description.text}
          </AnimatedText>
          <AnimatedText
            position={tech.position}
            transition={tech.transition}
            active={activeStatuses.get("tech")}
            fontSize={4.5}
            anchorX={"left"}
            textAlign={"left"}
            width={4}
            faceCam={false}
          >
            {tech.text}
          </AnimatedText>
          {siteLink && (
            <Button
              text={"View Site"}
              width={1.4}
              height={0.4}
              border={0.025}
              active={activeStatuses.get("siteLink")}
              position={siteLink.position}
              transition={siteLink.transition}
              buttonPosition={[-0.74, -0.21, 0]}
              fontSize={5}
              faceCam={false}
              onClick={() => openLink(siteLink.href)}
            />
          )}
          {codeLink && (
            <Button
              text={"View Code"}
              width={1.55}
              height={0.4}
              border={0.025}
              active={activeStatuses.get("codeLink")}
              position={codeLink.position}
              transition={codeLink.transition}
              buttonPosition={[-0.8, -0.21, 0]}
              fontSize={5}
              faceCam={false}
              onClick={() => openLink(codeLink.href)}
            />
          )}
          {video && (
            <Button
              text={"View Video"}
              width={1.57}
              height={0.4}
              border={0.025}
              active={activeStatuses.get("video")}
              position={video.position}
              transition={video.transition}
              buttonPosition={[-0.8, -0.21, 0]}
              fontSize={5}
              faceCam={false}
              onClick={(e) => {
                e.stopPropagation();
                useNavigateStore.setState({ video: video.video });
                useNavigateStore.setState({ videoCaption: video.videoCaption });
              }}
            />
          )}
        </group>
      </group>
    </>
  );
}
