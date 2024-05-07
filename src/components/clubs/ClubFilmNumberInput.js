import React, {useState} from 'react';

function ClubFilmNumberInput({onChange}) {
    const [filmNumber, setFilmNumber] = useState(0);

    const handleIncrement = (e) => {
        e.preventDefault();
        setFilmNumber(prevNumber => prevNumber + 1);
        onChange(filmNumber + 1);
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        setFilmNumber(prevNumber => prevNumber - 1);
        onChange(filmNumber - 1);
    };

    return (
        <div style={{padding: '1rem 1rem 0 1rem'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h3>How many films can a member submit per round for voting?</h3>
                <button className={'round-button'} onClick={(e) => handleDecrement(e)}>-</button>
                <input className={'number-input'} type="number" value={filmNumber} readOnly/>
                <button className={'round-button'} onClick={(e) => handleIncrement(e)}>+</button>
            </div>
        </div>
    );
}

export default ClubFilmNumberInput;
