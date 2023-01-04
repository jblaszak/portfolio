import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import ParticlesVertexShader from "./shaders/ParticlesVertexShader";
import ParticlesFragmentShader from "./shaders/ParticlesFragmentShader";
import { useSpring, a } from "@react-spring/three";
import { useRef, useEffect, useContext } from "react";
import { ActiveProjectContext } from "./ActiveProjectContext";
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

export default function Particles({ position, texture, image, index }) {
  const { activeProject } = useContext(ActiveProjectContext);
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

  const prevActiveProjectRef = useRef();
  useEffect(() => {
    prevActiveProjectRef.current = activeProject;
  }, [activeProject]);

  const [springs] = useSpring(() => {
    if (activeProject === index) {
      return {
        config: {
          mass: 1,
          friction: 120,
          tension: 400,
          duration: 2000,
        },
        to: [
          {
            uRandom: 300.0,
            uOpacity: 0.0,
            materialOpacity: 0.0,
          },
          {
            uRandom: 0.0,
            uOpacity: 1.0,
            materialOpacity: 0.0,
          },
          {
            uRandom: 0.0,
            uOpacity: 0.0,
            materialOpacity: 1.0,
          },
        ],
      };
    } else if (prevActiveProjectRef.current === index) {
      return {
        config: {
          mass: 1,
          friction: 120,
          tension: 400,
          duration: 500,
          precision: 0.0001,
        },
        to: [
          {
            uRandom: 300.0,
            uOpacity: 0.0,
            materialOpacity: 0.0,
          },
        ],
      };
    } else {
      return {
        uRandom: 300.0,
        uOpacity: 0.0,
        materialOpacity: 0.0,
      };
    }
  }, [activeProject]);

  const geo = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1, 1, 1, 1));

  const Shader = () => {
    const meshRef = useRef();

    const FinalMaterial = a(({ ...props }) => {
      return (
        <particleMaterial
          depthTest={false}
          transparent={true}
          flatShading={true}
          ref={materialRef}
          attach="material"
          uRandom={props.uRandom}
          uOpacity={props.uOpacity}
          uSize={2.0}
          uScale={0.045}
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
          <FinalMaterial uRandom={springs.uRandom} uOpacity={springs.uOpacity} />
        </mesh>
        <mesh position={[0, 0.02, 0]} scale={[0.91, 0.94, 0.92]}>
          <planeGeometry args={[4, 6]} />
          <a.meshBasicMaterial map={image} transparent={true} opacity={springs.materialOpacity} />
        </mesh>
      </group>
    );
  };

  return <Shader />;
}
