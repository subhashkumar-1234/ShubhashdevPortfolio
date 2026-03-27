import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function NetworkNodes({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const frameSkip = useRef(0);

  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("hsl(190, 90%, 50%)");
    const purple = new THREE.Color("hsl(270, 80%, 60%)");
    const teal = new THREE.Color("hsl(160, 70%, 45%)");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
      const c = [cyan, purple, teal][Math.floor(Math.random() * 3)];
      const mixed = new THREE.Color().lerpColors(c, new THREE.Color("hsl(220, 60%, 50%)"), Math.random() * 0.3);
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, vel, col];
  }, [count]);

  const lineGeometry = useMemo(() => {
    const maxLines = count * 4;
    const linePos = new Float32Array(maxLines * 6);
    const lineCol = new Float32Array(maxLines * 6);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    // Animate particles every frame
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      posArray[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.001;
      posArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.15) * 0.001;
      posArray[i3 + 2] += velocities[i3 + 2];
      if (Math.abs(posArray[i3]) > 8) velocities[i3] *= -1;
      if (Math.abs(posArray[i3 + 1]) > 5) velocities[i3 + 1] *= -1;
      if (Math.abs(posArray[i3 + 2] + 2) > 4) velocities[i3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // Update lines every 3rd frame for performance
    frameSkip.current++;
    if (frameSkip.current % 3 === 0) {
      const linePosAttr = lineGeometry.attributes.position;
      const lineColAttr = lineGeometry.attributes.color;
      const linePos = linePosAttr.array as Float32Array;
      const lineCol = lineColAttr.array as Float32Array;
      let lineIdx = 0;
      const maxDist = 2.5;
      const maxLines = count * 4;

      for (let i = 0; i < count && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < count && lineIdx < maxLines; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDist * maxDist) {
            const alpha = 1 - Math.sqrt(distSq) / maxDist;
            const li = lineIdx * 6;
            linePos[li] = posArray[i * 3];
            linePos[li + 1] = posArray[i * 3 + 1];
            linePos[li + 2] = posArray[i * 3 + 2];
            linePos[li + 3] = posArray[j * 3];
            linePos[li + 4] = posArray[j * 3 + 1];
            linePos[li + 5] = posArray[j * 3 + 2];
            lineCol[li] = 0.2 * alpha;
            lineCol[li + 1] = 0.7 * alpha;
            lineCol[li + 2] = 0.9 * alpha;
            lineCol[li + 3] = 0.5 * alpha;
            lineCol[li + 4] = 0.3 * alpha;
            lineCol[li + 5] = 0.8 * alpha;
            lineIdx++;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIdx * 2);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
    }

    pointsRef.current.rotation.y = time * 0.015;
    linesRef.current.rotation.y = time * 0.015;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </>
  );
}

function GlowOrbs({ count }: { count: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const orbs = useMemo(() => {
    const colors = ["hsl(190, 90%, 50%)", "hsl(270, 80%, 60%)", "hsl(160, 70%, 45%)", "hsl(220, 80%, 55%)", "hsl(300, 60%, 50%)"];
    return Array.from({ length: count }, (_, i) => ({
      position: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, -3 - Math.random() * 4] as [number, number, number],
      scale: 0.5 + Math.random() * 1.2,
      speed: 0.2 + Math.random() * 0.5,
      color: colors[i % colors.length],
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const orb = orbs[i];
      child.position.x = orb.position[0] + Math.sin(time * orb.speed + i) * 1.5;
      child.position.y = orb.position[1] + Math.cos(time * orb.speed * 0.7 + i * 2) * 1;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.scale, count > 3 ? 16 : 8, count > 3 ? 16 : 8]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.04} />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        frameloop={isMobile ? "demand" : "always"}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 8, 20]} />
        <NetworkNodes count={isMobile ? 50 : 120} />
        <GlowOrbs count={isMobile ? 3 : 5} />
        {isMobile && <MobileFrameDriver />}
      </Canvas>
    </div>
  );
}

function MobileFrameDriver() {
  const { invalidate } = useThree();
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const loop = () => {
      invalidate();
      id = setTimeout(loop, 33); // ~30fps
    };
    loop();
    return () => clearTimeout(id);
  }, [invalidate]);
  return null;
}
