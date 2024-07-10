import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';

const AVEquipment = ({ position, name }) => {
  return (
    <group position={position}>
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

const Room = () => {
  const floorRef = useRef();
  const { viewport } = useThree();

  useFrame(() => {
    if (floorRef.current) {
      floorRef.current.rotation.x = -Math.PI / 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box ref={floorRef} args={[20, 20, 0.1]} receiveShadow>
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
    setRoomDimensions(prev => ({ ...prev, [dimension]: Number(value) }));
  };

  return (
    <div className="w-full h-[600px]">
      <h2 className="text-2xl font-bold mb-4">3D AV Room Planner</h2>
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleResize('width', roomDimensions.width + 1)}>Increase Width</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleResize('length', roomDimensions.length + 1)}>Increase Length</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleResize('height', roomDimensions.height + 1)}>Increase Height</button>
      </div>
      <div className="flex-grow" style={{ height: '500px' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Canvas camera={{ position: [10, 10, 10] }}>
            <Room />
            <OrbitControls />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
};

export default AVRoomPlanner;