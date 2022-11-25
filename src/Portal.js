import { useState, useEffect } from "react";
import { useSprings, a } from "@react-spring/three";

export default function Portal({ portalPosition }) {
  const portal = { height: 10, width: 5 };
  const [portalArray, setPortalArray] = useState([]);
  const [showPortal, setShowPortal] = useState(false);
  const [springs, api] = useSprings(portalArray.length, (index) => ({
    opacity: 1,
    position: [
      portalArray[index].position.x,
      portalArray[index].position.y,
      portalArray[index].position.z,
    ],
  }));

  useEffect(() => {
    const portalBlocks = [];
    for (let i = 0; i < portal.height - 1; i++) {
      portalBlocks.push({
        position: { x: portalPosition[0], y: portalPosition[1] + i, z: portalPosition[2] },
      });
      portalBlocks.push({
        position: {
          x: portalPosition[0] + portal.width,
          y: portalPosition[1] + i,
          z: portalPosition[2],
        },
      });
    }
    for (let i = 0; i <= portal.width; i++) {
      portalBlocks.push({
        position: {
          x: portalPosition[0] + i,
          y: portalPosition[1] + portal.height - 1,
          z: portalPosition[2],
        },
      });
    }
    setPortalArray(portalBlocks);
  }, [portal.height, portal.width, portalPosition]);

  const handleClick = () => {
    setShowPortal((show) => !show);
    api.start((index) => ({
      config: { mass: 5, tension: 2000, friction: 200 },
      opacity: showPortal ? 1 : 0,
      position: [
        portalArray[index].position.x,
        portalArray[index].position.y + !showPortal * 5,
        portalArray[index].position.z,
      ],
      delay: index * (showPortal ? 50 : 1),
    }));
  };

  return (
    <group onClick={handleClick}>
      {springs.map(({ opacity, position }, index) => {
        return (
          <a.mesh position={position} key={index}>
            <boxGeometry />
            <a.meshPhysicalMaterial
              flatShading
              color="#3264FF"
              thickness={1}
              roughness={0.5}
              clearcoat={1}
              clearcoatRoughness={1}
              transmission={0.8}
              ior={1.25}
              attenuationTint="#fff"
              attentuationDistance={0}
              transparent={true}
              opacity={opacity}
            />
          </a.mesh>
        );
      })}
    </group>
  );
}
