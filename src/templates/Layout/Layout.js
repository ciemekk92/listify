import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LoginButton from '../../components/LoginButton/LoginButton';

const Header = styled.div`
  width: 100%;
  height: 5%;
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 20% auto 10% 10%;
`;

const LogoPlaceholder = styled.h1`
  grid-column-start: 2;
  grid-column-end: auto;
  place-self: center;
`;

const Main = styled.main`
  min-height: 100vh;
  background: rgb(240, 138, 93);
  background: radial-gradient(
    circle,
    rgba(240, 138, 93, 1) 0%,
    rgba(249, 237, 105, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Layout = (props) => {
  return (
    <Main>
      <Header>
        <LogoPlaceholder>TODOIST!</LogoPlaceholder>
        <LoginButton login>Login</LoginButton>
        <LoginButton>Signup</LoginButton>
      </Header>
      {props.children}
    </Main>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
