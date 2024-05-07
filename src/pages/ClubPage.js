import {useParams} from 'react-router-dom';
import React, {useState, useEffect} from "react";
import {doc, getDoc, getFirestore,updateDoc, arrayUnion} from "firebase/firestore";
import {useClubContext} from "../context/ClubContext";
import TopNavbar from "../components/TopNavbar";
import {GetClubBackground} from "../components/clubs/GetClubBackground";
import NavbarClub from "../components/clubs/NavbarClub.js";
import Rounds from "../components/clubs/Rounds";
import Films from "../components/clubs/Films";
import Standings from "../components/clubs/Standings";
import Chat from "../components/clubs/Chat";
import ClubHeading from "../components/clubs/ClubHeading";
import ClubInfo from "../components/clubs/ClubInfo";
import Footer from "../components/Footer";

const ClubPage = () => {

    const {clubId} = useParams();
    const [club, setClub] = useState({});
    const clubBackground = GetClubBackground(club);
    const [members, setMembers] = useState([]);
    const [rounds, setRounds] = useState([]);
    const {setClubData} = useClubContext();
    const [activeTab, setActiveTab] = useState('Rounds');

    const renderTabComponent = () => {
        switch (activeTab) {
            case 'Rounds':
                return <Rounds rounds={rounds} clubId={clubId} createNewRound={createNewRound}/>;
            case 'Films':
                return <Films rounds={rounds} clubId={clubId}/>;
            case 'Standings':
                return <Standings/>;
            case 'Chat':
                return <Chat/>;
            default:
                return <Rounds/>;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clubFetch = async () => {
                    try {
                        const firestore = getFirestore();
                        const clubRef = doc(firestore, 'clubs', clubId);
                        const docSnap = await getDoc(clubRef);
                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            setClub(data);
                            return data;
                        }

                        return null;
                    } catch (error) {
                        console.log(error);
                    }
                };

                const fetchUserDetails = async (userId) => {
                    try {
                        const firestore = getFirestore();
                        const userRef = doc(firestore, 'users', userId);
                        const userSnapshot = await getDoc(userRef);

                        if (userSnapshot.exists()) {
                            const userData = userSnapshot.data();
                            return {id: userSnapshot.id, userData};
                        } else {
                            console.log('No such user!');
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };

                const fetchAllUsers = async () => {
                    if (club && club.clubMembers) {
                        const usersData = await Promise.all(club.clubMembers.map(fetchUserDetails));
                        setMembers(usersData);
                        return usersData;
                    }
                    return [];
                };

                const [fetchedClubInfo, fetchedMembers] = await Promise.all([
                    clubFetch(),
                    fetchAllUsers(),
                ]);

                setClubData(fetchedClubInfo, fetchedMembers, GetClubBackground(fetchedClubInfo));

                if (fetchedClubInfo && fetchedClubInfo.rounds && fetchedClubInfo.rounds.length > 0) {
                    setRounds(fetchedClubInfo.rounds);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        void fetchData();

    }, [clubId, club ]);


    const generateRoundId = () => {
        const code = club.code;
        const roundId = `round-${code}`;
        return roundId;
    }

    const createNewRound = async () => {
        try {
            const newRound = {
                roundId: generateRoundId(),
                roundNumber: rounds.length + 1,
                roundTheme: '',
                roundDescription: '',
                filmSuggestions: [],
                stageLimit: null,
                currentStage: 1,
                memberWhoSuggestedTheme: '',
            };

            const firestore = getFirestore();
            const clubRef = doc(firestore, 'clubs', clubId);

            // Fetch the current club data
            const docSnap = await getDoc(clubRef);
            const clubData = docSnap.data();

            // Create a new club data object with the updated rounds array
            const updatedClubData = {
                ...clubData,
                rounds: arrayUnion(newRound), // Use arrayUnion to avoid duplicates
            };

            // Update the document in Firestore
            await updateDoc(clubRef, updatedClubData);

            // Update the local state
            setRounds((prevRounds) => [...prevRounds, newRound]);
        } catch (error) {
            console.error('Error creating new round:', error);
        }
    };



    return (
        <>
            <TopNavbar/>
            <div className={"dashboard-container"}>
                <ClubHeading clubBackground={clubBackground}/>
                <ClubInfo club={club} members={members}/>
                <NavbarClub setActiveTab={setActiveTab}/>
                {renderTabComponent()}
                <Footer/>
            </div>
        </>
    )
}

export default ClubPage;