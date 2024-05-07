import React from 'react';
import { useUserContext } from "../../context/UserContext";

const ProfileBackdrop = () => {
    const { backdrop } = useUserContext();

    return (
        <div>
            <div className="create-profile-backdrop fade-img" style={{backgroundImage: `url(${backdrop})`}}></div>
        </div>
    );
};

export default ProfileBackdrop;
