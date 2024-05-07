import React from 'react';

const ClubNameInput = ({clubName, onInputChange}) => {
    return (
        <label className="create-profile-label">
            <h3 style={{marginBottom: '0'}}>What should we call your club?</h3>
            <input
                className="rounded-input"
                type="text"
                value={clubName}
                onChange={(e) => onInputChange(e.target.value)}
            />
        </label>
    );
};

export default ClubNameInput;
