import React, {useState} from "react";
import {FaHeartBroken} from "react-icons/fa";

const RoundsVotesAgainst = ({onChange, numberOfDownvotesUsed, initialDownvotes}) => {
        const [downvotesNumber, setDownvotesNumber] = useState(0);

        const handleIncrement = (e) => {
            if (numberOfDownvotesUsed < initialDownvotes) {
                e.preventDefault();
                const newDownvotesNumber = downvotesNumber + 1;
                setDownvotesNumber(newDownvotesNumber);
                onChange('downvotes', newDownvotesNumber);
            } else {

            }
        }

        const handleDecrement = (e) => {
            e.preventDefault();
            const newDownvotesNumber = Math.max(downvotesNumber - 1, 0);
            setDownvotesNumber(newDownvotesNumber);
            onChange('downvotes', newDownvotesNumber);
        };

        return (
            <div style={{padding: '1rem 1rem 0 1rem'}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <FaHeartBroken size={35} style={{marginRight: '0.5rem'}}/>
                    <button className={'round-button'} onClick={(e) => handleDecrement(e)}>-</button>
                    <input className={'number-input'} type="number" value={downvotesNumber} readOnly/>
                    <button className={'round-button'} onClick={(e) => handleIncrement(e)}>+</button>
                </div>
                <p>Vote against watching this film</p>
            </div>
        );
    }
;

export default RoundsVotesAgainst;