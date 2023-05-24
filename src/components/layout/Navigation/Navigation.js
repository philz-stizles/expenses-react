import React from "react";
import AuthContext from "../../../store/context/auth-context";
import "./Navigation.css";

const Navigation = () => {
  return (
    <AuthContext.Consumer>
      {(authContext) => (
        <nav className="nav">
          <h3>Task</h3>
          <ul>
            {authContext.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {authContext.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
          </ul>
          <ul>
            {!authContext.isLoggedIn && (
              <li>
                <a href="/">Login</a>
              </li>
            )}
            {authContext.isLoggedIn && (
              <li>
                <button onClick={authContext.logout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </AuthContext.Consumer>
  );
};

export default Navigation;
