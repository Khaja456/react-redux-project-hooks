import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../ReduxActions';

export default function Login() {
    const [feilds, setFields] = useState({ usename: '', password: '' });
    const [isSubmitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    const { authenticationResponse: { loggingIn } } = useSelector(state => state);

    const { username, password } = feilds;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields(feilds => ({ ...feilds, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (username && password) {
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    };

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User Name</label>
                    <input  className={'form-control' + (isSubmitted && !username ? ' is-invalid' : '')} type="text" name="username" value={username} onChange={handleChange} />
                    {isSubmitted && !username &&
                        <div className="invalid-feedback"> User name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className={'form-control' + (isSubmitted && !password ? ' is-invalid' : '')} type="password" name="password" value={password} onChange={handleChange} />
                    {isSubmitted && !password &&
                        <div className="invalid-feedback"> Password is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <Link to="/signup" className="btn btn-link">Register</Link>
                </div>
            </form>
        </div>
    )
}