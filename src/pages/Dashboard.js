import React, {useState, useEffect} from 'react';
import {FaPlusSquare} from "react-icons/fa";
import {FaUserGroup} from "react-icons/fa6";
import TopNavbar from "../components/TopNavbar";
import ClubCard from "../components/clubs/ClubCard";
import ProfileCard from "../components/clubs/ProfileCard";
import {useUserContext} from "../context/UserContext";
import {Navigate, useNavigate} from "react-router-dom";
import JoinClub from "../components/clubs/JoinClub";
import {getFirestore, collection, query, where, getDocs, doc, updateDoc, arrayUnion} from 'firebase/firestore';
import Footer from "../components/Footer";

const Dashboard = () => {
    const {avatar, uid, dateOfCreation} = useUserContext();
    const [clubs, setClubs] = useState([]);
    const [redirectToCreateClub, setRedirectToCreateClub] = useState(false);
    const [showJoinClub, setShowJoinClub] = useState(false);
    const [clubCode, setClubCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const showJoinClubComponent = () => {
        setShowJoinClub(true);
    }

    const handleInputChange = (event) => {
        setClubCode(event.target.value);
    };

    const joinClub = async (event) => {
        event.preventDefault();
        const firestore = getFirestore();
        const clubsRef = collection(firestore, 'clubs');
        const q = query(clubsRef, where('clubCode', '==', clubCode));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const clubDoc = doc(firestore, 'clubs', querySnapshot.docs[0].id);
            await updateDoc(clubDoc, {
                clubMembers: arrayUnion(uid)
            });
            setMessage('Successfully joined the club!');
            setTimeout(() => {
                setShowJoinClub(false);
            }, 2500);
        } else {
            setMessage('Invalid club code. Please try again.');
        }
        setClubCode('');
    };


    const redirectToCreateClubButton = () => {
        setRedirectToCreateClub(true);
    };

    useEffect(() => {
        if (uid) {
            const fetchClubs = async () => {
                const firestore = getFirestore();
                const clubsRef = collection(firestore, 'clubs');
                const q = query(clubsRef, where('clubMembers', 'array-contains', uid));
                const querySnapshot = await getDocs(q);
                setClubs(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
            };
            fetchClubs();
        }
    }, [uid, clubCode, dateOfCreation]);


    if (redirectToCreateClub) {
        return <Navigate to="/club"/>;
    }

    return (
        <>
            <TopNavbar/>
            <div className={"dashboard-container"}>
                <div style={{margin: '2rem 0'}}>
                    <ProfileCard/>
                </div>
                <div>
                    <h3 style={{color: '#fff', margin: '1rem'}}>Your Current Clubs</h3>
                    {clubs.length > 0 ? (clubs.map((club) => (
                        <ClubCard key={club.id} club={club} uid={uid} />
                    ))) : (
                        <div className="hint-club">
                            <p>You aren't currently in any clubs yet. <b>Join or create a club using the butons
                                below!</b></p>
                        </div>
                    )}
                </div>
                <div>
                    {!showJoinClub ? (
                        <button onClick={showJoinClubComponent} className={"create-club-button"}>
                            <FaUserGroup size={20} style={{marginRight: '1rem'}}/>
                            Join a Club
                        </button>) : (
                        <JoinClub clubCode={clubCode} handleInputChange={handleInputChange} joinClub={joinClub}
                                  message={message}/>
                    )}
                </div>
                <div>
                    <button onClick={redirectToCreateClubButton} className={"create-club-button"}><FaPlusSquare
                        size={20}
                        style={{marginRight: '1rem'}}/>
                        Create a Club
                    </button>
                </div>
            </div>
            <Footer style={{marginTop: 0}}/>
        </>
    )
}

export default Dashboard;