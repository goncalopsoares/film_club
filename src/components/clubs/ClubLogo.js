import React from 'react';

const ClubLogo = ({ clubLogo, style}) => {
    return (
        <>
            <div>
                <img className="club-logo" src={clubLogo} alt="club logo" style={style}/>
            </div>
        </>
    );
};

export default ClubLogo;
