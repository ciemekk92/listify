import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Button';

const Wrapper = styled.div`
  width: 80%;
  background-color: white;
  color: black;
  border-radius: 15px;
  padding: 1%;
`;

const Landing = () => {
  return (
    <Wrapper>
      <h2>Welcomse to TODOIST!</h2>
      <Button>LOGIN</Button>
    </Wrapper>
  );
};

export default Landing;
