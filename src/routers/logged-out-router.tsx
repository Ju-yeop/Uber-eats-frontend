import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => (
  <div>
    <h1>Logged out</h1>
    <button onClick={() => isLoggedInVar(true)}>Log In</button>
  </div>
);
