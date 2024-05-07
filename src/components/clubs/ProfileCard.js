import React from "react";
import {useUserContext} from "../../context/UserContext";

const ProfileCard = () => {
    const {avatar, name, dateOfCreation} = useUserContext();
    return (
        <div className="user-card">
            <h4 className={'membership-card-title'}>Membership Card<span
                className={'logo-font'} style={{marginLeft: '3.5rem', color: '#5e5e5e'}}>film club</span></h4>
            <img src={avatar} alt="Profile" className="profile-pic-card"/>
            <div className="user-info">
                <h2>{name}</h2>
                <p style={{margin: '0'}}>Member since <span style={{fontSize: '0.8rem', marginLeft: '0.5rem'}}>{dateOfCreation}</span></p>
                <p style={{margin: '0.5rem 0'}}>Films watched: {}</p>
            </div>
        </div>
    );
}

export default ProfileCard;