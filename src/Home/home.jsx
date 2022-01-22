import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const { authenticationResponse: { data }, allUsersResponse: { loading, error, allUsers } } = useSelector(state => state);
    debugger
    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {data?.firstName}!</h1>
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered users: {allUsers?.length}</h3>
            {loading && <em>Loading users...</em>}
            {error && <span className="text-danger">ERROR: {error}</span>}
        </div>
    )
}