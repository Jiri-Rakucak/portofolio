import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, a } from '@react-spring/three'
import {Fragments} from "./Fragments"
import { boundedFrameDelta } from './atomParticles';

export const Atom = ({ animated = true }: { animated?: boolean }) => {
    const groupRef = useRef<THREE.Group>(null!);

    const [{rotationSpeed}, api] = useSpring(() => ({
        rotationSpeed: 0.005,
        config: { mass: 1, tension: 280, friction: 60 }
    }));

    useEffect(() => {
        if (!animated) {
            api.stop();
            api.set({ rotationSpeed: 0.005 });
        }
    }, [animated, api]);

    useFrame((_, delta) => {
        if(animated && groupRef.current) {
            const step = boundedFrameDelta(delta);
            groupRef.current.rotation.y += step * rotationSpeed.get();
            groupRef.current.rotation.x += step * rotationSpeed.get() * 0.3;
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
            onClick={animated ? handleClick : undefined}
            rotation={[0.9, 0.3, 0]}
        >
            <Fragments animated={animated} />
        </a.group>
    )
}
