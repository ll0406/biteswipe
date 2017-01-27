'use strict'

import React from 'react';
import { Link, browserHistory } from 'react-router';

const Login = ({ login, oauth }) => {

  return (
        <div className="section no-pad-bot" id="index-banner">
            <div className="row">
                <div className="col m5 s10 offset-m7 offset-s2">
                    <div className="card grey lighten-5">
                        <div className="card-content" id="mainSet">
                            <form action="/api/auth/google/login" method="post">
                                <button className="waves-effect waves-light btn red" type="submit">Google
                                  <i className="right mdi mdi-google"></i>
                                </button>
                            </form>
                            <form onSubmit={evt => {
                                    evt.preventDefault();
                                    login(evt.target.username.value, evt.target.password.value);
                                    browserHistory.push('/');
                                }}>
                                <input placeholder="bob@example.com" name="username" />
                                <input placeholder="Password" name="password" type="password" />
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
