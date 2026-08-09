'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00f5d4'),
      new THREE.Color('#9b5de5'),
      new THREE.Color('#00bbf9'),
      new THREE.Color('#f15bb5'),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count, viewport]);

  useFrame((state) => {
    if (!mesh.current) return;
    const posAttr = mesh.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.3 + i * 0.1) * 0.003;
      arr[i * 3] += Math.cos(t * 0.2 + i * 0.05) * 0.002;
    }
    posAttr.needsUpdate = true;
    mesh.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(200 * 6);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const posAttr = geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;

    let idx = 0;
    const maxVerts = 200 * 6;
    for (let i = 0; i < 40; i++) {
      const x1 = Math.sin(t * 0.3 + i) * 6;
      const y1 = Math.cos(t * 0.2 + i * 0.7) * 4;
      const z1 = Math.sin(t * 0.1 + i * 0.3) * 2;
      const x2 = Math.sin(t * 0.3 + i + 0.5) * 6;
      const y2 = Math.cos(t * 0.2 + (i + 0.5) * 0.7) * 4;
      const z2 = Math.sin(t * 0.1 + (i + 0.3) * 0.3) * 2;
      if (idx + 6 < maxVerts) {
        arr[idx++] = x1; arr[idx++] = y1; arr[idx++] = z1;
        arr[idx++] = x2; arr[idx++] = y2; arr[idx++] = z2;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#00f5d4" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function FloatingShape({ position, color, shape, speed }: { position: [number, number, number]; color: string; shape: 'box' | 'octahedron' | 'torus' | 'cone'; speed: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const initialY = position[1];

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.x = t * speed * 0.5;
    mesh.current.rotation.y = t * speed * 0.3;
    mesh.current.position.y = initialY + Math.sin(t * speed) * 0.8;
    mesh.current.position.x = position[0] + Math.sin(t * speed * 0.7) * 0.3;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box': return <boxGeometry args={[0.6, 0.6, 0.6]} />;
      case 'octahedron': return <octahedronGeometry args={[0.4]} />;
      case 'torus': return <torusGeometry args={[0.35, 0.12, 16, 32]} />;
      case 'cone': return <coneGeometry args={[0.3, 0.7, 4]} />;
    }
  }, [shape]);

  return (
    <mesh ref={mesh} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.25}
        wireframe
        emissive={color}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}

function GridPlane() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.position.z = -8 + (state.clock.elapsedTime * 0.3 % 2);
  });

  return (
    <mesh ref={mesh} rotation={[-0.3, 0, 0]} position={[0, -3, -8]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial color="#00f5d4" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f5d4" distance={30} />
        <pointLight position={[-10, -5, 5]} intensity={0.6} color="#9b5de5" distance={25} />
        <pointLight position={[0, -10, 5]} intensity={0.4} color="#f15bb5" distance={20} />
        <fog attach="fog" args={['#06060a', 5, 25]} />
        <Particles count={250} />
        <ConnectionLines />
        <FloatingShape position={[-4, 2, -2]} color="#00f5d4" shape="box" speed={0.6} />
        <FloatingShape position={[4, -1, -3]} color="#9b5de5" shape="octahedron" speed={0.4} />
        <FloatingShape position={[-2, -2, -1]} color="#00bbf9" shape="torus" speed={0.7} />
        <FloatingShape position={[3, 2, -4]} color="#f15bb5" shape="cone" speed={0.5} />
        <FloatingShape position={[0, 3, -2]} color="#00f5d4" shape="octahedron" speed={0.3} />
        <GridPlane />
      </Canvas>
    </div>
  );
}