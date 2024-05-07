import React from 'react';

const BioInput = ({ value, onChange }) => {
    return (
        <label className="create-profile-label">
            How would you describe yourself?
            <textarea
                className="rounded-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
};

export default BioInput;
