import React, {useEffect, useState} from "react";
import {FaHeartBroken, FaLock} from "react-icons/fa";
import RoundsVotesAgainst from "./RoundsVotesAgainst";
import RoundsVotesInFavour from "./RoundsVotesInFavour";
import {AiFillHeart} from "react-icons/ai";

const RoundVoting = ({round, user, onVoteSubmit, club, members, advanceRoundStage}) => {
    const [votesData, setVotesData] = useState({});
    const [numberOfUpvotes, setNumberOfUpvotes] = useState(0);
    const [numberOfDownvotes, setNumberOfDownvotes] = useState(0);
    const [numberOfUpvotesUsed, setNumberOfUpvotesUsed] = useState(0);
    const [numberOfDownvotesUsed, setNumberOfDownvotesUsed] = useState(0);
    const [usersWhoSubmitted, setUsersWhoSubmitted] = useState([])
    const [usersWhoSubmittedNames, setUsersWhoSubmittedNames] = useState([]);
    const [currentVotes, setCurrentVotes] = useState({});

    const initialUpvotes = (round.filmSuggestions.length - 1);
    const initialDownvotes = (round.filmSuggestions.length - 1);
    const userId = user.uid;

    useEffect(() => {
        setNumberOfUpvotes(initialUpvotes);
        setNumberOfDownvotes(initialDownvotes);
    }, [round.filmSuggestions, club.clubNumberVotes, club.clubNumberDownvotes]);

    const upvotesCounter = () => {
        return Object.values(votesData).reduce((sum, data) => sum + (data.upvotes || 0), 0);
    }

    const downvotesCounter = () => {
        return Object.values(votesData).reduce((sum, data) => sum + (data.downvotes || 0), 0);
    }

    useEffect(() => {
        setNumberOfUpvotesUsed(upvotesCounter());
        setNumberOfDownvotesUsed(downvotesCounter());
    }, [votesData]);

    useEffect(() => {
        setNumberOfUpvotes(initialUpvotes - numberOfUpvotesUsed);
        setNumberOfDownvotes(initialDownvotes - numberOfDownvotesUsed);
    }, [numberOfUpvotesUsed, numberOfDownvotesUsed]);

    useEffect(() => {
        console.log(numberOfUpvotes);
        console.log(numberOfDownvotes);
    }, [numberOfUpvotes, numberOfDownvotes]);

    const handleInputChange = (filmId, inputName, inputValue) => {
        setVotesData((prevData) => {
            const filmData = prevData[filmId] || {upvotes: 0, downvotes: 0};

            filmData[inputName] = inputValue;

            const updatedVotesData = {
                ...prevData,
                [filmId]: filmData,
            };

            return updatedVotesData;
        });
    };

    useEffect(() => {
        const getSubmittedVotes = () => {
            if (round.votes && round.votes.length > 0) {
                const currentUserVote = round.votes.find(ballot => ballot.user === user.uid);
                const usersWhoSubmitted = round.votes.map(ballot => ballot.user);
                setUsersWhoSubmitted(usersWhoSubmitted);

                if (currentUserVote) {
                    setCurrentVotes(currentUserVote.votes);
                    console.log("User's current votes:", currentUserVote.votes);
                } else {
                    // The current user has not submitted a film suggestion
                    console.log("User has not submitted their voting");
                }
            } else {
                console.log("No votes have been submitted yet.");
            }
        };

        getSubmittedVotes();

    }, [round.votes]);



    useEffect(() => {
    const getUsersWhoSubmittedNames = () => {
        if (usersWhoSubmitted) {
            const names = members
                .filter(member => usersWhoSubmitted.includes(member.id))
                .map(member => member.userData.avatar);
            setUsersWhoSubmittedNames(names);
        }
    }
    getUsersWhoSubmittedNames();

}, [usersWhoSubmitted]);


const handleSubmitVotes = () => {
    if (votesData && Object.keys(votesData).length > 0) {
        const newVotesData = Object.entries(votesData).map(([filmId, data]) => {
            return {
                filmId,
                ...data,
                userId,
            };
        });

        // Call onVoteSubmit with the newVotesData
        onVoteSubmit(newVotesData);
    } else {
        alert("Please use all your votes before submitting.");
    }
};

    if(usersWhoSubmitted && usersWhoSubmitted.length > 0) {
console.log('USERS', usersWhoSubmitted)
    }


return (
    <>
        {round.currentStage >= 3 ? (
            <div style={{backgroundColor: '#f1f1f1', width: '100%'}}>
                <h2 style={{margin: '3rem 1rem 1rem 1rem', textAlign: 'center'}}>Vote on your favourites!</h2>
                <p style={{
                    fontSize: '1.2rem',
                    textAlign: 'center'
                }}>{numberOfUpvotes} upvotes <AiFillHeart
                    style={{marginLeft: '0.3rem'}}/> remaining.</p>
                {club.clubNumberDownvotes > 0 ? (
                    <p style={{
                        fontSize: '1.2rem',
                        textAlign: 'center'
                    }}>{numberOfDownvotes} downvotes <FaHeartBroken
                        style={{marginLeft: '0.3rem'}}/> remaining.</p>) : null}
                {round.filmSuggestions && round.filmSuggestions.length > 0 ? (
                    <>
                        {round.filmSuggestions.map((suggestion) => (
                            <div key={suggestion.film.id} style={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor: '#848FA5',
                                color: '#fff',
                                margin: '1rem'
                            }}>
                                <div style={{
                                    margin: '1rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    textAlign: 'center'
                                }}>
                                    <h2>{suggestion.film.title} ({suggestion.film.release_date.slice(0, 4)})</h2>
                                    <img style={{width: '50vw', margin: '1rem auto'}}
                                         src={`https://image.tmdb.org/t/p/w500${suggestion.film.poster_path}`}
                                         alt="Selected Film Poster"/>
                                    <RoundsVotesInFavour
                                        filmId={suggestion.film.id}
                                        onChange={(inputName, inputValue) => {
                                            handleInputChange(suggestion.film.id, inputName, inputValue)
                                        }}

                                        initialUpvotes={initialUpvotes}
                                        numberOfUpvotesUsed={numberOfUpvotesUsed}
                                    />
                                    <RoundsVotesAgainst
                                        filmId={suggestion.film.id}
                                        onChange={(inputName, inputValue) => {
                                            handleInputChange(suggestion.film.id, inputName, inputValue);
                                        }}

                                        initialDownvotes={initialDownvotes}
                                        numberOfDownvotesUsed={numberOfDownvotesUsed}
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                ) : null}
                <div style={{display: 'flex', justifyContent: 'center', margin: '1rem'}}>
                    {round.currentStage < 4 && usersWhoSubmitted && usersWhoSubmitted.includes(user.uid) === false ? (
                            <>
                        <button
                            className={'create-club-button'}
                            onClick={handleSubmitVotes}
                            style={{padding: '0.5rem', width: '100%', marginBottom: '1rem'}}
                        >Submit Votes</button>
                            </>
                    ) : (
                        <div style={{backgroundColor: '#D9D9D9', margin: '1rem'}}>
                            <p style={{
                                margin: '1rem 1rem 1rem 1rem',
                                textAlign: 'center',
                                padding: '1rem 0'
                            }}>You've already voted in this round. Submitted votes are final.</p>
                        </div>
                    )
                    }
                </div>
                {usersWhoSubmitted && usersWhoSubmitted.length > 0 ? (
                    <div style={{margin: '1rem', textAlign: 'center'}}>
                        <h3>Already submitted</h3>
                        {usersWhoSubmittedNames.map((avatar, index) => (
                            <img className={'profile-pic'} src={avatar}
                                 style={{margin: '0.5rem 0.5rem', width: '2.5rem', height: '2.5rem'}}/>
                        ))}
                    </div>
                ) : null}
                {club.clubAdminId === user.uid && round.currentStage === 3 ? (
                    <div style={{margin: '1rem'}}>
                        <p style={{margin: '1rem', textAlign: 'center'}}>
                            If everyone has submitted their votes already, you can advance to the next stage.
                        </p>
                        <button
                            className={'create-club-button'}
                            onClick={advanceRoundStage}
                            style={{padding: '0.5rem', width: '100%', marginBottom: '1rem'}}
                        >
                            To Stage 4
                        </button>
                    </div>
                ) : null
                }
            </div>
        ) : (
            <div style={{backgroundColor: '#f1f1f1', width: '100%', textAlign: 'center'}}>
                <div style={{backgroundColor: '#D9D9D9', margin: '1rem'}}>
                    <FaLock style={{color: '#000', margin: '1rem auto 0 auto'}} size={50}/>
                    <h2 style={{margin: '1rem 1rem 1rem 1rem', textAlign: 'center', padding: '1rem 0'}}>This
                        stage has not yet started.</h2>
                </div>
            </div>
        )
        }

    </>
)
    ;
}

export default RoundVoting;