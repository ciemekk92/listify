import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, createUserDoc } from '../../firebase/firebase';
import LoginInput from '../../components/Login/LoginInput/LoginInput';
import ModalButton from '../../components/UI/ModalButton/ModalButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import { alertError, updateObject } from '../../shared/utility';
import { Warning, Wrapper } from './Login.styled';

const Login = (props: { type: string; modalClosed(): void }) => {
    const [authData, setAuthData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState('');
    const { type, modalClosed } = props;

    const validateEmail = (email: string) => {
        const pattern = /\S+@\S+\.\S+/;
        return pattern.test(email.toLowerCase());
    };

    const inputChangedHandler = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const updatedData = updateObject(authData, {
            [target.name]: target.value
        });
        if (target.name === 'email') {
            if (!validateEmail(target.value)) {
                if (warning === '') {
                    setWarning('Please enter a valid email address');
                }
            } else {
                setWarning('');
            }
        }
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
                    alertError('');
                }
                setLoading(false);
                modalClosed();
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
        await createUserDoc(user, email).then(() => {
            setLoading(false);
            modalClosed();
            history.push('/list');
        });
    };

    return loading ? (
        <Spinner />
    ) : (
        <>
            {warning !== '' ? <Warning>{warning}</Warning> : null}
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
                <ModalButton clicked={modalClosed}>Cancel</ModalButton>
            </Wrapper>
        </>
    );
};

export default Login;
