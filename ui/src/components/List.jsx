import React, { useEffect, useState } from 'react';
import axios from 'axios';
import date from '../helpers/date';
import Loader from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';

function List()
{
    let [items, setItems] = useState([]);
    let [newItem, setNewItem] = useState('');
    // let [statusCode, setstatusCode] = useState(0);
    let [errorMessage, setErrorMessage] = useState('');
    let [loading, setLoading] = useState(true);
    
    useEffect(() => {
        GetList()
    }, []);

    function onInputChange(event)
    {
        setNewItem(event.target.value);
    }

    function GetList()
    {
        axios({
            url: '/api/list',
            method: 'GET'
        })
        .then(response => {
            // setstatusCode(response.status);
            setItems(response.data);
            setTimeout(() => {setLoading(false)}, 1000);
            // setLoading(false);
        }).catch((error) => {
            setErrorMessage(error.message)
            console.log(error.message);
            setTimeout(() => {setLoading(false)}, 1000);
            // setLoading(false);
        });
    }


    function HandleCheck(event)
    {
        event.preventDefault();
        let id = event.target.value
        const payload = {
            checkbox: id,
            itemStatus: !items.find(item => item._id === id).isDone
        }

        axios({
            url: '/api/CompleteItem',
            method: 'POST',
            data: payload
        })
        .then(response => {
            response.status === 200 && GetList();
        }).catch(error => console.log(error.message))
    }

    function HandleClick(event)
    {
        event.preventDefault();
        SubmitInput();
    }

    function HandleKeyPressInput(event)
    {
        if(event.key === 'Enter'){
            SubmitInput();
        }
    }

    function SubmitInput()
    {
        setNewItem('');
        let payload = {
            newItem: newItem
        }
        axios({
            url: '/api/list',
            method: 'POST',
            data: payload
        })
        .then(response => {
            console.log('checked status', response.status);
            response.status === 200 && GetList();
        }).catch(error => console.log(error.message))
    }

    function HandleDeleteClick(id){
        let payload = {
            item: id
        }
        axios({
            url: '/api/list/deleteItem',
            method: 'POST',
            data: payload
        })
        .then(response => {
            console.log('delete status', response.status);
            response.status === 200 && GetList();
        }).catch(error => console.log(error.message))
    }

    return loading ? (
        <div className='loader'>
            <Loader
                type="Oval"
                color="#5d32a6"
                height={30}
                width={30}
            />
            </div>) :
        errorMessage === 'Request failed with status code 400' ? 
        (<Redirect to='/login' />) :
        (<div>
            <div className="box" id="heading">
                <h1> {date()} </h1>
            </div>

            <div className="box">
                {items.length !== 0 &&  
                    items.map((item, index) => {
                    return (
                        <div key={index} className="item">
                        <input type="checkbox" name="checkbox" value={item._id} onChange={HandleCheck} checked={item.isDone} />
                        <p>{item.itm}</p>
                        <span onClick={() => HandleDeleteClick(item._id)} value={item._id} className="trash-image"><i className="fa fa-trash"></i></span>
                        </div>
                    )})
                }

                <input 
                    type="text" 
                    className='text-input'
                    name="newItem" 
                    onChange={onInputChange} 
                    placeholder="New Item" 
                    autoComplete="off" 
                    value={newItem}
                    onKeyPress={HandleKeyPressInput}
                    required 
                />
                <button className='ItemButton'
                    type="submit" 
                    name="list" 
                    onClick={HandleClick} >+
                </button>
            </div> 
        </div>
    );
}

export default List;