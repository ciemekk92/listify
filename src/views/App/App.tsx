import React, { useState, useEffect, lazy, Suspense } from 'react';
import '../../index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../store/actions';
import { routes } from '../../routes/routes';
import Layout from '../../templates/Layout/Layout';
import { auth } from '../../firebase/firebase';
import { User } from 'firebase';
import { alertError } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner/Spinner';

const Landing = lazy(() => import('../Landing/Landing'));
const List = lazy(() => import('../List/List'));

const App = (props: PropsFromRedux) => {
    const { onGettingUserInfo } = props;
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
                localStorage.setItem('currentUser', user.uid);
            } else {
                setCurrentUser(null);
                localStorage.removeItem('currentUser');
            }
        });
    }, []);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                if (currentUser) {
                    await onGettingUserInfo();
                }
            } catch (error) {
                alertError(error);
            }
        };
        fetchInfo();
    }, [onGettingUserInfo, currentUser]);

    const { landing, list } = routes;
    return (
        <Router>
            <Layout user={currentUser}>
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        <Route exact path={landing}>
                            {currentUser ? (
                                <Redirect to={'/list'} />
                            ) : (
                                <Landing />
                            )}
                        </Route>
                        <Route
                            exact
                            path={list}
                            component={() =>
                                currentUser ? <List /> : <Redirect to={'/'} />
                            }
                        />
                    </Switch>
                </Suspense>
            </Layout>
        </Router>
    );
};

const mapDispatchToProps = {
    onGettingUserInfo: () => actions.initUserInfo()
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(React.memo(App));
