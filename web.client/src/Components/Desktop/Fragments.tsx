import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from 'styled-components';
import { advanceAtomParticle, createAtomParticles, orbitRadii, trailLength } from './atomParticles';

const tempObject = new THREE.Object3D();
const showOrbits = false;

export const Fragments = ({ animated = true }: { animated?: boolean }) => {
    const ref = useRef<THREE.InstancedMesh>(null!);
    const trailRef = useRef<THREE.InstancedMesh>(null!);

    const theme = useTheme();
    
    const particles = useMemo(() => createAtomParticles(), []);
    const totalElectrons = particles.length;

    useFrame((_, delta) => {
        if (!ref.current || !trailRef.current) return;

        particles.forEach((particle, i) => {
            if (animated) advanceAtomParticle(particle, delta);

            tempObject.position.copy(particle.trail[0]);
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
