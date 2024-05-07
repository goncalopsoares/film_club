import React from 'react';
import {useUserContext} from '../context/UserContext';
import ProfileBackdrop from "../components/create-profile/ProfileBackdrop";
import ProfilePicture from "../components/create-profile/ProfilePicture";
import TopNavbar from "../components/TopNavbar";

const UserProfile = () => {
    const user = useUserContext();

    console.log(user)

    return (
        <div style={{minHeight: '100vh'}} className="profile-background">
            <TopNavbar/>
            <ProfileBackdrop background={user.backdrop}/>
            <ProfilePicture profilePic={user.avatar} style={{top: '23vh', left: '23vw'}}/>
            <div style={{
                display: 'flex',
                justifyContent: 'end',
                padding: '1rem',
                marginTop: '0',
                alignItems: 'center'
            }}>
                <p style={{fontSize: '2rem', marginTop: 0, fontWeight: 'bold'}}>{user.name}</p>
                <p style={{
                    marginLeft: '1.5rem',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    marginTop: 0,
                    color: 'rgb(164 162 162)'
                }}>{user.country}</p>
            </div>
            <div style={{
                padding: '1rem 0.8rem',
                fontSize: '1.1rem',
                margin: '0 1rem',
                textAlign: 'center',
                borderTop: '1px solid #ccc', // Top border style
                borderBottom: '1px solid #ccc' // Bottom border style
            }}>
                <p style={{margin: '1rem'}}>{user.bio}</p>
            </div>

            {user.favoriteFilms.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                }}>
                    <h2>Favorite Films</h2>
                    <div style={{display: 'flex', justifyContent: 'star'}}>
                        {user.favoriteFilms.slice(0, 4).map((film, index) => (
                            <div key={index}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                    alt={film.title}
                                    style={{width: '20vw', margin: '0.3rem'}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {user.favoriteDirectors.length > 0 && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                }}>
                    <h2 style={{marginTop: '1.5rem'}}>Favorite Personalities</h2>
                    <div style={{display: 'flex', justifyContent: 'start'}}>
                        {user.favoriteDirectors.slice(0, 4).map((director, index) => (
                            <div key={index}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${director.profile_path}`}
                                    alt={director.name}
                                    style={{width: '20vw', margin: '0.3rem'}}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};


export default UserProfile;
