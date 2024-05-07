import React from 'react';
import {BsExclamationSquareFill} from "react-icons/bs";

const DisplayFavoriteDirectors = ({ favoriteDirectors, deleteFavoriteDirector }) => {
    return (
        <div className="create-profile-favourite-films">
            {favoriteDirectors && favoriteDirectors.map((director, index) => (
                <div key={index} style={{display: "inline-block"}}>
                    <button style={{border: "2px solid white", borderRadius: "5px", padding: "0", margin: "0 0.4rem 0 0.4rem"}}
                            onClick={() => deleteFavoriteDirector(index)}>
                        <img style={{width: "18.5vw"}}
                             src={`https://image.tmdb.org/t/p/w500${director.profile_path}`} alt={director.name}/>
                    </button>
                </div>
            ))}
            {favoriteDirectors && favoriteDirectors.length > 0 ? (
                <p className="hint hint-info-2"><BsExclamationSquareFill size={20} style={{ marginRight: '1rem' }}/> Click on a person card to remove it.</p>
            ) : (
                <p className="hint hint-info"><BsExclamationSquareFill size={20} style={{ marginRight: '1rem' }}/> No favourite personalities selected yet. Pick up to 4!</p>
            )}
        </div>
    );
};

export default DisplayFavoriteDirectors;