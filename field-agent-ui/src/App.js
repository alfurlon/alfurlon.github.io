import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ViewAgents from "./Agent/ViewAgents";
import ViewSecurityClearance from './SecurityClearance/ViewSecurityClearance';
import './App.css';
import Login from "./Login";
import NotFound from './NotFound';
import ConfirmDelete from './Agent/ConfirmDelete';
import AgentForm from './Agent/AgentForm';
import AuthContext from './AuthContext';
import NavBar from './NavBar';

function App() {

  const [user, setUser] = useState({ username: "" });

  const login = (token) => {
    const decodedToken = jwt_decode(token);

    const nextUser = { ...user};
    nextUser.username = decodedToken.sub;
    nextUser.roles = decodedToken.authorities.split(",");
    nextUser.token = token;

    localStorage.setItem("token", token);

    setUser(nextUser);
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ username: "" });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      login(token);
    }
  }, []);

  const auth = {
    user,
    login,
    logout
  }

  // "username": "john@smith.com",
  // "password": P@ssw0rd!


  return (<>
    <div className="container">
      <AuthContext.Provider value={auth}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/agent">
              {auth.user.username ? <ViewAgents /> : <Redirect to="/login" />}
            </Route>
            {/* <Route path="/sec">
              <ViewSecurityClearance />
            </Route> */}
            <Route path="/login">
              <Login />
            </Route>
            <Route path={["/agent/edit/:id", "/agent/add"]}>
              {auth.user.username ? <AgentForm /> : <Redirect to="/login" />}
            </Route>
            <Route path="/agent/delete/:id">
              {auth.user.username ? <ConfirmDelete /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/">
              <div className="row justify-content-center">
                <div className="col-6">
                    <h1 className="display-1">Welcome to Field Agents</h1>
                </div>
                </div>
                <div className="row justify-content-evenly">
                <div className="col-3">
                    <Link className="btn btn-dark" to="/agent">Agents</Link>
                </div>
                {/* <div className="col-3">
                    <Link className="btn btn-dark" to="/sec">Security Clearances</Link>
                </div> */}
              </div>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  </>
  );
}

export default App;
