import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import ppc from "./assets/ppc_small.png";
import ParticlesVertexShader from "./shaders/ParticlesVertexShader";
import ParticlesFragmentShader from "./shaders/ParticlesFragmentShader";

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

  const uniforms = {
    uTime: { value: 0 },
    uRandom: { value: 1.0 },
    uDepth: { value: 1.0 },
    uSize: { value: 1.0 },
    uScale: { value: 0.01 },
    uTextureSize: { value: new THREE.Vector2(textureWidth, textureHeight) },
    uTexture: { value: texture },
  };

  const geo = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneBufferGeometry(1, 1, 1, 1));

  return (
    <mesh position={position} rotation={rotation}>
      <instancedBufferGeometry
        index={geo.index}
        attributes-position={geo.attributes.position}
        attributes-uv={geo.attributes.uv}
      >
        <instancedBufferAttribute attach="attributes-pindex" args={[indices, 1]} />
        <instancedBufferAttribute attach="attributes-angle" args={[angles, 1]} />
        <instancedBufferAttribute attach="attributes-offset" args={[offsets, 3]} />
      </instancedBufferGeometry>
      <rawShaderMaterial
        uniforms={uniforms}
        vertexShader={ParticlesVertexShader}
        fragmentShader={ParticlesFragmentShader}
        depthTest={false}
        transparent={true}
      />
    </mesh>
  );
}
