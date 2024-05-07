import React, {useState, useEffect} from 'react';
import '../styles.css';
import {auth} from '../utils/Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import SignInGoogle from "../components/SignInGoogle";
import Register from "../components/Register";
import Login from "../components/Login";
import {getFirestore, doc, onSnapshot} from 'firebase/firestore';
import {useUserContext} from "../context/UserContext";
import {Navigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [redirectToDashboard, setRedirectToDashboard] = useState(false);
    const [unsubscribe, setUnsubscribe] = useState(null);

    const {docId, setDocId} = useUserContext()

    useEffect(() => {
        handleLogin();
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const firestore = getFirestore();
            const userDataRef = doc(firestore, 'users', user.uid);

            const unsubscribeSnapshot = onSnapshot(userDataRef, (doc) => {
                if (doc.exists()) {
                    setDocId(doc.id);
                    console.log(doc.id);
                    setRedirectToDashboard(true);
                } else {
                    console.log('User doc does not exist');
                }
            });

            setUnsubscribe(() => unsubscribeSnapshot);
        } catch (err) {
            console.error(err);
        }
    };


    const handleRegisterClick = () => {
        setShowRegister(true);
    };

    if (redirectToDashboard) {
        return <Navigate to="/dashboard"/>;
    }

    return (
        <>
            <h1 className={'logo-font home-title'}>film club</h1>
            <div className="login-container">
                {showRegister ? (
                    <Register/>
                ) : (
                    <>
                        <h2 className="login-title">Login</h2>
                        <Login id="login-button" email={email} password={password} setEmail={setEmail}
                               setPassword={setPassword} handleLogin={handleLogin}/>
                        <SignInGoogle/>
                            <>
                                <div>
                                    <p style={{textAlign: "center"}}>New to Film Club?</p>
                                    <p style={{textAlign: "center", color: '#790000', fontWeight: 'bold'}}><a onClick={handleRegisterClick}>Create an
                                        account</a>
                                    </p>
                                </div>
                            </>
                    </>
                )}
            </div>
        </>
    );
};

export default LoginPage;
