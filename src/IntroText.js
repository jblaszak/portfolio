import AnimatedText from "./AnimatedText";

export default function IntroText() {
  return (
    <>
      <AnimatedText
        position={[0, 5.8, -2]}
        transition={[0, 2, 0]}
        active={true}
        fontStyle={"bold"}
        fontSize={20}
      >
        Jo Blaszak
      </AnimatedText>
      <AnimatedText position={[0, 4.5, 0]} fontSize={6}>
        Fullstack Creative Developer
      </AnimatedText>
      <AnimatedText position={[0, 0.5, 2]} fontSize={5}>
        See my work!
      </AnimatedText>
    </>
  );
}
