import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from 'styled-components';

const electronCounts = [5, 5, 5];
const orbitRadii = [5.5, 5.5, 5.5];
const tempObject = new THREE.Object3D();
const showOrbits = false;
const trailLength = 100; // délka ocasu

export const Fragments = () => {
    const ref = useRef<THREE.InstancedMesh>(null!);
    const trailRef = useRef<THREE.InstancedMesh>(null!);

    const theme = useTheme();
    
    const totalElectrons = electronCounts.reduce((sum, count) => sum + count, 0);

    const particles = useMemo(() => {
        interface ParticleData {
            t: number;
            speed: number;
            radius: number;
            orbitIndex: number;
            rotationX: number;
            rotationY: number;
            rotationZ: number;
            phase: number;
            trail: THREE.Vector3[];
        }

        const data: ParticleData[] = [];
        electronCounts.forEach((count, orbitIndex) => {
            for (let i = 0; i < count; i++) {
                const t = (i / count) * Math.PI * 2;
                const speed = 0.015 - (orbitIndex * 0.003);
                const radius = orbitRadii[orbitIndex];
                
                const rotations = [
                    [0, 0, 0],                  // XY rovina
                    [Math.PI / 2, 0, 0],        // YZ rovina
                    [0, Math.PI / 2, 0],        // XZ rovina
                ];

                data.push({ 
                    t, 
                    speed, 
                    radius,
                    orbitIndex,
                    rotationX: rotations[orbitIndex][0],
                    rotationY: rotations[orbitIndex][1],
                    rotationZ: rotations[orbitIndex][2],
                    phase: (i / count) * Math.PI * 2,
                    trail: Array(trailLength).fill(null).map(() => new THREE.Vector3())
                });
            }
        });
        return data;
    }, []);

    useFrame(() => {
        if (!ref.current || !trailRef.current) return;

        particles.forEach((particle, i) => {
            particle.t += particle.speed;

            // Základní orbitální pozice
            const x = Math.cos(particle.t + particle.phase) * particle.radius;
            const y = Math.sin(particle.t + particle.phase) * particle.radius;
            const z = 0;

            // Aplikace rotací
            const cosX = Math.cos(particle.rotationX);
            const sinX = Math.sin(particle.rotationX);
            const cosY = Math.cos(particle.rotationY);
            const sinY = Math.sin(particle.rotationY);
            const cosZ = Math.cos(particle.rotationZ);
            const sinZ = Math.sin(particle.rotationZ);

            const y1 = y * cosX - z * sinX;
            const z1 = y * sinX + z * cosX;
            
            const x2 = x * cosY + z1 * sinY;
            const z2 = -x * sinY + z1 * cosY;
            
            const x3 = x2 * cosZ - y1 * sinZ;
            const y3 = x2 * sinZ + y1 * cosZ;

            // Aktualizuj trail - posuň staré pozice
            for (let j = trailLength - 1; j > 0; j--) {
                particle.trail[j].copy(particle.trail[j - 1]);
            }
            // Nastav novou pozici
            particle.trail[0].set(x3, y3, z2);

            // Nastav hlavní elektron
            tempObject.position.set(x3, y3, z2);
            tempObject.scale.setScalar(0.8);
            tempObject.updateMatrix();
            ref.current.setMatrixAt(i, tempObject.matrix);

            // Nastav trail částice
            particle.trail.forEach((pos, j) => {
                const trailIndex = i * trailLength + j;
                const scale = (trailLength - j) / trailLength * 0.5; // menší a menší
                tempObject.position.copy(pos);
                tempObject.scale.setScalar(scale);
                tempObject.updateMatrix();
                trailRef.current.setMatrixAt(trailIndex, tempObject.matrix);
            });
        });
        
        ref.current.instanceMatrix.needsUpdate = true;
        trailRef.current.instanceMatrix.needsUpdate = true;
    });

    const colorProtons = useMemo(() => new THREE.Color(theme.colors.text), [theme.colors.text]); // Jádro (protony) = barva textu
    const colorNeutrons = useMemo(() => new THREE.Color(theme.colors.textSecondary), [theme.colors.textSecondary]); // Neutrony = sekundární text
    const colorElectrons = useMemo(() => new THREE.Color(theme.colors.accent), [theme.colors.accent]); // Elektrony = akcentová barva
    
    // Trail může být světlejší verze akcentové barvy nebo stejná
    const colorTrail = useMemo(() => new THREE.Color(theme.colors.accent), [theme.colors.accent]);


    return (
        <>
            {/* Jádro atomu */}
            <group>
                {/* Protony - červené */}
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.48, 64, 64]} />
                    <meshStandardMaterial color={colorProtons} emissive={colorProtons} emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[0.2, 0, 0]}>
                    <sphereGeometry args={[0.24, 32, 32]} />
                    <meshStandardMaterial color={colorProtons} emissive={colorProtons} emissiveIntensity={0.3} />
                </mesh>
                <mesh position={[-0.1, 0.15, 0]}>
                    <sphereGeometry args={[0.24, 32, 32]} />
                    <meshStandardMaterial color={colorProtons} emissive={colorProtons} emissiveIntensity={0.3} />
                </mesh>
                
                {/* Neutrony - šedé */}
                <mesh position={[0.1, -0.1, 0.1]}>
                    <sphereGeometry args={[0.24, 32, 32]} />
                    <meshStandardMaterial color={colorNeutrons} emissive={colorNeutrons} emissiveIntensity={0.2} />
                </mesh>
                <mesh position={[-0.15, 0, 0.1]}>
                    <sphereGeometry args={[0.24, 32, 32]} />
                    <meshStandardMaterial color={colorNeutrons} emissive={colorNeutrons} emissiveIntensity={0.2} />
                </mesh>
                <mesh position={[0, 0.1, -0.15]}>
                    <sphereGeometry args={[0.24, 32, 32]} />
                    <meshStandardMaterial color={colorNeutrons} emissive={colorNeutrons} emissiveIntensity={0.2} />
                </mesh>
            </group>

            {/* Trail - ocas elektronů */}
            <instancedMesh ref={trailRef} args={[undefined, undefined, totalElectrons * trailLength]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial 
                    color={colorTrail}
                    emissive={colorTrail}
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.6}
                />
            </instancedMesh>

            {/* Elektrony */}
            <instancedMesh ref={ref} args={[undefined, undefined, totalElectrons]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshStandardMaterial 
                    color={colorElectrons}
                    emissive={colorElectrons}
                    emissiveIntensity={0.3}
                />
            </instancedMesh>

            {/* Orbitální trajektorie */}
            {showOrbits && (
                <>
                    {orbitRadii.map((radius, index) => {
                        const rotations: [number, number, number][] = [
                            [0, 0, 0],                  // XY rovina
                            [Math.PI / 2, 0, 0],        // YZ rovina
                            [0, Math.PI / 2, 0],        // XZ rovina
                        ];
                        
                        return (
                            <mesh key={index} rotation={rotations[index]}>
                                <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
                                <meshBasicMaterial 
                                    color="#ffffff" 
                                    transparent 
                                    opacity={0.4} 
                                    side={THREE.DoubleSide}
                                />
                            </mesh>
                        );
                    })}
                </>
            )}
        </>
    )
}
