import React, {useState} from 'react';
import useDirectorSearch from "../useDirectorSearch";
import useFavoriteDirectors from "../useFavoriteDirectors";
import DisplayFavoriteDirectors from "./DisplayFavoriteDirectors";

const DirectorPicker = () => {
    const {favoriteDirectors, addFavoriteDirector, deleteFavoriteDirector} = useFavoriteDirectors();
    const {directors, searchDirectors} = useDirectorSearch();
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchTerm(value);
        if (value.length > 2) {
            void searchDirectors(value);
        }
    };

    const handleBlur = (e) => {
        const {value} = e.target;

        const selectedDirectorName = value.trim();

        const selectedDirector = directors.find(director => director.name === selectedDirectorName);
        if (selectedDirector) {
            addFavoriteDirector(selectedDirector);
        }

        setTimeout(() => {
            e.target.value = '';
        }, 0);
    };

    return (
        <div style={{padding: '1rem'}}>
            <label className="create-profile-label">
                What are your favourite film personalities?
                <input
                    className="rounded-input"
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    list="directorSuggestions"
                />
                <datalist id="directorSuggestions">
                    {directors.map((director) => (
                        <option key={director.id} value={director.name}
                                label={`${director.known_for_department}`}/>
                    ))}
                </datalist>
            </label>
            <DisplayFavoriteDirectors favoriteDirectors={favoriteDirectors} deleteFavoriteDirector={deleteFavoriteDirector}/>
        </div>
    );
};

export default DirectorPicker;
