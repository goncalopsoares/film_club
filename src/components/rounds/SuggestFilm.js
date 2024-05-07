import React, {useState} from 'react';
import useFilmSearch from '../useFilmSearch';

const SuggestFilm = ({onFilmSelection}) => {
    const {films, searchFilms} = useFilmSearch();
    const [filmForSubmission, setFilmForSubmission] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayResults, setDisplayResults] = useState(false);

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchTerm(value);
        setDisplayResults(true);
        if (value.length > 1) {
            void searchFilms(value);
        }
    };

    const displayedFilms = films.slice(0, 10);

    const handleFilmSelection = (selectedFilm) => {
        console.log('Selected Film:', selectedFilm);
        onFilmSelection(selectedFilm)
        setDisplayResults(false);
    };

    return (
        <>
            <div style={{ margin: '2.5rem 1rem 1rem 1rem', textAlign: 'center' }}>
                <label>
                    Suggest a film for this round
                    <input
                        className="rounded-input"
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search films..."
                    />
                </label>
            </div>
            <div className="film-results" style={{ margin: '1rem', textAlign: 'center' }}>
                {displayResults && displayedFilms.map((film, index) => (
                    <React.Fragment key={film.id}>
                        {index === 0 && <p>Click on a film to select it</p>}
                        <button
                            key={film.id}
                            className="film-button"
                            onClick={() => handleFilmSelection(film)}
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${film.poster_path})`,
                                backgroundSize: 'cover',
                                width: '100%',
                                height: '12vh',
                                border: 'none',
                                marginTop: '0.5rem',
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '0.5rem',
                                }}
                            >
                                {film.title.length < 30 ? (
                                    <>
                                        <p style={{ color: '#fff', fontSize: '1.2rem', margin: '1rem 0.5rem 0 0.5rem' }}>
                                            {film.title} ({film.release_date && film.release_date.substring(0, 4)})
                                        </p>
                                        <p style={{ color: '#fff', margin: '0 0.5rem 1rem 0.5rem', fontSize: '0.8rem' }}>
                                            <b>Original language and title</b> {film.original_language} | {film.original_title}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p style={{ color: '#fff', fontSize: '1rem', margin: '0.5rem 0.5rem 0 0.5rem' }}>
                                            {film.title} ({film.release_date && film.release_date.substring(0, 4)})
                                        </p>
                                        <p style={{ color: '#fff', margin: '0 0.5rem 0.5rem 0.5rem', fontSize: '0.8rem' }}>
                                            <b>Original language and title</b> {film.original_language} | {film.original_title}
                                        </p>
                                    </>
                                )}
                            </div>
                        </button>
                    </React.Fragment>
                ))}
            </div>
        </>

    );
};

export default SuggestFilm;
