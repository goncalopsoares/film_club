import React, {useState} from 'react';

const useDirectorSearch = () => {
    const [directors, setDirectors] = useState([]);

    const searchDirectors = async (searchTerm) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTllMGMxNDg5YmFjZDIwYjVlYjU2N2E2NTAwYmY3MCIsInN1YiI6IjY0MmM3ZDdiOGI5NTllMDA5N2E0Y2RjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c0woXmJ-MJSo8YDNwK6VG7RokYgJYhxCnAcl9KWzvVc'
            }
        };

        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options)
            const data = await response.json();
            setDirectors(data.results);
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    };

    return {directors, searchDirectors};
};

export default useDirectorSearch;