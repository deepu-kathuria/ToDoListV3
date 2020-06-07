import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Register(){

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [errorMessage, setErrorMessage] = useState(false);
    let [status, setStatus] = useState(0);

    function HandleUsername(event)
    {
        setUsername(event.target.value);
    }

    function HandlePassword(event){
        setPassword(event.target.value);
    }

    function HandleClick(event){
        event.preventDefault();
        let payload = {
            username: username,
            password: password
        }

        
        axios({
            url: '/api/register',
            method: 'POST',
            data: payload})
            .then(response => {
                response.status === 200 && setStatus(200)
                console.log(response)
            })
            .catch(error => {
                setPassword('');
                setErrorMessage(true)
                console.log(error)
            });
    }

    return (
        <div>
            <div className='box-show' id='heading'>
                <h2>Register</h2>
            </div>
            <div className="row m-0">
                {status === 200 && <Redirect to='/list' />}
                <div className="col-md-4"></div>
                <div className="col-md-4 form-border">
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" 
                                className="form-control" 
                                id="exampleInputEmail1" 
                                name="username" 
                                aria-describedby="emailHelp" 
                                required 
                                onChange={HandleUsername}
                            />
                            {/* <small className="form-text error_message"><%#error_value%></small> */}
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input 
                                type="password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                name="password" 
                                onChange={HandlePassword}
                                required 
                            />
                            {errorMessage && <small className="form-text error_message">User already Exist</small>}
                        </div>
                        <button 
                            className="btn btn-primary" 
                            onClick={HandleClick}>Register
                        </button>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    );
}

export default Register;