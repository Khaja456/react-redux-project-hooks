import React from "react";
import { Route } from "react-router-dom";

import { history } from '../Utils';

export function PrivateRoute({ component: Component, roles, ...rest }) {
    return (
        <Route {...rest} element={props => {
            if (!localStorage.getItem('user')) {
                history.push("/login");
            }
            return <Component {...props} />
        }} />
    )
};
