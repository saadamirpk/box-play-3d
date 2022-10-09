import { React, useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import {
  softShadows,
  MeshWobbleMaterial,
  OrbitControls,
} from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

softShadows();
const SpinningMesh = ({ position, args, color, speed }) => {
  const mesh = useRef(null);
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });
  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      castShadow
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      position={position}
      ref={mesh}
    >
      <boxBufferGeometry args={args} />
      <MeshWobbleMaterial color={color} speed={speed} factor={0.6} />
    </a.mesh>
  );
};

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.3} />
        <pointLight position={[0, -10, 0]} intensity={1} />
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 1.1]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            args={[3, 2, 1]}
            color="lightblue"
            speed={2}
          />
          <SpinningMesh position={[-2, 1, -5]} color="pink" speed={6} />
          <SpinningMesh position={[5, 1, -2]} color="pink" speed={6} />
        </group>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </>
  );
}

export default App;
