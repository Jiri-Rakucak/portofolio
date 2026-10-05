import { Canvas, useThree } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Atom} from "./Atom";
import styled from "styled-components";
import { useLayoutEffect, type RefObject } from 'react';
import { PerspectiveCamera } from 'three';
import { frameHeroCamera } from './heroCamera';
import HeroPointerRotation from './HeroPointerRotation';

const Container = styled.div<{ $immersive: boolean }>`
    height: ${({ $immersive }) => $immersive ? '100%' : '550px'};
    width: 100%;
    max-width: ${({ $immersive }) => $immersive ? 'none' : '1000px'};
    margin: 0 auto;
`;

const StyledCanvas = styled(Canvas)`
    background-color: ${({theme}) => theme.colors.background};
    width: 100%;
    height: 100%;
`;

function HeroCamera() {
    const { camera, size } = useThree();

    useLayoutEffect(() => {
        if (!(camera instanceof PerspectiveCamera)) return;
        frameHeroCamera(camera, size.width, size.height);
        return () => camera.clearViewOffset();
    }, [camera, size.width, size.height]);

    return null;
}

type AtomSceneProps = {
    layout?: 'window' | 'hero';
    pointerSource?: RefObject<HTMLElement | null>;
};

const AtomScene = ({ layout = 'window', pointerSource }: AtomSceneProps) => {
    const immersive = layout === 'hero';
    return (
        <Container $immersive={immersive}>
            <StyledCanvas camera={{position: [0, 0, immersive ? 12 : 10]}} fallback={immersive ? null : undefined}>
                {immersive && <HeroCamera />}
                <ambientLight intensity={.5} />
                <pointLight position={[10, 10, 10]} />
                {immersive ? (
                    <HeroPointerRotation pointerSource={pointerSource}><Atom /></HeroPointerRotation>
                ) : (
                    <>
                        <Atom />
                        <OrbitControls enableZoom={false} enablePan />
                    </>
                )}
            </StyledCanvas>
        </Container>
    )
}

export default AtomScene;
