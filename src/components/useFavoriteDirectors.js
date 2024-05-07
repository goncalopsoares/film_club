import {useUserContext} from "../context/UserContext";

const useFavoriteDirectors = () => {
    const {favoriteDirectors, setFavoriteDirectors} = useUserContext();


    const addFavoriteDirector = (director) => {
        if (favoriteDirectors && !favoriteDirectors.includes(director) && favoriteDirectors.length < 4) {
            setFavoriteDirectors([...favoriteDirectors, director]);
        }
    };

    const deleteFavoriteDirector = (index) => {
        setFavoriteDirectors(favoriteDirectors.filter((_, i) => i !== index));
    };

    return {favoriteDirectors, addFavoriteDirector, deleteFavoriteDirector};
}


export default useFavoriteDirectors;