import React, {useState} from 'react';
import useFilmSearch from "../useFilmSearch";
import DisplayFavoriteFilms from "./DisplayFavoriteFilms";

const FilmPicker = ({favoriteFilms, addFavoriteFilm, deleteFavoriteFilm}) => {

    const {films, searchFilms} = useFilmSearch();
    const [searchTerm, setSearchTerm] = useState('');


    const handleChange = (e) => {
        const {value} = e.target;
        setSearchTerm(value);
        if (value.length > 1) {
            void searchFilms(value);
        }
    };

    const handleBlur = (e) => {
        const {value} = e.target;

        const titleMatch = value.match(/^\s*(.*?)\s+\(/);
        const selectedFilmTitle = titleMatch ? titleMatch[1] : value;

        const selectedFilm = films.find(film => film.title === selectedFilmTitle);
        if (selectedFilm) {
            addFavoriteFilm(selectedFilm);
        }

        setTimeout(() => {
            e.target.value = '';
        }, 0);
    };


    return (
        <div style={{padding: ' 0 1rem'}}>
            <label className="create-profile-label">
                What are your favourite films?
                <input
                    className="rounded-input"
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    list="filmSuggestions"
                />
                <datalist id="filmSuggestions">
                    {films.map((film) => (
                        <option key={film.id} value={film.title}
                                label={`${film.original_title} (${film.release_date.substring(0, 4)})`}/>
                    ))}
                </datalist>
            </label>
            <DisplayFavoriteFilms favoriteFilms={favoriteFilms} deleteFavoriteFilm={deleteFavoriteFilm} />
        </div>
    );
};

export default FilmPicker;
