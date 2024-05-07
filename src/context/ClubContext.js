import React, {createContext, useContext, useState} from 'react';

const clubContext = createContext();

export const ClubProvider = ({children}) => {
    const [club, setClub] = useState({});
    const [members, setMembers] = useState([]);
    const [clubBackground, setClubBackground] = useState('');

    const setClubData = (info, memberList, background) => {
        setClub(info);
        setMembers(memberList);
        setClubBackground(background)
    };


    return (
        <clubContext.Provider value={{
            club,
            members,
            clubBackground,
            setClubData
        }}>
            {children}
        </clubContext.Provider>
    )
}

export const useClubContext = () => {
    return useContext(clubContext);
}