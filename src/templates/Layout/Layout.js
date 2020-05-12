import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { Header, LogoPlaceholder, Main } from './Layout.styled';
import PropTypes from 'prop-types';
import LoginButton from '../../components/Login/LoginButton/LoginButton';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../../views/Login/Login';

const Layout = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [authType, setAuthType] = useState('login');

    const openLogin = () => {
        setOpenModal(true);
        setAuthType('login');
    };

    const openSignup = () => {
        setOpenModal(true);
        setAuthType('signup');
    };

    const closeLogin = () => {
        setOpenModal(false);
    };

    const handleSignOut = () => auth.signOut();

    return (
        <Main>
            <Modal open={openModal} modalClosed={closeLogin}>
                <Login type={authType} modalClosed={closeLogin} />
            </Modal>
            <Header>
                <LogoPlaceholder>Listify</LogoPlaceholder>
                {props.user ? (
                    <LoginButton clicked={handleSignOut}>Log out</LoginButton>
                ) : (
                    <>
                        <LoginButton login clicked={openLogin}>
                            Login
                        </LoginButton>
                        <LoginButton clicked={openSignup}>Signup</LoginButton>
                    </>
                )}
            </Header>
            {props.children}
        </Main>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;
