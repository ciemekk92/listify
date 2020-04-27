import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Header = styled.div`
  width: 100%;
  height: 5%;
  text-align: center;
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
        <h1>TODOIST!</h1>
      </Header>
      {props.children}
    </Main>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
