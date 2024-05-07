import React from 'react';
import NameInput from './NameInput';
import BirthInput from './BirthInput';
import CountryPicker from './CountryPicker';
import BioInput from "./BioInput";

const ProfileForm = ({profileData, onInputChange}) => {

    return (
        <div style={{padding: '1rem 1rem 0 1rem', marginTop: '2rem'}}>
            <NameInput
                value={profileData.name}
                onChange={(value) => onInputChange('name', value)}
            />
            <BioInput
                value={profileData.bio}
                onChange={(value) => onInputChange('bio', value)}
            />
            <BirthInput
                value={profileData.birthday}
                onChange={(value) => onInputChange('birthday', value)}
            />
            <CountryPicker
                value={profileData.country}
                onChange={(value) => onInputChange('country', value)}
            />
        </div>
    );
};

export default ProfileForm;
