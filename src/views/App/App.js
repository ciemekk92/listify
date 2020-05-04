import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../../routes/routes';
import Layout from '../../templates/Layout/Layout';
import './App.css';
import { auth } from '../../firebase/firebase';

const Landing = lazy(() => import('../Landing/Landing'));
const List = lazy(() => import('../List/List'));

const App = () => {
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

export default App;
