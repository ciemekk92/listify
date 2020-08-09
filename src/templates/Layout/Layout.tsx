import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import {
    Header,
    HeaderLogo,
    LoginContainer,
    Logo,
    MainLoggedIn,
    MainNotLoggedIn,
    Wrapper
} from './Layout.styled';
import LoginButton from '../../components/Login/LoginButton/LoginButton';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../../views/Login/Login';
import logoLarge from '../../assets/logo_large.png';
import logo from '../../assets/logo.png';

type LayoutProps = {
    user: any;
};

const Layout: React.FC<LayoutProps> = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [authType, setAuthType] = useState('login');

    const { user } = props;

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

    const header = (
        <Header loggedIn={!!user}>
            {user ? (
                <HeaderLogo>
                    <img src={logo} alt={'Logo'} />
                </HeaderLogo>
            ) : null}
            <LoginContainer>
                {user ? (
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
            </LoginContainer>
            {user ? null : (
                <Logo>
                    <img src={logoLarge} alt={'Logo'} />
                </Logo>
            )}
        </Header>
    );

    return (
        <Wrapper loggedIn={!!user}>
            <Modal open={openModal} modalClosed={closeLogin}>
                <Login type={authType} modalClosed={closeLogin} />
            </Modal>
            {header}
            {user ? (
                <MainLoggedIn loggedIn={!!user}>{props.children}</MainLoggedIn>
            ) : (
                <MainNotLoggedIn>{props.children}</MainNotLoggedIn>
            )}
        </Wrapper>
    );
};

export default Layout;
