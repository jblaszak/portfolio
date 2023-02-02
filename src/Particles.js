import * as THREE from "three";
import { shaderMaterial, useCursor } from "@react-three/drei";
import { extend, useThree, useFrame } from "@react-three/fiber";
import ParticlesVertexShader from "./shaders/ParticlesVertexShader";
import ParticlesFragmentShader from "./shaders/ParticlesFragmentShader";
import { useSpring, a } from "@react-spring/three";
import { useRef, useEffect, useCallback, useState } from "react";
import { INITIAL_CAMERA_LOOKAT, INITIAL_CAMERA_POSITION } from "./constants";
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

  const materialRef = useRef();
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

  const camera = useThree((s) => s.camera);

  const startCamera = [
    INITIAL_CAMERA_POSITION.x + position[0],
    INITIAL_CAMERA_POSITION.y,
    INITIAL_CAMERA_POSITION.z,
  ];
  const startLookAt = [
    INITIAL_CAMERA_LOOKAT.x + position[0],
    INITIAL_CAMERA_LOOKAT.y,
    INITIAL_CAMERA_LOOKAT.z,
  ];

  const [cameraSpring, api] = useSpring(
    () => ({
      position: startCamera,
      lookAt: startLookAt,
    }),
    []
  );

  const handleClick = useCallback(() => {
    let focused = false;
    return () => {
      focused = !focused;
      api.start({
        position: focused
          ? [...imageRef.current.localToWorld(new THREE.Vector3(0, 0, 5))]
          : startCamera,
        lookAt: focused
          ? [...imageRef.current.localToWorld(new THREE.Vector3(0, 0, 0))]
          : startLookAt,
        onChange: (val) => {
          camera.position.copy(new THREE.Vector3(...val.value.position));
          camera.lookAt(new THREE.Vector3(...val.value.lookAt));
          // console.log(imageRef.current.localToWorld(new THREE.Vector3(0, 0, 0)));
        },
      });
    };
  }, []);

  const geo = new THREE.InstancedBufferGeometry().copy(new THREE.PlaneGeometry(1, 1, 1, 1));

  // Make image scale on hover if in avatar view
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  useFrame((state) => {
    const scaleFactor =
      hovered && focus === "avatar" ? 1 + Math.sin(state.clock.elapsedTime * 7.5) / 100 : 1;
    const scale = new THREE.Vector3(4 * 0.91 * scaleFactor, 6 * 0.93 * scaleFactor, 1);
    imageRef.current.scale.copy(scale);
  });

  const Shader = () => {
    const meshRef = useRef();

    const FinalMaterial = a(({ ...props }) => {
      return (
        <particleMaterial
          depthTest={true}
          depthWrite={false}
          transparent={true}
          // flatShading={true}
          ref={materialRef}
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

    const TexturedMaterial = a(({ ...props }) => {
      return (
        <meshBasicMaterial map={props.image} opacity={props.materialOpacity} transparent={true} />
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
        <mesh
          ref={imageRef}
          scale={[4 * 0.91, 6 * 0.93, 1]}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry />
          <TexturedMaterial materialOpacity={springs.imageOpacity} image={image} />
        </mesh>
      </group>
    );
  };

  return <Shader />;
}
