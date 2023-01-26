import { Overlay } from "./assets/Overlay";

import "./App.css";
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSprings, a } from "@react-spring/three";
import { Environment, Lightformer } from "@react-three/drei";
import { easing } from "maath";

const number = 35;
// PALETTE LILLA //
// const colors = ["#FFD6FF", "#E7C6FF", "#C8B6FF", "#B8C0FF", "#BBD0FF"];

//PALETTE VIOLACEA
// const colors = ["#FFCDB2", "#FFB4A2", "#E5989B", "#B5838D", "#6D6875"];
//PLAETTE UNITA
const colors = [
  "#FFCDB2",
  "#FFB4A2",
  "#E5989B",
  "#B5838D",
  "#6D6875",
  "#E7C6FF",
  "#C8B6FF",
  "#B8C0FF",
  "#BBD0FF",
];

const random = (i) => {
  const r = Math.random();
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, i * -1.5],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [
      THREE.MathUtils.degToRad(Math.round(Math.random()) * 45),
      THREE.MathUtils.degToRad(Math.round(Math.random()) * 45),
      THREE.MathUtils.degToRad(Math.round(Math.random()) * 45),
    ],
  };
};

const data = new Array(number).fill().map(() => {
  return {
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [
      0.1 + Math.random() * 5,
      0.1 + Math.random() * 5,
      0.1 + Math.random() * 20,
    ],
  };
});

function Content() {
  const [springs, set] = useSprings(number, (i) => ({
    from: random(i),
    ...random(i),
    config: { mass: 20, tension: 150, friction: 50 },
  }));
  useEffect(
    () =>
      void setInterval(
        () => set((i) => ({ ...random(i), delay: i * 40 })),
        3000
      ),
    []
  );
  return data.map((d, index) => (
    <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
      <boxBufferGeometry attach='geometry' args={d.args} />
      <a.meshStandardMaterial
        attach='material'
        color={springs[index].color}
        roughness={0.75}
        metalness={0.5}
      />
    </a.mesh>
  ));
}

function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  );
}

export default function App() {
  return (
    <div className='App'>
      <div className='first-scene'>
        <Canvas linear flat shadows camera={{ position: [0, 0, 100], fov: 80 }}>
          <Lights />
          <Content />
          <Env />
        </Canvas>
      </div>
      <Overlay />
    </div>
  );
}

function Env({ perfSucks }) {
  const ref = useRef();
  useFrame((state, delta) => {
    // Animate the environment as well as the camera
    if (!perfSucks) {
      // easing.damp3(
      //   ref.current.rotation,
      //   [Math.PI / 2, 0, state.clock.elapsedTime / 5 + state.pointer.x],
      //   0.2,
      //   delta
      // );
      easing.damp3(
        state.camera.position,
        [
          Math.sin(state.pointer.x / 4) * 400,
          5.25 * state.pointer.y,
          Math.cos(state.pointer.x / 4) * 150,
        ],
        0.5,
        delta
      );
      state.camera.lookAt(0, 0, 0);
    }
  });
  // Runtime environments can be too slow on some systems, better safe than sorry with PerfMon
  return (
    <Environment
      frames={perfSucks ? 1 : Infinity}
      preset='city'
      resolution={256}
      blur={0.8}
    ></Environment>
  );
}
