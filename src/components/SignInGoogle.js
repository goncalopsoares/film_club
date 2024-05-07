import React from "react";
import {signInWithGooglePopup} from "../utils/Firebase";
import "../styles.css"
import {FcGoogle} from "react-icons/fc";

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <button style={{justifyContent: 'center'}} id="google-login-button" onClick={logGoogleUser}>
                <FcGoogle style={{margin: '0 1rem 0 0'}} size={20}/>
                Sign In With Google
            </button>
        </div>
    )
}
export default SignIn;