import { useRef, useState } from "react";
import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useNavigateStore from "./stores/useNavigate";
import AnimatedText from "./AnimatedText";
import Button from "./Button";
import openLink from "./helpers/openLink";
import * as THREE from "three";

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
  videoCaption = null,
}) {
  const avatar = useNavigateStore((state) => state.avatar);
  const focus = useNavigateStore((state) => state.focus);
  const setFocus = useNavigateStore((state) => state.setFocus);

  const cardRef = useRef();
  const titleRef = useRef();
  const lineRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [lerpedLineTargetPosition] = useState(
    new THREE.Vector3(title.position[0], title.position[1] - 0.175, title.position[2])
  );
  const [lerpedLineScale] = useState(new THREE.Vector3(1, 0.3, 1));
  useCursor(hovered);

  const active = true;

  const handleClick = () => {
    if (focus !== cardRef) {
      setFocus(cardRef);
    } else {
      setFocus(avatar);
    }
  };

  useFrame((state) => {
    if (!titleRef.current) return;

    // Scale card on hover, only if avatar is focus
    const scaleFactor =
      hovered && focus === avatar ? 1 + (4 * Math.sin(state.clock.elapsedTime * 7.5)) / 100 : 1;
    const scale = new THREE.Vector3(0.2 * scaleFactor, 0.2 * scaleFactor, 1);
    cardRef.current.scale.copy(scale);

    // Scale size/position of line when toggling between active state
    const lineTargetPosition = active
      ? new THREE.Vector3(
          title.position[0] + titleRef.current.geometry.boundingBox.max.x / 2,
          title.position[1] - 0.175,
          title.position[2]
        )
      : new THREE.Vector3(title.position[0], title.position[1] - 0.175, title.position[2]);
    lerpedLineTargetPosition.lerp(lineTargetPosition, 0.1);
    lineRef.current.position.copy(lerpedLineTargetPosition);

    const lineTargetScale = active
      ? new THREE.Vector3(titleRef.current.geometry.boundingBox.max.x, 0.03, 1)
      : new THREE.Vector3(0, 0.03, 1);
    lerpedLineScale.lerp(lineTargetScale, 0.1);
    lineRef.current.scale.copy(lerpedLineScale);
  });

  return (
    <>
      <group
        ref={cardRef}
        onClick={() => handleClick()}
        onPointerOver={(e) => {
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        position={position}
        rotation={rotation}
        name="card"
      >
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry attach="geometry" args={[5, 4]} />
          <meshBasicMaterial color={"white"} toneMapped={true} />
        </mesh>
        <AnimatedText
          ref={titleRef}
          position={title.position}
          transition={title.transition}
          active={active}
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
          active={active}
          fontSize={4}
          faceCam={false}
        >
          {date.text}
        </AnimatedText>
        <mesh ref={lineRef}>
          <planeGeometry attach="geometry" args={[1, 1]} />
          <meshBasicMaterial color={"black"} toneMapped={true} opacity={1} transparent />
        </mesh>
        <AnimatedText
          position={description.position}
          transition={description.transition}
          active={active}
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
          active={active}
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
            active={active}
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
            active={active}
            position={codeLink.position}
            transition={codeLink.transition}
            buttonPosition={[-0.8, -0.21, 0]}
            fontSize={5}
            faceCam={false}
            onClick={() => openLink(codeLink.href)}
          />
        )}
      </group>
    </>
  );
}
