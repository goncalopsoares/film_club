import {useUserContext} from "../context/UserContext";

export default function useFavoriteFilms() {
    const {favoriteFilms, setFavoriteFilms} = useUserContext();
    const {setBackdrop} = useUserContext();

    const addFavoriteFilm = (film) => {
        if (!favoriteFilms.includes(film) && favoriteFilms.length < 4) {
            setFavoriteFilms([...favoriteFilms, film]);
        }
        if (favoriteFilms.length < 1) {
            setBackdrop(`https://image.tmdb.org/t/p/original${film.backdrop_path}`);
        }
    };

    const deleteFavoriteFilm = (index) => {
        setFavoriteFilms(favoriteFilms.filter((_, i) => i !== index));
    };

    return {favoriteFilms, addFavoriteFilm, deleteFavoriteFilm};
}
