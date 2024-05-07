import React, {createContext, useContext, useState, useEffect} from 'react';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {auth} from "../utils/Firebase";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [uid, setUid] = useState('');
    const [email, setEmail] = useState('');
    const [docId, setDocId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [backdrop, setBackdrop] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [country, setCountry] = useState('');
    const [films, setFilms] = useState([]);
    const [favoriteFilms, setFavoriteFilms] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [favoriteDirectors, setFavoriteDirectors] = useState([]);
    const [dateOfCreation, setDateOfCreation] = useState('');
    const [letterboxdLink, setLetterboxdLink] = useState('');
    const [imdbLink, setImdbLink] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setEmail(user.email);
                setUid(user.uid);
                const firestore = getFirestore();
                const userDataRef = doc(firestore, 'users', user.uid);
                const docSnap = await getDoc(userDataRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setAvatar(data.avatar || '');
                    setBackdrop(data.backdrop || '');
                    setProfilePic(data.profilePic || '');
                    setName(data.name || '');
                    setBio(data.bio || '');
                    setBirthday(data.birthday || '');
                    setCountry(data.country || '');
                    setFavoriteFilms(data.favoriteFilms || []);
                    setFavoriteDirectors(data.favoritePersonalities || []);
                    setDateOfCreation(data.dateOfCreation ? data.dateOfCreation.toDate().toLocaleDateString('en-GB') : '');
                    setLetterboxdLink(data.letterboxdLink || '');
                    setImdbLink(data.imdbLink || '');
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{
            uid,
            docId,
            setDocId,
            avatar,
            setAvatar,
            backdrop,
            setBackdrop,
            profilePic,
            setProfilePic,
            name,
            setName,
            bio,
            setBio,
            birthday,
            setBirthday,
            country,
            setCountry,
            films,
            setFilms,
            favoriteFilms,
            setFavoriteFilms,
            directors,
            setDirectors,
            favoriteDirectors,
            setFavoriteDirectors,
            dateOfCreation,
            setDateOfCreation,
            letterboxdLink,
            setLetterboxdLink,
            imdbLink,
            setImdbLink,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
