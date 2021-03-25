import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { auth } from './utils/firesbase';
import DashboardView from './views/DashboardView';
import LoginView from './views/LoginView';

export default function AppRouter() {

  const [session, setSession] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ? setSession(user) : setSession(null);
    })
  }, [])

  return session !== false ? (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginView session={session} />
        </Route>
        <Route exact path="/dashboard">
          <DashboardView session={session} />
        </Route>

        <Redirect to="/login" />
      </Switch>
    </Router>
  ) : <span>Cargando...</span>
}
