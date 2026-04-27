import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Text from '../Components/Shared/Typography';
import Page404Image from '../Components/Desktop/Page404Image';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px); /* Odečteme přibližnou výšku headeru, aby to bylo přesně na viewport */
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 2rem;
`;

const Textarea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
`;

const Message = styled(Text)`
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 600px;
  margin-bottom: 3rem;
`;

const BackButton = styled(Link)`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const Page404: React.FC = () => {
  return (
    <Container>
      <Page404Image />
      <Textarea>
        <Text variant="h2">
          Page Not Found
        </Text>
        
        <Message variant="bodyL">
          Oops! It seems like you've ventured into the void. 
          The page you are looking for doesn't exist or has been moved.
          Click anywhere to return home.
        </Message>
      </Textarea>

      <BackButton to="/">
        Return Home
      </BackButton>
    </Container>
  );
};

export default Page404;