import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, createUserDoc } from '../../firebase/firebase';
import LoginInput from '../../components/LoginInput/LoginInput';
import ModalButton from '../../components/ModalButton/ModalButton';
import { updateObject } from '../../shared/utility';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Login = (props) => {
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    });
    const { type } = props;

    const inputChangedHandler = (event) => {
        const updatedData = updateObject(authData, {
            [event.target.name]: event.target.value
        });
        setAuthData(updatedData);
    };

    const handleSignIn = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            alert(
                `Your email or password is incorrect, please check your data, ${error}`
            );
        });
    };

    const handleSignUp = async (event, email, password) => {
        event.preventDefault();
        const { user } = await auth
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                alert(
                    `Your email or password is incorrect, please check your data, ${error}`
                );
            });
        await createUserDoc(user, email);
    };

    const handleCancel = () => {
        props.modalClosed();
    };

    return (
        <>
            <LoginInput
                name="email"
                type="email"
                changed={(event) => inputChangedHandler(event)}
                value={authData.email}
            />
            <LoginInput
                name="password"
                type="password"
                changed={(event) => inputChangedHandler(event)}
                value={authData.password}
            />
            <Wrapper>
                <ModalButton
                    clicked={
                        type === 'login'
                            ? (event) =>
                                  handleSignIn(
                                      event,
                                      authData.email,
                                      authData.password
                                  )
                            : (event) =>
                                  handleSignUp(
                                      event,
                                      authData.email,
                                      authData.password
                                  )
                    }
                >
                    {type === 'login' ? 'Login' : 'Sign up'}
                </ModalButton>
                <ModalButton clicked={handleCancel}>Cancel</ModalButton>
            </Wrapper>
        </>
    );
};

export default Login;
