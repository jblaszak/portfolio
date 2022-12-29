import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import ParticlesVertexShader from "./shaders/ParticlesVertexShader";
import ParticlesFragmentShader from "./shaders/ParticlesFragmentShader";
import { useSpring, a } from "@react-spring/three";
import { useRef } from "react";
// import { useControls } from "leva";

const ParticleMaterial = shaderMaterial(
  {
    uRandom: null,
    uSize: null,
    uScale: null,
    uOpacity: null,
    uTextureSize: null,
    uTexture: null,
  },
  ParticlesVertexShader,
  ParticlesFragmentShader
);

extend({ ParticleMaterial });

export default function Particles({ position, texture, image, active }) {
  const textureWidth = texture.source.data.width;
  const textureHeight = texture.source.data.height;
  const numParticles = textureWidth * textureHeight;

  const indices = new Uint16Array(numParticles);
  const offsets = new Float32Array(numParticles * 3);

  for (let i = 0; i < numParticles; i++) {
    offsets[i * 3 + 0] = i % textureWidth;
    offsets[i * 3 + 1] = Math.floor(i / textureWidth);
    indices[i] = i;
  }

  const materialRef = useRef();

  //   const { uRandom, uSize, uScale, uOpacity } = useControls("uniforms", {
  //     uRandom: {
  //       value: 5.0,
  //       min: 0.0,
  //       max: 1000.0,
  //       step: 1,
  //     },
  //     uSize: {
  //       value: 2.0,
  //       min: 0.0,
  //       max: 10.0,
  //       step: 0.1,
  //     },
  //     uScale: {
  //       value: 0.0225,
  //       min: 0.0,
  //       max: 10.0,
  //       step: 0.1,
  //     },
  //     uOpacity: {
  //       value: 1.0,
  //       min: 0.0,
  //       max: 1.0,
  //       step: 0.1,
  //     },
  //   });

  const { uRandom, uOpacity } = useSpring({
    config: {
      mass: 1,
      friction: 120,
      tension: 400,
    },
    uRandom: active ? 0.0 : 300.0,
    uOpacity: active ? 1.0 : 0.0,
  });

  const geo = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneBufferGeometry(1, 1, 1, 1));

  const Shader = () => {
    const meshRef = useRef();

    const FinalMaterial = a(({ ...props }) => {
      return (
        <particleMaterial
          depthTest={false}
          transparent={true}
          flatShading={true}
          toneMapped={false}
          ref={materialRef}
          attach="material"
          uRandom={props.uRandom}
          uOpacity={props.uOpacity}
          uSize={3.0}
          uScale={0.0225}
          uTextureSize={new THREE.Vector2(textureWidth, textureHeight)}
          uTexture={texture}
        />
      );
    });

    return (
      <group position={position}>
        <mesh ref={meshRef}>
          <instancedBufferGeometry
            index={geo.index}
            attributes-position={geo.attributes.position}
            attributes-uv={geo.attributes.uv}
          >
            <instancedBufferAttribute attach="attributes-pindex" args={[indices, 1]} />
            <instancedBufferAttribute attach="attributes-offset" args={[offsets, 3]} />
          </instancedBufferGeometry>
          <FinalMaterial uRandom={uRandom} uOpacity={uOpacity} />
        </mesh>
        <mesh position={[0, 0.02, 0]} scale={[0.91, 0.94, 0.92]}>
          <planeGeometry args={[4, 6]} />
          {/* <meshBasicMaterial /> */}
          <meshBasicMaterial map={image} />
        </mesh>
      </group>
    );
  };

  return <Shader />;
}
