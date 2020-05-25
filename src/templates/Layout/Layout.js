import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import {
    Header,
    MainLoggedIn,
    MainLeft,
    MainRight,
    Wrapper
} from './Layout.styled';
import PropTypes from 'prop-types';
import LoginButton from '../../components/Login/LoginButton/LoginButton';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../../views/Login/Login';
import SidebarCont from '../../containers/SidebarCont/SidebarCont';

const Layout = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [authType, setAuthType] = useState('login');

    const openLogin = () => {
        setOpenModal(true);
        setAuthType('login');
    };

    const openSignUp = () => {
        setOpenModal(true);
        setAuthType('signup');
    };

    const closeLogin = () => {
        setOpenModal(false);
    };

    const handleSignOut = () => auth.signOut();

    return (
        <Wrapper>
            <SidebarCont />
            <Modal open={openModal} modalClosed={closeLogin}>
                <Login type={authType} modalClosed={closeLogin} />
            </Modal>
            <MainLoggedIn>
                <Header>
                    {props.user ? (
                        <LoginButton clicked={handleSignOut}>
                            Logout
                        </LoginButton>
                    ) : (
                        <>
                            <LoginButton login clicked={openLogin}>
                                Login
                            </LoginButton>
                            <LoginButton clicked={openSignUp}>
                                Sign up
                            </LoginButton>
                        </>
                    )}
                </Header>
                <MainLeft>{props.children}</MainLeft>
                <MainRight>{props.right}</MainRight>
            </MainLoggedIn>
        </Wrapper>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;
