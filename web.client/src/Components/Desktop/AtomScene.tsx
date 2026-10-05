import { Canvas, useThree } from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Atom} from "./Atom";
import styled from "styled-components";
import { useLayoutEffect } from 'react';
import { PerspectiveCamera } from 'three';
import { frameHeroCamera } from './heroCamera';

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

const AtomScene = ({ layout = 'window' }: { layout?: 'window' | 'hero' }) => {
    const immersive = layout === 'hero';
    return (
        <Container $immersive={immersive}>
            <StyledCanvas camera={{position: [0, 0, immersive ? 12 : 10]}} fallback={immersive ? null : undefined}>
                {immersive && <HeroCamera />}
                <ambientLight intensity={.5} />
                <pointLight position={[10, 10, 10]} />
                <Atom/>
                <OrbitControls enableZoom={false} enablePan={!immersive} />
            </StyledCanvas>
        </Container>
    )
}

export default AtomScene;
