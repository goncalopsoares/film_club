import SuggestFilm from "./SuggestFilm";
import {useEffect, useState} from "react";
import React from "react";
import {FaLock} from "react-icons/fa";

const RoundFilms = ({round, user, onFilmSubmission, advanceRoundStage, club, members}) => {

    const [selectedFilm, setSelectedFilm] = useState(null)
    const [usersWhoSubmitted, setUsersWhoSubmitted] = useState(null)
    const [usersWhoSubmittedNames, setUsersWhoSubmittedNames] = useState([]);


    const handleFilmSelection = (film) => {
        setSelectedFilm(film);
    };


    useEffect(() => {
        const getSubmitedSuggestion = () => {
            const currentUserFilm = round.filmSuggestions.find(suggestion => suggestion.user === user.uid);
            const usersWhoSubmitted = round.filmSuggestions.map(suggestion => suggestion.user);
            setUsersWhoSubmitted(usersWhoSubmitted);

            if (currentUserFilm) {
                setSelectedFilm(currentUserFilm.film)
                console.log("User's film suggestion:", currentUserFilm.film);
            } else {
                // The current user has not submitted a film suggestion
                console.log("User has not submitted a film suggestion");
            }
        }
        getSubmitedSuggestion();
    }, [round.filmSuggestions]);


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


    console.log(members)

    const handleFilmSubmission = () => {
        if (selectedFilm) {
            onFilmSubmission(selectedFilm);
            console.log(selectedFilm)
        } else {
            alert("Please enter a valid film before submitting.");
        }
    };

    return (
        <>
            {round.currentStage >= 2 ? (
                <div style={{backgroundColor: '#f1f1f1', width: '100%'}}>
                    <h2 style={{margin: '3rem 1rem 1rem 1rem', textAlign: 'center'}}>Your suggestion for this round</h2>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#848FA5',
                        color: '#fff',
                        margin: '1rem'
                    }}>
                        {selectedFilm !== null ? (
                            <>
                                <div style={{display: "flex", flexDirection: 'column'}}>
                                    <h3 style={{margin: '1rem auto'}}
                                        className='animated-text'>{selectedFilm.title} ({selectedFilm.release_date && selectedFilm.release_date.substring(0, 4)})</h3>
                                    <img style={{width: '40vw', margin: '0 auto 1rem auto'}}
                                         src={`https://image.tmdb.org/t/p/w500${selectedFilm.poster_path}`}
                                         alt="Selected Film Poster"/>
                                </div>
                            </>
                        ) : (
                            <h3 className='animated-text'>{"You haven't made a suggestion yet"}</h3>
                        )}
                    </div>
                    <div style={{margin: '1rem '}}>
                        {round.currentStage < 3 ? (
                            <button
                                className={'create-club-button'}
                                onClick={handleFilmSubmission}
                                style={{padding: '0.5rem', width: '100%', marginBottom: '1rem'}}
                            >
                                Submit Film
                            </button>
                        ) : (
                            <div style={{backgroundColor: '#D9D9D9', margin: '1rem'}}>
                                <p style={{
                                    margin: '1rem 1rem 1rem 1rem',
                                    textAlign: 'center',
                                    padding: '1rem 0'
                                }}>Film submissions are closed for this round.</p>
                            </div>
                        )}
                    </div>
                    {round.currentStage < 3 ? (
                        <SuggestFilm onFilmSelection={handleFilmSelection}/>
                    ) : null}
                    <div style={{margin: '3rem 1rem 1rem 1rem', textAlign: 'center'}}>
                        {usersWhoSubmitted && usersWhoSubmitted.length > 0 ? (
                            <>
                                <h3>Already submitted</h3>
                                {usersWhoSubmittedNames.map((avatar, index) => (
                                    <img className={'profile-pic'} src={avatar}
                                         style={{margin: '0.5rem 0.5rem', width: '2.5rem', height: '2.5rem'}}/>
                                ))}
                            </>
                        ) : null}

                        {club.clubAdminId === user.uid && round.currentStage === 2 ? (
                            <>
                                <p style={{margin: '1rem', textAlign: 'center'}}>
                                    If everyone has submitted a film suggestion, you can move on to the next stage.
                                </p>
                                <button
                                    className={'create-club-button'}
                                    onClick={advanceRoundStage}
                                    style={{padding: '0.5rem', width: '100%', marginBottom: '1rem'}}
                                >
                                    To Stage 3
                                </button>
                            </>
                        ) : null
                        }
                    </div>
                </div>
            ) : (
                <div style={{backgroundColor: '#f1f1f1', width: '100%', textAlign: 'center'}}>
                    <div style={{backgroundColor: '#D9D9D9', margin: '1rem'}}>
                        <FaLock style={{color: '#000', margin: '1rem auto 0 auto'}} size={50}/>
                        <h2 style={{margin: '1rem 1rem 1rem 1rem', textAlign: 'center', padding: '1rem 0'}}>This
                            stage
                            has not yet started.</h2>
                    </div>
                </div>
            )}

        </>
    );

}

export default RoundFilms;