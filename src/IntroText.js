import AnimatedText from "./AnimatedText";
import Button from "./Button";

export default function IntroText({ moveCharacter }) {
  return (
    <>
      <AnimatedText position={[0, 5.8, -2]} active={true} fontStyle={"bold"} fontSize={20}>
        Jo Blaszak
      </AnimatedText>
      <AnimatedText position={[0, 4.5, 0]} fontSize={6}>
        Fullstack Creative Developer
      </AnimatedText>
      <Button
        text={"See my work!"}
        width={1.8}
        height={0.4}
        // radius={0.3}
        border={0.025}
        position={[0, 0.5, 2.5]}
        buttonPosition={[-0.925, -0.235, 0]}
        fontSize={5}
        onClick={() => moveCharacter(1)}
      />
    </>
  );
}
