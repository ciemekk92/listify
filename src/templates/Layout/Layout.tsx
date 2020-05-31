import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { Header, MainLoggedIn, Wrapper } from './Layout.styled';
import LoginButton from '../../components/Login/LoginButton/LoginButton';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../../views/Login/Login';

type LayoutProps = {
    user: any;
};

const Layout: React.FC<LayoutProps> = (props) => {
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
            <Modal open={openModal} modalClosed={closeLogin}>
                <Login type={authType} modalClosed={closeLogin} />
            </Modal>
            <MainLoggedIn>
                <Header>
                    {props.user ? (
                        <LoginButton login={false} clicked={handleSignOut}>
                            Logout
                        </LoginButton>
                    ) : (
                        <>
                            <LoginButton login clicked={openLogin}>
                                Login
                            </LoginButton>
                            <LoginButton login={false} clicked={openSignUp}>
                                Sign up
                            </LoginButton>
                        </>
                    )}
                </Header>
                {props.children}
            </MainLoggedIn>
        </Wrapper>
    );
};

export default Layout;
