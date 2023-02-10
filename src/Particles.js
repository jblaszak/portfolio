import * as THREE from "three";
import { shaderMaterial, useCursor } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import ParticlesVertexShader from "./shaders/ParticlesVertexShader";
import ParticlesFragmentShader from "./shaders/ParticlesFragmentShader";
import { useSpring, a } from "@react-spring/three";
import { useRef, useEffect, useState } from "react";
import useNavigateStore from "./stores/useNavigate";

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
  const currentSection = useNavigateStore((state) => state.currentSection);
  const avatar = useNavigateStore((state) => state.avatar);
  const focus = useNavigateStore((state) => state.focus);
  const setFocus = useNavigateStore((state) => state.setFocus);
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

  const shaderMaterialRef = useRef();
  const imageRef = useRef();

  const prevSectionRef = useRef();
  useEffect(() => {
    prevSectionRef.current = currentSection;
  }, [currentSection]);

  const [springs] = useSpring(() => {
    if (currentSection === index) {
      return {
        config: {
          mass: 1,
          friction: 120,
          tension: 400,
          duration: 2000,
          precision: 0.0001,
        },
        to: [
          {
            uRandom: 300.0,
            uOpacity: 0.0,
            imageOpacity: 0.0,
          },
          {
            uRandom: 0.0,
            uOpacity: 1.0,
            imageOpacity: 0.0,
          },
          {
            uRandom: 0.0,
            uOpacity: 0.0,
            imageOpacity: 1.0,
          },
        ],
      };
    } else if (prevSectionRef.current === index) {
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
            imageOpacity: 0.0,
          },
        ],
      };
    } else {
      return {
        uRandom: 300.0,
        uOpacity: 0.0,
        imageOpacity: 0.0,
      };
    }
  }, [currentSection]);

  const handleClick = () => {
    if (focus !== imageRef) {
      setFocus(imageRef);
    } else {
      setFocus(avatar);
    }
  };

  const geo = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1, 1, 1, 1));

  // Make image scale on hover if in avatar view
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  useFrame((state) => {
    const scaleFactor =
      hovered && focus === avatar ? 1 + Math.sin(state.clock.elapsedTime * 7.5) / 100 : 1;
    const scale = new THREE.Vector3(4 * 0.91 * scaleFactor, 6 * 0.93 * scaleFactor, 1);
    imageRef.current.scale.copy(scale);
  });

  const Shader = () => {
    const shaderMeshRef = useRef();

    const FinalMaterial = a(({ ...props }) => {
      return (
        <particleMaterial
          depthTest={true}
          depthWrite={false}
          transparent={true}
          // flatShading={true}
          ref={shaderMaterialRef}
          attach="material"
          uRandom={props.uRandom}
          uOpacity={props.uOpacity}
          uSize={3}
          uScale={0.045}
          uTextureSize={new THREE.Vector2(textureWidth, textureHeight)}
          uTexture={texture}
        />
      );
    });

    return (
      <mesh ref={shaderMeshRef}>
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
    );
  };

  return (
    <group position={position}>
      <Shader />
      <mesh
        ref={imageRef}
        onClick={() => handleClick()}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        name="portal"
      >
        <planeGeometry />
        <a.meshBasicMaterial map={image} opacity={springs.imageOpacity} transparent={true} />
      </mesh>
    </group>
  );
}
