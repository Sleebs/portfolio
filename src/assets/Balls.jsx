import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
} from "@react-three/rapier";

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Scatolo(props) {
  return (
    <mesh castShadow>
      {/* <boxGeometry args={[1, 1, 1]} /> */}
      <boxGeometry args={[5, 5, 5]} />
      {/* <meshStandardMaterial color={"orange"} /> */}
      <meshStandardMaterial color={"coral"} emissive={"red"} />
    </mesh>
  );
}

export function BallsScene(props) {
  return (
    <Canvas
      shadows
      // camera={{ position: [20, 0.9, 20], fov: 26 }}>
      gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
      camera={{ position: [5, 15, 40], fov: 32.5, near: 1, far: 100 }}
      onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
    >
      <ambientLight intensity={1} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color='white'
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[0, 5, -4]} intensity={4} />
      {/* <directionalLight position={[0, -15, -0]} intensity={4} color='red' /> */}
      <Scatolo />
      <Scatolo />
    </Canvas>
  );
}
