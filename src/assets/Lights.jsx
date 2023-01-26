

export function GrogLights(props) {
    return (
        <group>
            <directionalLight
            castShadow
            position={[2.5, 8, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[10,10, 10]} />
          <pointLight position={[-10, 0, -20]} color="red" intensity={4} />
          <pointLight position={[20, 2, 40]} color="blue" intensity={2} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          
        </group>
    )
}