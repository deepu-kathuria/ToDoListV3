import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Home(){
    let [loader, setLoader] = useState(true);
    let [session, setSession] = useState(false);

    useEffect(() => {
        axios({
            url: '/api/checkSession',
            method: 'GET'})
            .then(response => {
                if(response.status === 200)
                {
                    // console.log(response)
                    if(response.data.msg === 'authenticated')
                    {
                        setSession(true);
                        setTimeout(() => {
                            setLoader(false);
                        }, 1000);
                    }
                    
                    if(response.data.msg === 'not authenticated')
                    {
                        setSession(false);
                        setTimeout(() => {
                            setLoader(false);
                        }, 1000);
                    }
                }
        })
        .catch(error => console.log(error.message));
    }, []);

    return loader ? 
    (
        <div className='loader'>
            <Loader
                type="Oval"
                color="#5d32a6"
                height={30}
                width={30}
            />
        </div>
    )
    : session ? <Redirect to='/list' /> :
    (
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="container home-content">
                    <h1 className="home-text">Create your To Do List</h1>
                    <div className="home-button">
                        <a className="btn btn-light btn-lg" href="/register" role="button">Register</a>
                        <a className="btn btn-dark btn-lg" href="/login" role="button">Login</a>
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    )
}

export default Home;