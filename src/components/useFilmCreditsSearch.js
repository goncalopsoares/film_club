import React, {useState} from 'react';

const useFilmCreditsSearch = () => {
    const [fetchedFilms, setFetchedFilms] = useState({});

    const searchFilmDetails = async (filmId) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTllMGMxNDg5YmFjZDIwYjVlYjU2N2E2NTAwYmY3MCIsInN1YiI6IjY0MmM3ZDdiOGI5NTllMDA5N2E0Y2RjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c0woXmJ-MJSo8YDNwK6VG7RokYgJYhxCnAcl9KWzvVc',
            },
        };

        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits`, options);
            const data = await response.json();

            console.log('API Response:', data);

            if (data) {
                setFetchedFilms((prevFilms) => ({
                    ...prevFilms,
                    [filmId]: data,
                }));
            } else {
                console.error('Invalid API response:', data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return {fetchedFilms, searchFilmDetails};
};

export default useFilmCreditsSearch;
