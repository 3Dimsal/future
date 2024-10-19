// 

// App.js
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';

function Banner() {
  // Load the .glb file using the useGLTF hook
  const { scene } = useGLTF(process.env.PUBLIC_URL + '/ae.glb');

  const modelRef = useRef();

  let speed = 0.5; // Adjust this to control the speed of the bounce
  let amplitude = 1; // Adjust this to control how high the object bounces

  useFrame(({ clock }) => {
    // Use the clock's elapsed time to calculate the Y position using a sine wave
    const time = clock.getElapsedTime();
    const bounce = Math.sin(time * speed) * amplitude; // Sine function for smooth bounce motion
    if (modelRef.current) {
      modelRef.current.position.y = bounce; // Update the Y position of the model
    }
  });
  // You can also adjust the model's position if needed
  return <primitive ref={modelRef} object={scene} scale={2} rotation={[Math.PI / 2, 0, 0]} position={[-7, 8, -15]} />;
}

function Mercedes() {
  // Load the .glb file using the useGLTF hook
  const { scene } = useGLTF(process.env.PUBLIC_URL + '/mercedes.glb');

  // You can also adjust the model's position if needed
  return <primitive object={scene} scale={.10} rotation={[0, Math.PI / 3, 0]} position={[-8, -10, -10]} />;
}

function Villa() {
  // Load the .glb file using the useGLTF hook
  const { scene } = useGLTF(process.env.PUBLIC_URL + '/villa.glb');

  // You can also adjust the model's position if needed
  return <primitive object={scene} scale={2} position={[0, -10, -105]} />;
}

function Albert() {
  const { scene, animations } = useGLTF(process.env.PUBLIC_URL + '/albert.glb'); // Load the model with animation
  
  const mixerRef = useRef();

  useEffect(() => {
    // Create an AnimationMixer and play the first animation in the list
    if (animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      const action = mixerRef.current.clipAction(animations[0]); // Get the first animation
      action.play(); // Play the animation
    }
  }, [scene, animations]);

  useFrame((state, delta) => {
    // Update the mixer on each frame to progress the animation
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  return <primitive object={scene} scale={5} position={[2.5, -9.5, -15]} />;
}

function Esmarline() {
  const { scene, animations } = useGLTF(process.env.PUBLIC_URL + '/esma.glb'); // Load the model with animation
  
  const mixerRef = useRef();

  useEffect(() => {
    // Create an AnimationMixer and play the first animation in the list
    if (animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      const action = mixerRef.current.clipAction(animations[0]); // Get the first animation
      action.play(); // Play the animation
    }
  }, [scene, animations]);

  useFrame((state, delta) => {
    // Update the mixer on each frame to progress the animation
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  return <primitive object={scene} scale={5} position={[-2.5, -9.5, -15]} />;
}

function Lambo() {
  // Load the .glb file using the useGLTF hook
  const { scene } = useGLTF(process.env.PUBLIC_URL + '/lambo.glb');

  // You can also adjust the model's position if needed
  return <primitive object={scene} scale={5} rotation={[0, Math.PI / 3, 0]} position={[10, -10, -20]} />;
}

function PasswordProtect({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Define the correct password (you can change this)
    const correctPassword = 'Happy';

    if (password === correctPassword) {
      onUnlock(); // Call the function to unlock the app
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h2>Enter Password to Access</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div>
      {!unlocked ? (
        <PasswordProtect onUnlock={() => setUnlocked(true)} />
      ) : (
        <AppLG />
      )}
    </div>
  );}

function AppLG() {

  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 50 }} 
    style={{ width: '100vw', height: '100vh' }}
    gl={{ preserveDrawingBuffer: true }}
       onCreated={({ gl }) => {
         gl.setClearColor('#ADD8E6'); // Set the background to grey (#808080)
       }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[10, 10, 4]} intensity={3} />
      {/* <Banner /> */}
      <Lambo />
      <Mercedes />
      <Villa />
      <Albert />
      <Esmarline />
      <OrbitControls />
    </Canvas>
  );
}

export default App;