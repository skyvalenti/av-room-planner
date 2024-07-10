import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Text, useDragControls, PivotControls } from '@react-three/drei';

const AVEquipment = ({ position, name }) => {
  return (
    <PivotControls 
      anchor={[0, -1, 0]} 
      depthTest={false} 
      lineWidth={4}
      scale={100}
      fixed={true}
    >
      <Box args={[1, 1, 1]} position={position}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <Text
        position={[position[0], position[1] + 1.5, position[2]]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </PivotControls>
  );
};

const Room = ({ dimensions }) => {
  const floorRef = useRef();

  useFrame(() => {
    if (floorRef.current) {
      floorRef.current.rotation.x = -Math.PI / 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box ref={floorRef} args={[dimensions.width, dimensions.length, 0.1]} receiveShadow>
        <meshStandardMaterial color="#cccccc" />
      </Box>
      <AVEquipment position={[-3, 0.5, -3]} name="Projector" />
      <AVEquipment position={[3, 0.5, 3]} name="Speaker" />
      <AVEquipment position={[0, 0.5, 0]} name="Microphone" />
    </>
  );
};

const AVRoomPlanner = () => {
  const [roomDimensions, setRoomDimensions] = useState({ width: 20, length: 20, height: 10 });

  const handleResize = (dimension, value) => {
    setRoomDimensions(prev => ({ ...prev, [dimension]: prev[dimension] + value }));
  };

  const containerStyle = {
    width: '100%',
    height: '600px',
    padding: '1rem',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    marginLeft: '1rem',
  };

  const descriptionStyle = {
    marginLeft: '1rem',
    marginBottom: '1.5rem',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#3B82F6',
    color: 'white',
    borderRadius: '0.25rem',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>3D AV Room Planner</h2>
      <p style={descriptionStyle}>
        Visualize and plan your AV setups with this interactive 3D room planner. 
        Adjust room dimensions and explore different equipment placements.
      </p>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => handleResize('width', 1)}>Increase Width</button>
        <button style={buttonStyle} onClick={() => handleResize('length', 1)}>Increase Length</button>
        <button style={buttonStyle} onClick={() => handleResize('height', 1)}>Increase Height</button>
      </div>
      <div style={{ height: '400px' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas camera={{ position: [10, 10, 10] }}>
            <Room dimensions={roomDimensions} />
            <OrbitControls />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default AVRoomPlanner;