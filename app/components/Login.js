'use strict'

import React from 'react';
import { Link, browserHistory } from 'react-router';
import {login} from '../action-creators/login';

const Login = ({ login }) => {

  return (
        <div className="section no-pad-bot" id="index-banner">
            <div className="row">
                <div className="col m5 s10 offset-m7 offset-s2">
                    <div className="card grey lighten-5">
                        <div className="card-content" id="mainSet">
                            <p className="card-title">Please sign in:</p>
                            <form onSubmit={evt => {
                                    evt.preventDefault();
                                    login(evt.target.username.value, evt.target.password.value);
                                    browserHistory.push('/');

                                    
                                }}>
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
