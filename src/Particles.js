import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import ParticlesVertexShader from "./shaders/ParticlesVertexShader";
import ParticlesFragmentShader from "./shaders/ParticlesFragmentShader";
import { useSpring, a } from "@react-spring/three";
import { useRef, useEffect, useContext, useState, useCallback } from "react";
import { SectionContext } from "./SectionContext";
import { INITIAL_CAMERA_LOOKAT, INITIAL_CAMERA_POSITION } from "./constants";
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
  const { currSection } = useContext(SectionContext);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
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
    prevSectionRef.current = currSection;
  }, [currSection]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  const [springs] = useSpring(() => {
    if (currSection === index) {
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
  }, [currSection]);

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
  const finalCamera = position;
  const finalLookAt = position;

  const [cameraSpring, api] = useSpring(
    () => ({
      position: startCamera,
      lookAt: startLookAt,
      // onChange: (val) => {
      //   camera.position.copy(new THREE.Vector3(...val.value.position));
      //   camera.lookAt(new THREE.Vector3(...val.value.lookAt));
      //   console.log(camera.position);
      // },
    }),
    []
  );

  const handleClick = useCallback(() => {
    return () => {
      setFocused((prev) => !prev);
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
  }, [focused]);

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
          uSize={3.0}
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
        <mesh
          ref={imageRef}
          position={[0, 0.02, 0]}
          scale={[0.91, 0.94, 0.92]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          // onPointerEnter={(e) => {
          //   setHovered(true);
          // }}
          // onPointerLeave={(e) => {
          //   setHovered(false);
          // }}
          onClick={handleClick()}
          // onClick={() => {
          //   handleClick();
          //   setHovered(false);
          // }}
        >
          <planeGeometry args={[4, 6]} />
          <a.meshBasicMaterial map={image} transparent={true} opacity={springs.materialOpacity} />
        </mesh>
      </group>
    );
  };

  return <Shader />;
}
