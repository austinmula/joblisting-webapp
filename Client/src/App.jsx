import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./subroute/Home";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/sign-in">
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/sign-up">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/thefreelancer" component={Home}>
            {!user && <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
