import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../store/actions/index';
import { routes } from '../../routes/routes';
import Layout from '../../templates/Layout/Layout';
import { auth } from '../../firebase/firebase';

const Landing = lazy(() => import('../Landing/Landing'));
const List = lazy(() => import('../List/List'));

const App = (props: PropsFromRedux) => {
    const { onGettingUserInfo } = props;
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                // @ts-ignore
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
                console.log(error);
            }
        };
        fetchInfo();
    }, [onGettingUserInfo, currentUser]);

    const { landing, list } = routes;
    return (
        <Router>
            <Layout user={currentUser}>
                <Suspense fallback={'Loading...'}>
                    <Switch>
                        <Route exact path={landing} component={Landing} />
                        <Route exact path={list} component={List} />
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
