import React, {useState} from 'react';
import {Navigate} from "react-router-dom";
import '../styles.css';
import {auth} from '../utils/Firebase';
import {db} from '../utils/Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection, addDoc, getFirestore, doc, setDoc} from 'firebase/firestore';
import {useUserContext} from "../context/UserContext";

const Register = () => {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [user, setUser] = useState('');
    const userCollection = collection(db, "users");
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const {setDocId} = useUserContext();

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
            const user = userCredential.user;
            const firestore = getFirestore();
            const userDocRef = doc(firestore, 'users', user.uid); // replace 'users' with the actual name of your users collection

            await setDoc(userDocRef, {email: newEmail});
            setDocId(user.uid);
            getCurrentUser();
            setRedirectToProfile(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleGoLogin = () => {
        setRedirectToLogin(true);
    }

    const getCurrentUser = () => {
        setUser(newEmail);
    };

    if (redirectToProfile) {
        return <Navigate to="/profile/edit"/>;
    }

    if (redirectToLogin) {
        return <Navigate to="/"/>;
    }

    return (
        <div>
            <h2 className="login-title">Register</h2>
            <form>
                <label>
                    Email
                    <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                           className="rounded-input"/>
                </label>
                <label>
                    Password
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                           className="rounded-input"/>
                </label>
            </form>
            <button id="register-button" type="button" onClick={handleRegister}>
                Sign Up
            </button>
            <div>
                <p style={{textAlign: "center"}}>Already have an account?</p>
                <p style={{textAlign: "center", color: '#790000', fontWeight: 'bold'}}><a onClick={handleGoLogin}>Login
                    instead</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
