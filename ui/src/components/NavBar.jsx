import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function NavBar({children, name}){
    let [status, setStatus] = useState(0);
    let [session, setSession] = useState(false);
    let showOptions = name==='List' || name==='SearchList' || name === 'SpecificList';

    useEffect(() => {
        axios({
            url: '/api/checkSession',
            method: 'GET'})
            .then(response => {
                if(response.status === 200)
                {
                    console.log(response)
                    if(response.data.msg === 'authenticated')
                    {
                        setSession(true)
                    }
                    
                    if(response.data.msg === 'not authenticated')
                    {
                        setSession(false)
                    }
                }
        })
        .catch(error => console.log(error.message));
    }, []);

    function HandleLogout()
    {
        axios({
            url: '/api/logout',
            method: 'POST'})
            .then(response => {
                response.status === 200 && setStatus(200) && setSession(false)
                // console.log(response)
            })
            .catch(error => console.log(error.message));
    }
    
    return (
        <div>
        {status === 200 && <Redirect to='/login' />}
        <nav className="navbar navbar-expand-lg navbar-dark nav-bg-color">
            <a className="navbar-brand" href="/">To Do</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                {showOptions && <li className="nav-item active">
                    <a className="nav-link" href="/list">Today's List</a>
                </li>}
                {!showOptions && <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>}
                {!showOptions && <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>}
                {showOptions && <li className="nav-item">
                    <a className="nav-link" href="/specificList">Go to Date</a>
                </li>}
                {showOptions && <li className="nav-item">
                    <a className="nav-link" href="/searchList">Search a List</a>
                </li>}
                </ul>
                {showOptions && <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item" onClick={() => HandleLogout()}>
                        <span className="nav-link active"
                        id= "logout_button"
                        style={{cursor:'pointer'}}
                        >Logout</span>
                    </li>
                </ul>}
                
            </div>
            </nav>
            {children}
            </div>
    )
}

export default NavBar;