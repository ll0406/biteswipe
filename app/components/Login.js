'use strict'

import React from 'react';
import { Link, browserHistory } from 'react-router';
import {login} from '../action-creators/login';

const Login = ({ login }) => {

    return (
        <div className="container">
            <div className="row">
            </div>
            <div className="row">
                <div className="col s6 offset-s3 center">
                    <div className="card grey lighten-5">
                        <div className="card-content" id="mainSet">
                            <p className="card-title">Please sign in:</p>
                            <form method="POST" action="/api/auth/google" target="_self">
                                <input placeholder="bob@example.com" name="username" />
                                <label htmlFor="username" className="left">Username</label>
                                <input placeholder="Password" name="password" type="password" />
                                <label htmlFor="password" className="left">Password</label>
                                <input className="waves-effect waves-light btn" type="submit" value="Login" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
