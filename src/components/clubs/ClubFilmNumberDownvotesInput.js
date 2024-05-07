import React, {useState} from 'react';
import {BsExclamationSquareFill} from "react-icons/bs";

function ClubFilmNumberDownvotesInput({onChange}) {
    const [downvotesNumber, setDownvotesNumber] = useState(0);

    const handleIncrement = (e) => {
        e.preventDefault();
        setDownvotesNumber(prevNumber => prevNumber + 1);
        onChange(downvotesNumber + 1);
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        setDownvotesNumber(prevNumber => prevNumber - 1);
        onChange(downvotesNumber - 1);
    };

    return (
        <div style={{padding: '1rem 1rem 0 1rem'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h3>Members can spend how many downvotes per film?</h3>
                <button className={'round-button'} onClick={(e) => handleDecrement(e)}>-</button>
                <input className={'number-input'} type="number" value={downvotesNumber} readOnly/>
                <button className={'round-button'} onClick={(e) => handleIncrement(e)}>+</button>
            </div>
            <div>
                <p className="hint hint-info" style={{padding: '1rem'}}>
                    <BsExclamationSquareFill size={60} style={{marginRight: '1rem'}}/> Members
                    will have up to a number of downvotes equal to the half of the number of films. This defines
                    how
                    many downvotes can be used in a single film.</p>
            </div>
        </div>
    );
}

export default ClubFilmNumberDownvotesInput;
