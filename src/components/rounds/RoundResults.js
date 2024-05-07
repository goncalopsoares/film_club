import React, {useEffect, useState} from "react";
import {FaHeartBroken, FaLock} from "react-icons/fa";
import {AiFillHeart} from "react-icons/ai";

const RoundResults = ({round, members, club, clubId, fetchedFilms, fetchedFilmsMore}) => {

    const [filmVotes, setFilmVotes] = useState({})
    const [filmVotesArray, setFilmVotesArray] = useState([])
    const [membersMapping, setMembersMapping] = useState({});


    console.log('fetchedfilms', fetchedFilms);
    console.log('fetchedfilmsmore', fetchedFilmsMore);


    useEffect(() => {
        if (round && round.votes && round.votes.length > 0) {
            const filmVotes = {};

            round.votes.forEach((vote) => {
                vote.votes.forEach((voteDetail) => {
                    const {filmId, upvotes, downvotes, userId} = voteDetail;

                    if (!filmVotes[filmId]) {
                        filmVotes[filmId] = {
                            upvotes: 0,
                            downvotes: 0,
                            upvoteUsers: [],
                            downvoteUsers: [],
                        };
                    }

                    filmVotes[filmId].upvotes += upvotes;
                    filmVotes[filmId].downvotes += downvotes;

                    if (upvotes > 0) {
                        filmVotes[filmId].upvoteUsers.push({userId: userId, upvotes: upvotes});
                    }

                    if (downvotes > 0) {
                        filmVotes[filmId].downvoteUsers.push({userId: userId, downvotes: downvotes});
                    }
                });
            });

            setFilmVotes(filmVotes);
        }
    }, [round]);


    useEffect(() => {
        const filmVotesArray = Object.entries(filmVotes).map(([filmId, data]) => ({
            filmId,
            ...data,
        }));

        setFilmVotesArray(filmVotesArray);


    }, [filmVotes]);


    useEffect(() => {
        const membersMapping = members.reduce((mapping, member) => {
            mapping.avatar[member.id] = member.userData.avatar;
            mapping.name[member.id] = member.userData.name;
            return mapping;
        }, {avatar: {}, name: {}});

        setMembersMapping(membersMapping);
    }, [members]);


    const filmDetails = round.filmSuggestions.map((film) => ({
        filmId: film.film.id,
        title: film.film.title,
        originalTitle: film.film.original_title,
        language: film.film.original_language,
        overview: film.film.overview,
        posterPath: film.film.poster_path,
        releaseDate: film.film.release_date,
        voteAverage: film.film.vote_average,
        userWhoSubmitted: film.user,
    }));


    return (
        <>
            {round.currentStage === 4 ? (
                    <>
                        <div style={{backgroundColor: '#f1f1f1', width: '100%'}}>
                            <h2 style={{margin: '3rem 1rem 1rem 1rem', textAlign: 'center'}}>The results are on!</h2>
                            <div>
                                {filmDetails && filmDetails.length > 0 && Object.keys(fetchedFilms).length === filmDetails.length && Object.keys(fetchedFilmsMore).length === filmDetails.length ? (
                                    <>
                                        {filmVotesArray
                                            .sort((a, b) => b.upvotes - a.upvotes) // Sort in descending order based on upvotes
                                            .map((filmVote) => {

                                                const filmDetail = filmDetails.find((film) => film.filmId === Number(filmVote.filmId));
                                                const fetchedFilmDetail = fetchedFilms[Number(filmVote.filmId)];
                                                const fetchedFilmDetailMore = fetchedFilmsMore[Number(filmVote.filmId)];

                                                return (
                                                    <div key={filmVote.filmId} style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        backgroundColor: '#848FA5',
                                                        color: '#fff',
                                                        margin: '1rem'
                                                    }}>
                                                        <div style={{
                                                            margin: '1rem',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center'
                                                        }}>
                                                            <div style={{
                                                                borderBottom: '1px solid #ccc',
                                                                width: '100%',
                                                                textAlign: 'center',
                                                            }}>
                                                                <h2 style={{textAlign: 'center'}}>{filmDetail.title} ({filmDetail.releaseDate.slice(0, 4)})</h2>
                                                                <p style={{
                                                                    fontSize: '1rem',
                                                                    marginBottom: '0.5rem',
                                                                    marginTop: '0.3rem'
                                                                }}>Original Language and Title</p>
                                                                <p style={{marginTop: '0.3rem'}}>[{filmDetail.language}] <b>{filmDetail.originalTitle}</b>
                                                                </p>
                                                            </div>
                                                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                                                <ul style={{padding: 0}}>
                                                                    {fetchedFilmDetail.crew
                                                                        .filter(crewMember => (
                                                                            crewMember.job === 'Director' ||
                                                                            crewMember.job === 'Writer' ||
                                                                            crewMember.job === 'Screenplay' ||
                                                                            crewMember.job === 'Editor'
                                                                        ))
                                                                        .map((crewMember, index) => (
                                                                            <li style={{
                                                                                listStyle: 'none',
                                                                                marginTop: '0.5rem'
                                                                            }}
                                                                                key={index}>
                                                                                <b>{crewMember.job}</b> {crewMember.name}
                                                                            </li>
                                                                        ))}
                                                                </ul>
                                                            </div>
                                                            <img style={{width: '50vw', margin: '1rem auto'}}
                                                                 src={`https://image.tmdb.org/t/p/w500${filmDetail.posterPath}`}
                                                                 alt="Selected Film Poster"/>
                                                            <div style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between'
                                                            }}>
                                                                {fetchedFilmDetailMore.genres.map((genre, index) => (
                                                                    <p style={{fontSize: '1rem', margin: '0 0.5rem'}}
                                                                       key={index}>{genre.name}</p>
                                                                ))}
                                                            </div>
                                                            <p style={{
                                                                fontSize: '1rem',
                                                                margin: '0.5rem 0'
                                                            }}>{fetchedFilmDetailMore.runtime} minutes</p>
                                                            <p style={{fontSize: '1.2rem'}}>TMDB User
                                                                Score <b>{fetchedFilmDetailMore.vote_average}</b></p>
                                                            <div style={{
                                                                borderTop: '1px solid #ccc',
                                                                borderBottom: '1px solid #ccc',
                                                                width: '100%',
                                                                textAlign: 'center',
                                                            }}>
                                                                <p style={{
                                                                    fontSize: '1.1rem'
                                                                }}>Submitted
                                                                    by <b>{membersMapping.name[filmDetail.userWhoSubmitted]}</b>
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                margin: '0 auto'
                                                            }}>
                                                            <h2 style={{margin: '1rem'}}><AiFillHeart
                                                                style={{marginRight: '0.5rem'}}/> {filmVote.upvotes}
                                                            </h2>
                                                            <h2 style={{margin: '1rem'}}><FaHeartBroken
                                                                style={{marginRight: '0.5rem'}}/> {filmVote.downvotes}
                                                            </h2>
                                                        </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            margin: 'auto'
                                                        }}>
                                                            {filmVote.upvoteUsers.map((user) => (
                                                                <div key={user.userId} style={{textAlign: 'center'}}>
                                                                    <img style={{
                                                                        width: '3rem',
                                                                        borderRadius: '50%',
                                                                        margin: '0.5rem'
                                                                    }}
                                                                         src={membersMapping.avatar[user.userId]}
                                                                         alt={`Avatar of ${user.userId}`}/>
                                                                    <p style={{margin: '0.1rem 1rem 1rem 1rem'}}>{user.upvotes}
                                                                        <AiFillHeart
                                                                            style={{marginLeft: '0.3rem'}}/>
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            margin: 'auto'
                                                        }}>
                                                            {filmVote.downvoteUsers.map((user) => (
                                                                <div key={user.userId} style={{textAlign: 'center'}}>
                                                                    <img style={{
                                                                        width: '3rem',
                                                                        borderRadius: '50%',
                                                                        margin: '0.5rem'
                                                                    }}
                                                                         src={membersMapping.avatar[user.userId]}
                                                                         alt={`Avatar of ${user.userId}`}/>
                                                                    <p>{user.downvotes} <FaHeartBroken
                                                                        style={{marginLeft: '0.3rem'}}/>
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                                    ;
                                            })}
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </>

                ) :
                (
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
};

export default RoundResults;
