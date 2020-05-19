import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import {
    Header,
    LogoPlaceholder,
    MainLoggedIn,
    MainLeft,
    MainRight,
    Sidebar,
    Wrapper
} from './Layout.styled';
import PropTypes from 'prop-types';
import LoginButton from '../../components/Login/LoginButton/LoginButton';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../../views/Login/Login';
import Divider from '../../components/UI/Sidebar/Divider/Divider';
import AddNewList from '../../components/UI/Sidebar/NewList/AddNewList';

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
        <Wrapper>
            <Sidebar>
                <LogoPlaceholder>Listify</LogoPlaceholder>
                <Divider />
                <AddNewList />
            </Sidebar>
            <MainLoggedIn>
                <Modal open={openModal} modalClosed={closeLogin}>
                    <Login type={authType} modalClosed={closeLogin} />
                </Modal>
                <Header>
                    {props.user ? (
                        <LoginButton clicked={handleSignOut}>
                            Log out
                        </LoginButton>
                    ) : (
                        <>
                            <LoginButton login clicked={openLogin}>
                                Login
                            </LoginButton>
                            <LoginButton clicked={openSignup}>
                                Signup
                            </LoginButton>
                        </>
                    )}
                </Header>
                <MainLeft>{props.children}</MainLeft>
                <MainRight>Lul.</MainRight>
            </MainLoggedIn>
        </Wrapper>
    );
};

Layout.propTypes = {
    children: PropTypes.element.isRequired
};

export default Layout;
