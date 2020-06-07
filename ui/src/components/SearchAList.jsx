import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import FetchedSpecificList from './FetchedSpecificList';

function SearchAList(){
    
    let [list, setList] = useState([]);
    let [date, setDate] = useState('');
    let [username, setUsername] = useState('');
    // let [statusCode, setStatusCode] = useState(0);
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

    function HandleDateInputChange(event)
    {
        setDate(event.target.value);
    }

    function HandleUsernameChange(event)
    {
        setUsername(event.target.value);
    }

    function HandleClick(event)
    {
        event.preventDefault();
        let payload = {
            date: date,
            username: username
        }
        axios({
            url: '/api/searchList',
            method: 'POST',
            data: payload
        })
        .then(response => {
            response.status === 200 && setList(response.data.Content)
            // && setStatusCode(200)
        }).catch(error => console.log(error.message))
    }

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
    : !session ? <Redirect to='/login' /> :(
        <div>
            <div className="container-fluid box-show">
                        <form style={{padding:4}}>
                            <div className="form-group"> 
                                <label className="control-label"><h3>Please fill details</h3></label>
                                <input 
                                    className="form-control" 
                                    id="date" 
                                    name="date" 
                                    type='date' 
                                    autoComplete="off"
                                    timezone="en-us"
                                    value={date}
                                    onChange={HandleDateInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    className="form-control" 
                                    name="username" 
                                    placeholder="Enter Email" 
                                    type="text" 
                                    value={username}
                                    onChange={HandleUsernameChange}
                                    autoComplete="off" 
                                />
                            </div>
                            <div className="form-group"> 
                                <button 
                                    className="btn btn-primary" 
                                    name="submit" 
                                    type="submit"
                                    onClick={HandleClick}>Submit
                                </button>
                            </div>
                        </form>
            </div>
            <FetchedSpecificList list={list} />
        </div>
    );
}

export default SearchAList;