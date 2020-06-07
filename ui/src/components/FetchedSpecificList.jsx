import React from 'react';

function FetchedSpecificList({list})
{
    return (
        <div  className="box-show">
            {/* <div>
                <div className="box-show" id="heading"></div>
                {/* <h1> <%- listTitle %> </h1> 
            </div> */}
                            
                {list ? list.map((item) => { 
                    return (
                        <div>
                            <table>
                                <tr>
                                    <td>
                                        <div className="item">
                                        <p>{item.itm}</p>
                                        </div>
                                    </td>
                                        {item.isDone ? <td className="status-completed">Completed</td> :
                                        <td className="status-inprogress">In Progress
                                    </td>}
                                </tr>
                            </table>
                        </div> 
                    )}) :
                    <div className='item'><p>No item found.</p></div>
                }
        </div>
    )
}

export default FetchedSpecificList;