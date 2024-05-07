import React from 'react';

const ClubDescriptionInput = ({clubDescription, onInputChange}) => {
    return (
        <label className="create-profile-label">
            <h3 style={{marginBottom: '0'}}>What better describes your club?</h3>
            <textarea
                className="rounded-input"
                value={clubDescription}
                onChange={(e) => onInputChange(e.target.value)}
            />
        </label>
    );
};

export default ClubDescriptionInput;
