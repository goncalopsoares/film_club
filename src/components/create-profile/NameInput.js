import React from 'react';

const NameInput = ({ value, onChange }) => {
    return (
        <label className="create-profile-label">
            What's your name?
            <input
                className="rounded-input"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
};

export default NameInput;
