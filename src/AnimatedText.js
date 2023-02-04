import { Text } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import fontBold from "./assets/fonts/playfairdisplay-black-webfont.woff";
import font from "./assets/fonts/playfairdisplay-bold-webfont.woff";

export default function AnimatedText({
  position,
  transition,
  active,
  children,
  fontStyle = "regular",
  fontSize = 1,
}) {
  const fontProps = {
    color: "black",
    font: fontStyle === "bold" ? fontBold : font,
    fontSize: fontSize / 10,
    lineHeight: 1,
    "material-toneMapped": false,
  };

  const springs = useSpring({
    textPosition: active
      ? position
      : [position[0] + transition[0], position[1] + transition[1], position[2] + transition[2]],
    opacity: active ? 1 : 0,
  });

  const IntermediateAnimatedText = a((props) => {
    console.log(props.position);
    return (
      <Text position={props.position} {...fontProps}>
        <a.meshBasicMaterial
          side={THREE.FrontSide}
          color={fontProps.color}
          transparent
          opacity={props.opacity}
        />
        {props.children}
      </Text>
    );
  });

  return (
    <>
      <IntermediateAnimatedText
        position={springs.textPosition}
        opacity={springs.opacity}
        children={children}
      />
    </>
  );
}
