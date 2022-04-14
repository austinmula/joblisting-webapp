import React, { useContext } from "react";
import Dashboard from "../layouts/Dashboard";
import { Switch, Route, Redirect } from "react-router-dom";
import AllPosts from "../pages/AllPosts";
import Profile from "../pages/Profile";
import SinglePost from "../pages/SinglePost";
import EmployerPosts from "../pages/EmployerPosts";
import EmployerHome from "../pages/EmployerHome";
import EmployeeHome from "../pages/EmployeeHome";
import Admin from "../pages/Admin";

import { AuthContext } from "../context/AuthContext";

const Employer = ({ match }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Switch>
        <Dashboard>
          <Route path={match.url} exact={true}>
            {user.usertype === "employee" ? (
              <EmployeeHome user={user} />
            ) : (
              <EmployerHome user={user} />
            )}
          </Route>

          <Route path={`${match.url}/posts/`} exact={true}>
            {user.usertype === "employee" ? (
              <AllPosts user={user} />
            ) : (
              <EmployerPosts user={user} />
            )}
          </Route>
          <Route path={`${match.url}/post/:id`} exact={true}>
            <SinglePost />
          </Route>
          <Route path={`${match.url}/profile/:username`} exact={true}>
            <Profile user={user} />
          </Route>
          <Route path={`${match.url}/admin`} exact={true}>
            {user.isAdmin ? <Admin user={user} /> : <Redirect to="/" />}
          </Route>
        </Dashboard>
      </Switch>
    </>
  );
};

export default Employer;
