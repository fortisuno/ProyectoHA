import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import DashboardView from './views/DashboardView';
import LoginView from './views/LoginView';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={ LoginView } />
        <Route exact path="/dashboard" component={ DashboardView } />

        <Redirect to="/login" />
      </Switch>
    </Router>
  )
}
