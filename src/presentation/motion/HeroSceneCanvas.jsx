import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useMemo, useRef, useEffect } from 'react';

function Orb({ mouse }) {
  const group = useRef();
  const ringA = useRef();
  const ringB = useRef();

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.25;
    group.current.rotation.x += (mouse.current.y * 0.1 - group.current.rotation.x) * 0.05;
    group.current.rotation.z += (mouse.current.x * 0.1 - group.current.rotation.z) * 0.05;
    if (ringA.current) ringA.current.rotation.x += dt * 0.4;
    if (ringB.current) ringB.current.rotation.y -= dt * 0.35;
  });

  const sats = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        angle: (i / 6) * Math.PI * 2,
        radius: 1.6 + (i % 3) * 0.2,
        speed: 0.4 + i * 0.08,
        axis: i % 2 === 0 ? 'y' : 'x',
      })),
    [],
  );

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#2563EB"
            wireframe
            emissive="#2563EB"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh ref={ringA} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.45, 0.015, 8, 64]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.7} />
        </mesh>
        <mesh ref={ringB} rotation={[0.3, Math.PI / 3, 0]}>
          <torusGeometry args={[1.7, 0.012, 8, 64]} />
          <meshBasicMaterial color="#4F46E5" transparent opacity={0.55} />
        </mesh>
        {sats.map((s, i) => (
          <Satellite key={i} {...s} />
        ))}
      </group>
    </Float>
  );
}

function Satellite({ angle, radius, speed, axis }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + angle;
    if (!ref.current) return;
    if (axis === 'y') {
      ref.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t * 0.6) * 0.3,
        Math.sin(t) * radius,
      );
    } else {
      ref.current.position.set(
        Math.sin(t) * 0.3,
        Math.cos(t) * radius,
        Math.sin(t) * radius,
      );
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.8} />
    </mesh>
  );
}

export function HeroSceneCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="h-72 w-full md:h-[28rem]">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#60A5FA" />
        <Orb mouse={mouse} />
      </Canvas>
    </div>
  );
}
