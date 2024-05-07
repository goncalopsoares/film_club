import React, {useEffect, useState} from 'react';
import {auth} from '../utils/Firebase';
import {getFirestore, doc, setDoc, Timestamp} from 'firebase/firestore';
import ProfilePicture from '../components/create-profile/ProfilePicture';
import ProfileForm from '../components/create-profile/ProfileForm';
import ProfileBackdrop from '../components/create-profile/ProfileBackdrop';
import {useUserContext} from '../context/UserContext';
import FilmPicker from "../components/create-profile/FilmPicker";
import DirectorPicker from "../components/create-profile/DirectorPicker";
import {Navigate} from "react-router-dom";

const CreateProfile = () => {

        const [email, setEmail] = useState('');

        const [redirectToDashboard, setRedirectToDashboard] = useState(false);

        const {
            docId,
            avatar,
            setAvatar,
            backdrop,
            setBackdrop,
            favoriteFilms,
            setFavoriteFilms,
            favoriteDirectors,
            setFavoriteDirectors
        } = useUserContext();

        const [defaultBackdrop, setDefaultBackdrop] = useState('');

        const [profileData, setProfileData] = useState({
            name: '',
            bio: '',
            birthday: '',
            country: '',
        });

    const getCurrentTimestamp = () => {
        return Timestamp.now();
    }

        const fetchDataBackdrop = async () => {
            if (!backdrop) {
                try {
                    const fixedSeed = 3;
                    const options = {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTllMGMxNDg5YmFjZDIwYjVlYjU2N2E2NTAwYmY3MCIsInN1YiI6IjY0MmM3ZDdiOGI5NTllMDA5N2E0Y2RjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c0woXmJ-MJSo8YDNwK6VG7RokYgJYhxCnAcl9KWzvVc'
                        }
                    };

                    const response = await fetch(`https://api.themoviedb.org/3/movie/17473/images`, options);
                    const data = await response.json();
                    const backdropPath = data.backdrops[fixedSeed].file_path;
                    const backdropUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;

                    setBackdrop(backdropUrl);
                    setDefaultBackdrop(backdropUrl);

                } catch (err) {
                    console.error(err);
                }
            }
        };

        const fetchAvatar = async () => {
            if (!avatar) {
                try {
                    const randomSeed = Math.floor(Math.random() * 50000) + 1;
                    const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${randomSeed}`;
                    setAvatar(avatarUrl);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        const handleInputChange = (inputName, inputValue) => {
            setProfileData((prevData) => ({...prevData, [inputName]: inputValue}));
        };

        const addFavoriteFilm = (film) => {
            setFavoriteFilms((prevFilms) => [...prevFilms, film]);
        };

        const removeFavoriteFilm = (index) => {
            setFavoriteFilms((prevFilms) => prevFilms.filter((_, i) => i !== index));
        };

        const addFavoriteDirector = (director) => {
            setFavoriteDirectors((prevDirectors) => [...prevDirectors, director]);
        };

        const removeFavoriteDirector = (index) => {
            setFavoriteDirectors((prevDirectors) => prevDirectors.filter((_, i) => i !== index));
        };

        useEffect(() => {
            fetchDataBackdrop();
        }, []);

        useEffect(() => {
            fetchAvatar();
        }, []);

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    setEmail(user.email);
                }
            });

            return () => unsubscribe();
        }, []);

        useEffect(() => {
            if (favoriteFilms && favoriteFilms.length > 0) {
                const firstFavoriteFilm = favoriteFilms[0];
                setBackdrop(`https://image.tmdb.org/t/p/original${firstFavoriteFilm.backdrop_path}`);
            } else {
                setBackdrop(defaultBackdrop);
            }
        }, [favoriteFilms]);

        const createProfile = async (event) => {
            event.preventDefault();
            if (docId) {
                const birthdayTimestamp = Timestamp.fromDate(new Date(profileData.birthday));
                const userData = {
                    name: profileData.name,
                    bio: profileData.bio,
                    birthday: birthdayTimestamp,
                    country: profileData.country,
                    favoriteFilms: favoriteFilms,
                    favoritePersonalities: favoriteDirectors,
                    avatar: avatar,
                    backdrop: backdrop,
                    email: email,
                    dateOfCreation: getCurrentTimestamp(),
                };
                const firestore = getFirestore();
                const userDataRef = doc(firestore, 'users', docId);
                try {
                    await setDoc(userDataRef, userData, {merge: true});
                    console.log('Profile data successfully added to Firestore.');
                    await setRedirectToDashboard(true);
                    console.log(redirectToDashboard)
                } catch (err) {
                    console.log('Error adding profile data to Firestore', err)
                }
            } else {
                console.log('Document ID is not defined');
                console.log(docId)
            }

        };

        if (redirectToDashboard) {
            return <Navigate to="/dashboard"/>;
        }

        return (
            <div className="profile-background">
                <ProfileBackdrop/>
                <ProfilePicture profilePic={avatar}/>
                <form onSubmit={(event) => createProfile(event)}>
                    <ProfileForm
                        profileData={profileData}
                        onInputChange={handleInputChange}/>
                    <FilmPicker
                        favoriteFilms={favoriteFilms}
                        addFavoriteFilm={addFavoriteFilm}
                        deleteFavoriteFilm={removeFavoriteFilm}
                    />
                    <DirectorPicker
                        favoriteDirectors={favoriteDirectors}
                        addFavoriteDirector={addFavoriteDirector}
                        removeFavoriteDirector={removeFavoriteDirector}
                    />
                    <div style={{padding: '0 1rem 2rem 1rem'}}>
                        <input id="create-profile-button" type="submit" value="Create Profile"/>
                    </div>
                </form>
            </div>
        );
    }
;

export default CreateProfile;
