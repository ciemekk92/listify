import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { routes } from '../../routes/routes';
import Layout from '../../templates/Layout/Layout';
import { auth } from '../../firebase/firebase';
import Details from '../../views/Details/Details';

const Landing = lazy(() => import('../Landing/Landing'));
const List = lazy(() => import('../List/List'));

const App = (props) => {
    const { onGettingUserInfo } = props;
    const [currentUser, setCurrentUser] = useState(null);

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
                console.log(error);
            }
        };
        fetchInfo();
    }, [onGettingUserInfo, currentUser]);

    const { landing, list } = routes;
    return (
        <Router>
            <Layout user={currentUser} right={<Details />}>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onGettingUserInfo: () => dispatch(actions.initUserInfo())
    };
};

export default connect(null, mapDispatchToProps)(React.memo(App));
