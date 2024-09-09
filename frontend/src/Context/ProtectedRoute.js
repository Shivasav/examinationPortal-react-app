import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "./AppContext";

export class ProtectedRoute extends React.Component {
  static contextType = AppContext;
  render() {
    return this.context.isAuthenticated ? (
      <Route
        path={this.props.path}
        component={this.props.component}
        exact={this.props.exact}
      />
    ) : (
      <Redirect to={{ pathName: "/", state: { from: this.props.location } }} />
    );
  }
}
export default ProtectedRoute;
