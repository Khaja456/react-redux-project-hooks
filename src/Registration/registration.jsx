import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { userActions } from '../ReduxActions'

export default function Registration() {
    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    const { firstName, lastName, username, password } = fields;
    const [submitted, setSubmitted] = useState(false);

    const { registrationResponse: { registering } } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields(fields => ({
            ...fields,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

        const allFieldsValues = Object.values(fields);
        const fieldValuesNotEmpty = allFieldsValues.every(eachFieldValue => eachFieldValue !== '');
        if (fieldValuesNotEmpty) {
            dispatch(userActions.register(fields));
        }
    };

    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={firstName} onChange={handleChange} className={'form-control' + (submitted && !firstName ? ' is-invalid' : '')} />
                    <CheckError submitted={submitted} fieldValue={firstName} fieldName={'First Name'} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={handleChange} className={'form-control' + (submitted && !lastName ? ' is-invalid' : '')} />
                    <CheckError submitted={submitted} fieldValue={lastName} fieldName={'Last Name'} />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    <CheckError submitted={submitted} fieldValue={username} fieldName={'Username'} />
                </div>
                <div className="form-group">
                    <label>Pasword</label>
                    <input type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    <CheckError submitted={submitted} fieldValue={password} fieldName={'Password'} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/login" className="btn btn-link">Login</Link>
                </div>
            </form>
        </div>
    )
}

function CheckError({ submitted, fieldValue, fieldName }) {
    return (
        <div>
            {submitted && !fieldValue &&
                <div className="invalid-feedback">`${fieldName} is required`</div>
            }
        </div>
    )
};