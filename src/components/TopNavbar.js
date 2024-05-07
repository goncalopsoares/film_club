import React from 'react';
import {useUserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";



const TopNavbar = () => {
    const {avatar, setUser} = useUserContext();
    const navigate = useNavigate();

    const redirectToDashboard = () => {
        navigate('/dashboard');
    };

    const redirectToProfile = () => {
        navigate('/profile');
    };

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
        navigate('/');
    };


    return (
        <div className="navbar">
            <div className="navbar-left">
                <h2 className={'logo-font'} onClick={redirectToDashboard}>film club</h2>
            </div>
            <div className="navbar-right">
                <button onClick={logout} style={{marginRight:'1rem', border:'none', backgroundColor: '#D9D9D9', fontSize:'1rem'}}>Logout</button>
                <img onClick={redirectToProfile} src={avatar} alt="Avatar" className="profile-pic"/>
            </div>
        </div>
    );
};

export default TopNavbar;
