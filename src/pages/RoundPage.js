import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useClubContext} from "../context/ClubContext";
import {useUserContext} from "../context/UserContext";
import TopNavbar from "../components/TopNavbar";
import ClubHeading from "../components/clubs/ClubHeading";
import ClubInfo from "../components/clubs/ClubInfo";
import RoundTheme from "../components/rounds/RoundTheme";
import RoundFilms from "../components/rounds/RoundFilms";
import RoundVoting from "../components/rounds/RoundVoting";
import RoundResults from "../components/rounds/RoundResults";
import NavbarRound from "../components/rounds/NavbarRound";
import Footer from "../components/Footer";
import {getFirestore, doc, updateDoc} from 'firebase/firestore';
import useFilmCreditsSearch from "../components/useFilmCreditsSearch";
import {searchFilmDetailsMore} from "../components/useFilmCreditsSearch";
import useFilmDetailSearch from "../components/useFilmDetailSearch";


const RoundPage = () => {
    const {clubId, roundId} = useParams();
    const {club, members, clubBackground} = useClubContext();
    const user = useUserContext();
    const [round, setRound] = useState([]);
    const [activeTab, setActiveTab] = useState('Theme');
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [memberWhoSuggestedTheme, setMemberWhoSuggestedTheme] = useState(null);
    const [theme, setTheme] = useState(null);
    const [filmDetails, setFilmDetails] = useState(null);
    const [filmId, setFilmId] = useState(null);
    const [film, setFilm] = useState(null);
    const {fetchedFilms, searchFilmDetails} = useFilmCreditsSearch();
    const {fetchedFilmsMore, searchFilmDetailsMore} = useFilmDetailSearch();
    const [message, setMessage] = useState('');


    useEffect(() => {
        console.log("memberWhoSuggestedTheme changed:", memberWhoSuggestedTheme);
        const fetchRoundData = () => {
            try {

                const selectedRound = club.rounds.find(round => round.roundId === roundId);

                if (selectedRound) {
                    setRound(selectedRound);
                } else {
                    console.log("Round not found!");
                }
            } catch (error) {
                console.error("Error fetching round data:", error);
            }
        };

        void fetchRoundData();
    }, [clubId, roundId, round, memberWhoSuggestedTheme, theme]);


    const updateMemberWhoSuggestedTheme = async (clubId, round) => {
        try {
            if (!round) {
                console.error("Round not defined");
                return;
            }

            const firestore = getFirestore();
            const clubRef = doc(firestore, 'clubs', clubId);

            // Update the memberWhoSuggestedTheme field in the specific round
            const updatedRounds = club.rounds.map(r => {
                if (r.roundId === round.roundId) {
                    return {...r, memberWhoSuggestedTheme: selectedMemberId};
                } else {
                    return r;
                }
            });

            // Update the entire club document with the modified rounds array
            await updateDoc(clubRef, {rounds: updatedRounds});
            console.log("Firestore updated successfully");
            setMemberWhoSuggestedTheme(prevMember => selectedMemberId);
            setMessage('User successfully set as the theme suggestor');
        } catch (error) {
            console.error("Error updating Firestore:", error);
        }
    };

    const updateRoundTheme = async (clubId, round, theme) => {
        try {
            if (!round) {
                console.error("Round not defined");
                return;
            }

            const firestore = getFirestore();
            const clubRef = doc(firestore, 'clubs', clubId);

            //get the specific round based on round id
            const updatedRounds = club.rounds.map(r => {
                if (r.roundId === round.roundId) {
                    return {...r, roundTheme: theme};
                } else {
                    return r;
                }
            });

            await updateDoc(clubRef, {rounds: updatedRounds});
            setTheme(theme);
            console.log("Firestore updated successfully");
        } catch (error) {
            console.error("Error updating Firestore:", error);
        }
    };


    const submitFilmSuggestion = async (clubId, round, user, selectedFilm) => {
        try {
            if (!round) {
                console.error("Round not defined");
                return;
            }

            if (!selectedFilm) {
                console.error("No film selected");
                return;
            }

            const firestore = getFirestore();
            const clubRef = doc(firestore, 'clubs', clubId);

            //get the specific round based on round id
            const updatedRounds = club.rounds.map(r => {
                if (r.roundId === round.roundId) {
                    // If films array exists, append the new film, otherwise create a new array
                    const updatedFilms = r.filmSuggestions ? [...r.filmSuggestions, {
                        user: user.uid,
                        film: selectedFilm
                    }] : [{user: user.uid, film: selectedFilm}];
                    return {...r, filmSuggestions: updatedFilms};
                } else {
                    return r;
                }
            });

            await updateDoc(clubRef, {rounds: updatedRounds});
            console.log("Firestore updated successfully");
        } catch (error) {
            console.error("Error updating Firestore:", error);
            console.log(selectedFilm);
        }
    };


    const voteSubmit = async (clubId, round, user, votesData) => {
        try {
            if (!round) {
                console.error("Round not defined");
                return;
            }

            if (!votesData) {
                console.error("No votes submitted");
                return;
            }

            const firestore = getFirestore();
            const clubRef = doc(firestore, 'clubs', clubId);

            //get the specific round based on round id
            const updatedRounds = club.rounds.map(r => {
                if (r.roundId === round.roundId) {
                    // If films array exists, append the new film, otherwise create a new array
                    const updatedVotes = r.votes ? [...r.votes, {
                        user: user.uid,
                        votes: votesData
                    }] : [{user: user.uid, votes: votesData}];
                    return {...r, votes: updatedVotes};
                } else {
                    return r;
                }
            });

            await updateDoc(clubRef, {rounds: updatedRounds});
            console.log("Firestore updated successfully");
        } catch (error) {
            console.error("Error updating Firestore:", error);
            console.log(votesData);
        }
    }


    useEffect(() => {
        if (round && round.filmSuggestions) {
            const fetchDetails = async () => {
                for (const film of round.filmSuggestions) {
                    // Use searchFilmDetails from the hook to fetch film details
                    await searchFilmDetails(film.film.id);
                }
            };

            fetchDetails();

        } else {
            return undefined;
        }
    }, [round.filmSuggestions]);


    useEffect(() => {
        if (round && round.filmSuggestions) {
            const fetchDetails = async () => {
                for (const film of round.filmSuggestions) {
                    // Use searchFilmDetails from the hook to fetch film details
                    await searchFilmDetailsMore(film.film.id);
                }
            };

            fetchDetails();

        } else {
            return undefined;
        }
    }, [round.filmSuggestions]);


    const advanceRoundStage = async (clubId, round) => {
        try {
            if (!round) {
                console.error("Round not defined");
                return;
            }

            const firestore = getFirestore();
            const clubRef = doc(firestore, 'clubs', clubId);

            //get the specific round based on round id
            const updatedRounds = club.rounds.map(r => {
                if (r.roundId === round.roundId) {
                    return {...r, currentStage: round.currentStage + 1};
                } else {
                    return r;
                }
            });

            await updateDoc(clubRef, {rounds: updatedRounds});
            console.log("Firestore updated successfully");
        } catch (error) {
            console.error("Error updating Firestore:", error);
        }
    };


    const renderTabComponent = () => {
        switch (activeTab) {
            case 'RoundTheme':
                return round && members && members.length > 0 ?
                    <RoundTheme
                        members={members}
                        round={round}
                        clubId={clubId}
                        club={club}
                        user={user}
                        message={message}
                        onMemberSelected={setSelectedMemberId}
                        updateMemberWhoSuggestedTheme={updateMemberWhoSuggestedTheme}
                        onUpdateRoundTheme={(theme) => updateRoundTheme(clubId, round, theme)}
                        advanceRoundStage={() => advanceRoundStage(clubId, round)}
                    />
                    : null;
            case 'RoundFilms':
                return round && members && members.length > 0 ?
                    <RoundFilms round={round}
                                user={user}
                                club={club}
                                members={members}
                                onFilmSubmission={(selectedFilm) => submitFilmSuggestion(clubId, round, user, selectedFilm)}
                                advanceRoundStage={() => advanceRoundStage(clubId, round)}/> : null;
            case 'RoundVoting':
                return round && members && members.length > 0 ?
                    <RoundVoting round={round}
                                 user={user}
                                 club={club}
                                 members={members}
                                 onVoteSubmit={(votesData) => voteSubmit(clubId, round, user, votesData)}
                                 advanceRoundStage={() => advanceRoundStage(clubId, round)}
                    /> : null;
            case 'RoundResults':
                return round && members && members.length > 0 && fetchedFilms ?
                    <RoundResults members={members}
                                  round={round}
                                  clubId={clubId}
                                  club={club}
                                  fetchedFilms={fetchedFilms}
                                  fetchedFilmsMore={fetchedFilmsMore}
                                  advanceRoundStage={() => advanceRoundStage(clubId, round)}/> : null;
            default:
                return round && members && members.length > 0 ?
                    <RoundTheme
                        members={members}
                        round={round}
                        clubId={clubId}
                        club={club}
                        user={user}
                        onMemberSelected={setSelectedMemberId}
                        updateMemberWhoSuggestedTheme={updateMemberWhoSuggestedTheme}
                        onUpdateRoundTheme={(theme) => updateRoundTheme(clubId, round, theme)}
                        advanceRoundStage={() => advanceRoundStage(clubId, round)}
                    />
                    : null;
        }
    };


    return (
        <>
            <TopNavbar/>
            <div className={"dashboard-container"}>
                <ClubHeading clubBackground={clubBackground}/>
                <ClubInfo club={club} members={members}/>
                <div style={{backgroundColor: '#f1f1f1', marginTop: '1rem', width: '100%'}}>
                    <h1 style={{marginLeft: '1rem'}}>Round {round.roundNumber} </h1>
                    <p style={{marginLeft: '1rem'}}>
                        {round.roundTheme ? round.roundTheme : "No theme selected yet"}
                    </p>
                </div>
                <NavbarRound setActiveTab={setActiveTab}/>
                {renderTabComponent()}
                <Footer/>
            </div>

        </>
    )
}

export default RoundPage;