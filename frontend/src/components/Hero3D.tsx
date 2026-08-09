'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function EyeGlow({ position, color }: { position: [number, number, number]; color: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const light = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = Math.sin(t * 3) * 0.3 + 0.7;
    if (mesh.current) {
      (mesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 2;
    }
    if (light.current) {
      light.current.intensity = pulse * 1.5;
    }
  });

  return (
    <group>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={position} color={color} intensity={1.5} distance={2} />
    </group>
  );
}

function RobotBody() {
  const group = useRef<THREE.Group>(null!);
  const headGroup = useRef<THREE.Group>(null!);
  const leftArm = useRef<THREE.Group>(null!);
  const rightArm = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      group.current.position.y = Math.sin(t * 0.6) * 0.15;
    }
    if (headGroup.current) {
      headGroup.current.rotation.y = Math.sin(t * 0.8) * 0.1;
      headHeadTilt = Math.sin(t * 0.5) * 0.05;
      headGroup.current.rotation.z = headHeadTilt;
    }
    if (leftArm.current) {
      leftArm.current.rotation.x = Math.sin(t * 0.7) * 0.2;
      leftArm.current.rotation.z = Math.sin(t * 0.5) * 0.1 - 0.1;
    }
    if (rightArm.current) {
      rightArm.current.rotation.x = Math.sin(t * 0.7 + 1) * 0.2;
      rightArm.current.rotation.z = Math.sin(t * 0.5 + 1) * 0.1 + 0.1;
    }
  });

  let headHeadTilt = 0;

  return (
    <group ref={group}>
      {/* Head */}
      <group ref={headGroup} position={[0, 1.6, 0]}>
        {/* Main head block */}
        <mesh>
          <boxGeometry args={[0.9, 0.7, 0.8]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 0.05, 0.41]}>
          <boxGeometry args={[0.75, 0.35, 0.05]} />
          <meshStandardMaterial color="#0a0a14" metalness={1} roughness={0.05} />
        </mesh>
        {/* Eyes */}
        <EyeGlow position={[-0.2, 0.08, 0.44]} color="#00f5d4" />
        <EyeGlow position={[0.2, 0.08, 0.44]} color="#00f5d4" />
        {/* Antenna base */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.15, 8]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Antenna tip */}
        <mesh position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#9b5de5" emissive="#9b5de5" emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 0.62, 0]} color="#9b5de5" intensity={1} distance={2} />
        {/* Ear panels */}
        <mesh position={[-0.5, 0, 0]}>
          <boxGeometry args={[0.1, 0.25, 0.3]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.5, 0, 0]}>
          <boxGeometry args={[0.1, 0.25, 0.3]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.2, 8]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.1, 1, 0.6]} />
        <meshStandardMaterial color="#0c0c14" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Chest plate */}
      <mesh position={[0, 0.65, 0.31]}>
        <boxGeometry args={[0.7, 0.6, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Chest arc reactor */}
      <mesh position={[0, 0.7, 0.35]}>
        <torusGeometry args={[0.12, 0.03, 16, 32]} />
        <meshStandardMaterial color="#00bbf9" emissive="#00bbf9" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 0.7, 0.5]} color="#00bbf9" intensity={2} distance={3} />
      {/* Core inner */}
      <mesh position={[0, 0.7, 0.35]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="#00f5d4" emissive="#00f5d4" emissiveIntensity={4} toneMapped={false} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.7, 0.95, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 0.95, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arms */}
      <group ref={leftArm} position={[-0.85, 0.6, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.18, 0.45, 0.18]} />
          <meshStandardMaterial color="#0c0c14" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[0.16, 0.35, 0.16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[0.14, 0.12, 0.18]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      <group ref={rightArm} position={[0.85, 0.6, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.18, 0.45, 0.18]} />
          <meshStandardMaterial color="#0c0c14" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <boxGeometry args={[0.16, 0.35, 0.16]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[0.14, 0.12, 0.18]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Waist */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.45]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.25, -0.45, 0]}>
        <boxGeometry args={[0.22, 0.7, 0.22]} />
        <meshStandardMaterial color="#0c0c14" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0.25, -0.45, 0]}>
        <boxGeometry args={[0.22, 0.7, 0.22]} />
        <meshStandardMaterial color="#0c0c14" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Feet */}
      <mesh position={[-0.25, -0.9, 0.05]}>
        <boxGeometry args={[0.24, 0.12, 0.35]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.25, -0.9, 0.05]}>
        <boxGeometry args={[0.24, 0.12, 0.35]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function EnergyRing({ radius, color, speed, yOffset }: { radius: number; color: string; speed: number; yOffset: number }) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = state.clock.elapsedTime * speed;
    mesh.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <mesh ref={mesh} position={[0, yOffset, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.6} toneMapped={false} />
    </mesh>
  );
}

function OrbitParticles() {
  const group = useRef<THREE.Group>(null!);

  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      angle: (i / 30) * Math.PI * 2,
      radius: 2 + Math.random() * 0.5,
      speed: 0.3 + Math.random() * 0.4,
      y: (Math.random() - 0.5) * 2,
      size: 0.02 + Math.random() * 0.02,
    }));
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const p = particles[i];
      const angle = p.angle + t * p.speed;
      child.position.x = Math.cos(angle) * p.radius;
      child.position.z = Math.sin(angle) * p.radius;
      child.position.y = p.y + Math.sin(t * 0.5 + i) * 0.3;
    });
  });

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color="#00f5d4" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        <pointLight position={[3, 3, 3]} intensity={1.5} color="#00f5d4" distance={15} />
        <pointLight position={[-3, 2, 2]} intensity={1} color="#9b5de5" distance={12} />
        <pointLight position={[0, -2, 3]} intensity={0.6} color="#f15bb5" distance={10} />
        <spotLight position={[0, 5, 0]} angle={0.4} penumbra={0.5} intensity={0.8} color="#00f5d4" distance={20} />
        <fog attach="fog" args={['#06060a', 4, 18]} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <RobotBody />
        </Float>
        <EnergyRing radius={1.8} color="#00f5d4" speed={0.5} yOffset={0.5} />
        <EnergyRing radius={2.2} color="#9b5de5" speed={-0.3} yOffset={0.3} />
        <OrbitParticles />
      </Canvas>
    </div>
  );
}