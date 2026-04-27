import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Atom} from "./Atom";
import styled from "styled-components";

const Container = styled.div`
    height: 550px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
`;

const StyledCanvas = styled(Canvas)`
    background-color: ${({theme}) => theme.colors.background};
    width: 100%;
    height: 100%;
`;

const AtomScene = () => {
    return (
        <Container>
            <StyledCanvas camera={{position: [0, 0, 10]}}>
                <ambientLight intensity={.5} />
                <pointLight position={[10, 10, 10]} />
                <Atom/>
                <OrbitControls enableZoom={false} />
            </StyledCanvas>
        </Container>
    )
}

export default AtomScene;