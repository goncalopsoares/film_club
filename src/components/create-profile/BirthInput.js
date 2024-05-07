import React from 'react';

const BirthInput = ({ value, onChange }) => {

    return (
        <label className="create-profile-label">
            How old are you?
            <input
                className="rounded-input"
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    )
}

export default BirthInput;