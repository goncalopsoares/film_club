import React, {useEffect, useState} from "react";
import ClubForm from "../components/clubs/ClubForm";
import ClubLogo from "../components/clubs/ClubLogo";
import TopNavbar from "../components/TopNavbar";
import {useNavigate} from "react-router-dom";
import ClubFilmNumberVotesInput from "../components/clubs/ClubFilmNumberVotesInput";
import ClubFilmNumberDownvotesInput from "../components/clubs/ClubFilmNumberDownvotesInput";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import ClubFilmNumberInput from "../components/clubs/ClubFilmNumberInput";


const CreateClub = () => {

    const [logo, setLogo] = useState('');
    const [clubName, setClubName] = useState('');

    const getCurrentDate = () => {
        return new Date();
    }

    const getClubCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < 4; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    const generateRoundId = () => {
        const code = getClubCode();
        const roundId = `round-${code}`;
        return roundId;
    }

    const getAdminId = () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            return user.uid;
        }
    }

    const getRandomImage = () => {
        return Math.floor(Math.random() * 7);
    }


    const [clubData, setClubData] = useState({
        clubCreationDate: getCurrentDate(),
        clubAdminId: getAdminId(),
        clubCode: getClubCode(),
        clubName: '',
        clubDescription: '',
        clubVisibility: '',
        clubPace: '',
        clubFilmNumber: 0,
        clubNumberVotes: 0,
        clubNumberDownvotes: 0,
        clubMembers: [getAdminId()],
        clubBackground: getRandomImage(),
        currentRound: 1,
        rounds: [
            {
                roundId: generateRoundId(),
                roundNumber: 1,
                roundTheme: '',
                roundDescription: '',
                filmSuggestions: [],
                stageLimit: null,
                currentStage: 1,
                memberWhoSuggestedTheme: '',
            },
        ],
    });


    const fetchLogo = async (seed) => {

        try {
            console.log(seed)
            let logoUrl;
            if (seed !== '') {
                logoUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
            } else {
                logoUrl = `https://api.dicebear.com/7.x/initials/svg?seed=Club`;
            }
            setLogo(logoUrl);
            setClubData(prevState => ({...prevState, clubLogo: logoUrl}));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLogo(clubName);
    }, [clubName]);


    const navigate = useNavigate();
    const redirectToProfile = () => {
        navigate('/profile');
    }

    const handleInputChange = (inputName, inputValue) => {
        setClubData((prevData) => ({...prevData, [inputName]: inputValue}));
        if (inputName === 'clubName') {
            setClubName(inputValue);
        }
    };


    const createClub = async (event) => {
        event.preventDefault();
        const newClubData = {
            ...clubData,
        };
        const firestore = getFirestore();
        try {
            const clubsCollectionRef = collection(firestore, 'clubs');
            const docRef = await addDoc(clubsCollectionRef, newClubData);
            console.log('Document written with ID: ', docRef.id);
            navigate('/dashboard');
        } catch (err) {
            console.error('Error adding document: ', err);
        }
    };


    return (
        <>
            <div className="profile-background">
                <TopNavbar redirectToProfile={redirectToProfile}/>
                <div style={{
                    padding: '1rem 1rem 0 1rem',
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{margin: '1rem'}}>{clubName ? `${clubName} Information` : 'Club Information'}</h2>
                    <ClubLogo clubLogo={logo}/>
                </div>
                <form onSubmit={createClub}>
                    <ClubForm
                        clubData={clubData}
                        onInputChange={handleInputChange}
                    />
                    <ClubFilmNumberInput onChange={(filmNumber) => handleInputChange('clubFilmNumber', filmNumber)}/>
                    <ClubFilmNumberVotesInput
                        onChange={(votesNumber) => handleInputChange('clubNumberVotes', votesNumber)}/>
                    <ClubFilmNumberDownvotesInput
                        onChange={(downvotesNumber) => handleInputChange('clubNumberDownvotes', downvotesNumber)}/>
                    <div style={{padding: '0 1rem 2rem 1rem', marginTop: '2rem'}}>
                        <input id="create-profile-button" type="submit" value="Create Club"/>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateClub;