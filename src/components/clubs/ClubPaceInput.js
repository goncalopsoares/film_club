import React from 'react';

const ClubPaceInput = ({clubPace, onInputChange}) => {

    return (
        <div style={{marginTop: '2rem'}}>
            <h3>When should new films be up for vote?</h3>
            <div style={{marginBottom: '1rem'}}>
                <label>
                    <input type="radio" value="Weekly" checked={clubPace === 'Weekly'}
                           onChange={(e) => onInputChange(e.target.value)}/>
                    <b>New film every week</b> A new film is voted every week
                </label>
            </div>
            <div style={{marginBottom: '1rem'}}>
                <label>
                    <input type="radio" value="Biweekly" checked={clubPace === 'Biweekly'}
                           onChange={(e) => onInputChange(e.target.value)}/>
                    <b>New film every two weeks</b> A new film is voted every two weeks
                </label>
            </div>
            <div style={{marginBottom: '1rem'}}>
                <label>
                    <input type="radio" value="Monthly" checked={clubPace === 'Monthly'}
                           onChange={(e) => onInputChange(e.target.value)}/>
                    <b>New film every month</b> A new film is voted every month
                </label>
            </div>
            <div style={{marginBottom: '1rem'}}>
                <label>
                    <input type="radio" value="Choice" checked={clubPace === 'Choice'}
                           onChange={(e) => onInputChange(e.target.value)}/>
                    <b>Not scheduled</b> The club admin can choose when to vote for a new film
                </label>
            </div>
        </div>
    )
}

export default ClubPaceInput;
