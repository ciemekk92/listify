import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import {
    Header,
    LoginContainer,
    Logo,
    MainLoggedIn,
    MainNotLoggedIn,
    Wrapper
} from './Layout.styled';
import LoginButton from '../../components/Login/LoginButton/LoginButton';
import Modal from '../../components/UI/Modal/Modal';
import Login from '../../views/Login/Login';
import logo from '../../assets/logo.png';
import logoLarge from '../../assets/logo_large.png';

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
                <LoginContainer>
                    <LoginButton login={false} clicked={handleSignOut}>
                        Logout
                    </LoginButton>
                </LoginContainer>
            ) : (
                <>
                    <LoginContainer>
                        <LoginButton login clicked={openLogin}>
                            Login
                        </LoginButton>
                        <LoginButton login={false} clicked={openSignUp}>
                            Sign up
                        </LoginButton>
                    </LoginContainer>
                    <Logo>
                        <img
                            src={logoLarge}
                            alt={'Logo'}
                            style={{ width: '30%' }}
                        />
                    </Logo>
                </>
            )}
        </Header>
    );

    return (
        <Wrapper>
            <Modal open={openModal} modalClosed={closeLogin}>
                <Login type={authType} modalClosed={closeLogin} />
            </Modal>
            {user ? (
                <MainLoggedIn loggedIn={!!user}>
                    {header}
                    {props.children}
                </MainLoggedIn>
            ) : (
                <MainNotLoggedIn>
                    {header}
                    {props.children}
                </MainNotLoggedIn>
            )}
        </Wrapper>
    );
};

export default Layout;
