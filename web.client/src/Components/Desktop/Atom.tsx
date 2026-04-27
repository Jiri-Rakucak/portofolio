import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, a } from '@react-spring/three'
import {Fragments} from "./Fragments"

export const Atom = () => {
    const groupRef = useRef<THREE.Group>(null!);

    const [{rotationSpeed}, api] = useSpring(() => ({
        rotationSpeed: 0.005, // velmi pomalá rotace
        config: { mass: 1, tension: 280, friction: 60 }
    }));

    useFrame((state, delta) => {
        if(groupRef.current) {
            groupRef.current.rotation.y += delta * rotationSpeed.get();
            groupRef.current.rotation.x += delta * rotationSpeed.get() * 0.3; // ještě pomalejší rotace kolem X
        }
    });

    const handleClick = () => {
        api.start({
            from: {rotationSpeed: 0.5 },
            to: { rotationSpeed: 0.005 },
        });
    };

    return (
        <a.group 
            ref={groupRef} 
            onClick={handleClick}
            rotation={[0.9, 0.3, 0]} // počáteční natočení
        >
            <Fragments />
        </a.group>
    )
}