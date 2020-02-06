import React from 'react';
import { Switch, Route } from 'react-router';
import ROUTES from './constants/routes.json';
import Welcome from './pages/welcome/welcome';
import Main from './pages/main/main';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={ROUTES.WELCOME} component={Welcome} />
        <Route path={ROUTES.MAIN} component={Main} />
      </Switch>
    );
  }
}

export default Routes;
