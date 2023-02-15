import AnimatedText from "./AnimatedText";
import Button from "./Button";
import openLink from "./helpers/openLink";
import { PORTAL_SEPARATION, STAND_X_FROM_PORTAL } from "./constants";
import { projects } from "./data.js";

export default function Contact({ moveCharacter }) {
  const basePosition = (projects.length + 1) * PORTAL_SEPARATION + STAND_X_FROM_PORTAL;
  console.log("intro text rendered");

  const doThumbsUp = () => moveCharacter("THUMBSUP");

  return (
    <>
      <AnimatedText position={[basePosition, 6, -2]} active={true} fontSize={8}>
        I'm currently open to opportunities!
      </AnimatedText>
      <AnimatedText position={[basePosition, 4.5, 0]} fontSize={6} width={5}>
        If you would like to discuss my work or connect with me you may do so
      </AnimatedText>
      <Button
        text={"Via Email"}
        width={1.1}
        height={0.3}
        border={0.025}
        position={[basePosition - 0.75, 0.5, 2.5]}
        buttonPosition={[-0.565, -0.18, 0]}
        fontSize={4}
        onMouseOver={doThumbsUp}
        onClick={() => openLink("mailto:jblaszak@gmail.com")}
      />
      <Button
        text={"Via LinkedIn"}
        width={1.38}
        height={0.3}
        border={0.025}
        position={[basePosition + 0.85, 0.5, 2.5]}
        buttonPosition={[-0.7, -0.18, 0]}
        fontSize={4}
        onMouseOver={doThumbsUp}
        onClick={() => openLink("https://www.linkedin.com/in/joblaszak/")}
      />
    </>
  );
}
