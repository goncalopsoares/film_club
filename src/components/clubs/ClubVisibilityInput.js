import React from 'react';

const ClubVisibilityInput = ({clubVisibility, onInputChange}) => {

    return (
        <div style={{marginTop: '1.5rem'}}>
            <h3>Who can join your club?</h3>
            <div style={{marginBottom: '1rem'}}>
                <label>
                    <input type="radio" value="Open" checked={clubVisibility === 'Open'}
                           onChange={(e) => onInputChange(e.target.value)}/>
                    <b>Open</b> Any Film Club member can join
                </label>
            </div>
            <div style={{marginBottom: '1rem'}}>
                <label>
                    <input type="radio" value="Private" checked={clubVisibility === 'Private'}
                           onChange={(e) => onInputChange(e.target.value)}/>
                    <b>Private</b> Only the Film Club members who have the club code can join
                </label>
            </div>
        </div>

    )
}

export default ClubVisibilityInput;