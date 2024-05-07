import React from 'react';
import {BsExclamationSquareFill} from "react-icons/bs";

const DisplayFavoriteFilms = ({favoriteFilms, deleteFavoriteFilm}) => {
    return (
        <div className="create-profile-favourite-films">
            {favoriteFilms && favoriteFilms.map((film, index) => (
                <div key={index} style={{display: "inline-block"}}>
                    <button style={{
                        border: "2px solid white",
                        borderRadius: "5px",
                        padding: "0",
                        margin: "0 0.4rem 0 0.4rem"
                    }}
                            onClick={() => deleteFavoriteFilm(index)}>
                        {film.poster_path ? (
                            <img style={{width: "18.5vw"}} src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                 alt={film.title}/>
                        ) : (
                            <div style={{
                                width: "18.5vw",
                                height: "25vh",
                                backgroundColor: "grey",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <span style={{color: "white"}}>No Poster Available</span>
                            </div>
                        )}
                    </button>

                </div>
            ))}
            {favoriteFilms && favoriteFilms.length > 0 ? (
                <p className="hint hint-info-2"><BsExclamationSquareFill size={20} style={{marginRight: '1rem'}}/> Click
                    on a film card to remove it.</p>
            ) : (
                <p className="hint hint-info"><BsExclamationSquareFill size={20} style={{marginRight: '1rem'}}/> No
                    favourite
                    films selected yet. Pick up to 4!</p>
            )}
        </div>
    );
};

export default DisplayFavoriteFilms;