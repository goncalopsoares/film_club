import React, {useState} from 'react';
import {BsExclamationSquareFill} from "react-icons/bs";

function ClubFilmNumberVotesInput({onChange}) {
    const [votesNumber, setVotesNumber] = useState(0);

    const handleIncrement = (e) => {
        e.preventDefault();
        setVotesNumber(prevNumber => prevNumber + 1);
        onChange(votesNumber + 1);
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        setVotesNumber(prevNumber => prevNumber - 1);
        onChange(votesNumber - 1);
    };

    return (
        <div style={{padding: '1rem 1rem 0 1rem'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h3>Members can spend how many votes per film?</h3>
                <button className={'round-button'} onClick={(e) => handleDecrement(e)}>-</button>
                <input className={'number-input'} type="number" value={votesNumber} readOnly/>
                <button className={'round-button'} onClick={(e) => handleIncrement(e)}>+</button>
            </div>
            <div>
                <p className="hint hint-info" style={{padding: '1rem'}}>
                    <BsExclamationSquareFill size={60} style={{marginRight: '1rem'}}/> Members
                    will have up to a number of votes equal to the number of films, minus 1. This defines how
                    many votes can be used in a single film.</p>
            </div>
        </div>
    )
        ;
}

export default ClubFilmNumberVotesInput;
