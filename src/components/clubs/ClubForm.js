import React from 'react';
import ClubNameInput from "./ClubNameInput";
import ClubDescriptionInput from "./ClubDescriptionInput";
import ClubVisibilityInput from "./ClubVisibilityInput";
import ClubFilmNumberInput from "./ClubFilmNumberInput";
import ClubPaceInput from "./ClubPaceInput";


const ClubForm = ({clubData, onInputChange}) => {

    return (
        <div style={{padding: '1rem 1rem 0 1rem', marginTop: '1rem'}}>
            <ClubNameInput
                clubName={clubData.clubName}
                onInputChange={(clubName) => onInputChange('clubName', clubName)}
            />
            <ClubDescriptionInput
                clubDescription={clubData.clubDescription}
                onInputChange={(clubDescription) => onInputChange('clubDescription', clubDescription)}
            />
            <ClubVisibilityInput
                clubVisibility={clubData.clubVisibility}
                onInputChange={(clubVisibility) => onInputChange('clubVisibility', clubVisibility)}
            />
            <ClubPaceInput
                clubPace={clubData.clubPace}
                onInputChange={(clubPace) => onInputChange('clubPace', clubPace)}
            />
        </div>
    );
};

export default ClubForm;
