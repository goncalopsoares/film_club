import React from 'react';

const ProfilePicture = ({ profilePic, style }) => {
    return (
        <>
            <div>
                <img className="create-profile-avatar" src={profilePic} alt="avatar" style={style} />
            </div>
        </>
    );
};

export default ProfilePicture;
