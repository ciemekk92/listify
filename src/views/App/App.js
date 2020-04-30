import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from '../../routes/routes';
import Layout from '../../templates/Layout/Layout';
import './App.css';

const Landing = lazy(() => import('../Landing/Landing'));
const List = lazy(() => import('../List/List'));

const App = () => {
  const { landing, list } = routes;
  return (
    <Router>
      <Layout>
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
