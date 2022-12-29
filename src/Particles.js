import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import ppc from "./assets/ppc_small.png";
import ParticlesVertexShader from "./shaders/ParticlesVertexShader";
import ParticlesFragmentShader from "./shaders/ParticlesFragmentShader";
import { useRef } from "react";
import { useControls } from "leva";

const ParticleMaterial = shaderMaterial(
  {
    uTime: 1.0,
    uRandom: 1.0,
    uDepth: 0.0,
    uSize: 1.25,
    uScale: 0.0225,
    uOpacity: 1.0,
    uTextureSize: null,
    uTexture: null,
  },
  ParticlesVertexShader,
  ParticlesFragmentShader
);

extend({ ParticleMaterial });

export default function Particles({ position, rotation }) {
  const [texture] = useLoader(THREE.TextureLoader, [ppc]);
  const textureWidth = texture.source.data.width;
  const textureHeight = texture.source.data.height;
  const numParticles = textureWidth * textureHeight;

  const indices = new Uint16Array(numParticles);
  const offsets = new Float32Array(numParticles * 3);
  const angles = new Float32Array(numParticles);

  for (let i = 0; i < numParticles; i++) {
    offsets[i * 3 + 0] = i % textureWidth;
    offsets[i * 3 + 1] = Math.floor(i / textureWidth);

    indices[i] = i;

    angles[i] = Math.random() * Math.PI;
  }

  const meshRef = useRef();

  const { uTime, uRandom, uDepth, uSize, uScale, uOpacity } = useControls("uniforms", {
    uTime: {
      value: 1.0,
      min: 0.0,
      max: 10.0,
      step: 0.1,
    },
    uRandom: {
      value: 5.0,
      min: 0.0,
      max: 1000.0,
      step: 1,
    },
    uDepth: {
      value: 0.0,
      min: 0.0,
      max: 10.0,
      step: 0.1,
    },
    uSize: {
      value: 1.5,
      min: 0.0,
      max: 10.0,
      step: 0.1,
    },
    uScale: {
      value: 0.0225,
      min: 0.0,
      max: 10.0,
      step: 0.1,
    },
    uOpacity: {
      value: 1.0,
      min: 0.0,
      max: 1.0,
      step: 0.1,
    },
  });

  const geo = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneBufferGeometry(1, 1, 1, 1));

  useFrame((state, delta) => {
    meshRef.current.material.uniforms.uTime.value = uTime;
    meshRef.current.material.uniforms.uRandom.value = uRandom;
    meshRef.current.material.uniforms.uDepth.value = uDepth;
    meshRef.current.material.uniforms.uSize.value = uSize;
    meshRef.current.material.uniforms.uScale.value = uScale;
    meshRef.current.material.uniforms.uOpacity.value = uOpacity;
    meshRef.current.material.uniforms.uTextureSize.value = new THREE.Vector2(
      textureWidth,
      textureHeight
    );
    meshRef.current.material.uniforms.uTexture.value = texture;
    // meshRef.current.material.uniforms.uRandom.value = uRandom;
    // meshRef.current.material.uniformsNeedUpdate = true;
    // console.log(meshRef.current.material.uniforms.uRandom.value);
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <instancedBufferGeometry
        index={geo.index}
        attributes-position={geo.attributes.position}
        attributes-uv={geo.attributes.uv}
      >
        <instancedBufferAttribute attach="attributes-pindex" args={[indices, 1]} />
        <instancedBufferAttribute attach="attributes-angle" args={[angles, 1]} />
        <instancedBufferAttribute attach="attributes-offset" args={[offsets, 3]} />
      </instancedBufferGeometry>
      <particleMaterial depthTest={false} transparent={true} />
    </mesh>
  );
}
