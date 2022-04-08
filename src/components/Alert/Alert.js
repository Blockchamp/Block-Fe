import React, {useState, useEffect} from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({show, message, stat}) => {
 


    
    return (
        show ?
        <div className=' text-center m-0 p-0 position-sticky'>
            <Alert className='m-0 p-0 position-sticky' variant={stat}>
                    <Alert.Heading>{message}!!</Alert.Heading>
            </Alert >
        </div>
        : null
    )
    
}

export default Message;