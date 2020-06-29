import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 80%;
    background-color: white;
    color: black;
    border-radius: 15px;
    padding: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Landing = () => {
    // TODO whole Landing page / routing
    return (
        <Wrapper>
            <h2>Welcome to Listify!</h2>
        </Wrapper>
    );
};

export default Landing;
