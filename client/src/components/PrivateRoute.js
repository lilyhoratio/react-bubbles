import React from "react";
import { Route, Redirect } from "react-router-dom";

// RENDER
const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log("Private route props: ", rest)

  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("token")) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;

// const ProtectedRoute = Component => props => {
//   if (localStorage.getItem("token")) {
//     return <Component {...props} />;
//   } else {
//     return <Redirect to="/" />;
//   }
// };

// export default ProtectedRoute;
