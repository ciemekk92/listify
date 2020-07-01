import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { auth, createUserDoc } from '../../firebase/firebase';
import LoginInput from '../../components/Login/LoginInput/LoginInput';
import ModalButton from '../../components/UI/ModalButton/ModalButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject } from '../../shared/utility';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Login = (props: { type: string; modalClosed(): void }) => {
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { type } = props;

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const updatedData = updateObject(authData, {
            [target.name]: target.value
        });
        setAuthData(updatedData);
    };

    const history = useHistory();

    const handleSignIn = async (
        event: React.SyntheticEvent,
        email: string,
        password: string
    ) => {
        setLoading(true);
        event.preventDefault();
        await auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                if (response.user) {
                    localStorage.setItem('currentUser', response.user.uid);
                } else {
                    alert(
                        'Oops! Something went wrong! Try refreshing the page.'
                    );
                }
                setLoading(false);
                handleCancel();
                history.push('/list');
            })
            .catch((error) => {
                setLoading(false);
                alert(
                    `Your email or password is incorrect, please check your data, ${error}`
                );
            });
    };

    const handleSignUp = async (
        event: React.SyntheticEvent,
        email: string,
        password: string
    ) => {
        setLoading(true);
        event.preventDefault();
        const { user }: any = await auth
            .createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                alert(
                    `Your email or password is incorrect, please check your data, ${error}`
                );
            });
        await createUserDoc(user, email).then((e) => {
            setLoading(false);
            handleCancel();
            history.push('/list');
        });
    };

    const handleCancel = () => {
        props.modalClosed();
    };

    return loading ? (
        <Spinner />
    ) : (
        <>
            <LoginInput
                name="email"
                type="email"
                changed={(event: React.ChangeEvent) =>
                    inputChangedHandler(event)
                }
                value={authData.email}
            />
            <LoginInput
                name="password"
                type="password"
                changed={(event: React.ChangeEvent) =>
                    inputChangedHandler(event)
                }
                value={authData.password}
            />
            <Wrapper>
                <ModalButton
                    clicked={
                        type === 'login'
                            ? (event: React.SyntheticEvent) =>
                                  handleSignIn(
                                      event,
                                      authData.email,
                                      authData.password
                                  )
                            : (event: React.SyntheticEvent) =>
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
