import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const RoundsVotesInFavour = ({ onChange, upvotesCounter, initialUpvotes, numberOfUpvotesUsed }) => {
    const [upvotesNumber, setUpvotesNumber] = useState(0);

    const handleIncrement = (e) => {
        if (numberOfUpvotesUsed < initialUpvotes) {
        e.preventDefault();
        const newUpvotesNumber = upvotesNumber + 1;
        setUpvotesNumber(newUpvotesNumber);
        onChange('upvotes', newUpvotesNumber);
        } else {

        }
    };

    const handleDecrement = (e) => {
        e.preventDefault();
        const newUpvotesNumber = Math.max(upvotesNumber - 1, 0);
        setUpvotesNumber(newUpvotesNumber);
        onChange('upvotes', newUpvotesNumber);
    };

    return (
        <div style={{ padding: '1rem 1rem 0 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FaHeart size={35} style={{marginRight: '0.5rem'}}/>
                <button className={'round-button'} onClick={(e) => handleDecrement(e)}>-</button>
                <input className={'number-input'} type="number" value={upvotesNumber} readOnly />
                <button className={'round-button'} onClick={(e) => handleIncrement(e)}>+</button>
            </div>
            <p>Vote in favour of watching this film</p>
        </div>
    );
};

export default RoundsVotesInFavour;
