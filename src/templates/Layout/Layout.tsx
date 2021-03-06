import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
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
import { burgerContext } from '../../context/burgerContext';
import Burger from '../../components/Sidebar/Burger/Burger';

type LayoutProps = {
    user: any;
    children: any;
};

const { Provider } = burgerContext;

const Layout: React.FC<Props> = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [authType, setAuthType] = useState('login');
    const [openSidebar, setOpenSidebar] = useState(false);

    const { user, mobile } = props;

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

    const handleSidebarOpen = () => {
        setOpenSidebar(!openSidebar);
    };

    const handleSignOut = () => auth.signOut();

    const header = (
        <Header loggedIn={!!user}>
            {mobile && !!user ? (
                <Burger open={openSidebar} setOpen={handleSidebarOpen} />
            ) : null}
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
        <Provider value={{ openSidebar, handleSidebarOpen }}>
            <Wrapper loggedIn={!!user}>
                <Modal open={openModal} modalClosed={closeLogin}>
                    <Login type={authType} modalClosed={closeLogin} />
                </Modal>
                {header}
                {user ? (
                    <MainLoggedIn loggedIn={!!user}>
                        {props.children}
                    </MainLoggedIn>
                ) : (
                    <MainNotLoggedIn>{props.children}</MainNotLoggedIn>
                )}
            </Wrapper>
        </Provider>
    );
};

const mapStateToProps = (state: {
    user: {
        mobile: boolean;
    };
}) => {
    return {
        mobile: state.user.mobile
    };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & LayoutProps;

export default connector(React.memo(Layout));
