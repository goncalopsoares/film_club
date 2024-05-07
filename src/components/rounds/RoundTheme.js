import React, {useState, useEffect} from "react";
import RandomMemberRoulette from "./RandomMemberRoulette";
import ThemeInput from "./ThemeInput";

const RoundTheme = ({
                        members,
                        round,
                        clubId,
                        club,
                        onMemberSelected,
                        updateMemberWhoSuggestedTheme,
                        user,
                        message,
                        onUpdateRoundTheme,
                        advanceRoundStage,
                    }) => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [suggesterName, setSuggesterName] = useState('');
    const [roundTheme, setRoundTheme] = useState(round.roundTheme || '');

    useEffect(() => {
        if (round.memberWhoSuggestedTheme !== "") {
            fetchSuggesterName(round.memberWhoSuggestedTheme);
        }
    }, [round.memberWhoSuggestedTheme]);


    const fetchSuggesterName = (suggesterId) => {
        try {
            const suggester = members.find((member) => member.id === suggesterId);

            if (suggester !== undefined) {
                const suggesterName = suggester.userData.name;
                setSuggesterName(suggesterName);
                console.log("Suggester name:", suggesterName)
            } else {
                console.error("Member not found for suggester ID:", suggesterId);
            }
        } catch (error) {
            console.error("Error fetching suggester name:", error);
        }
    };

    const spinRoulette = () => {
        const randomIndex = Math.floor(Math.random() * members.length);
        const selectedMember = members[randomIndex];
        setSelectedMember(selectedMember);
        onMemberSelected(selectedMember.id);

        fetchSuggesterName(selectedMember.id);
    };

    const handleThemeChange = (value) => {
        setRoundTheme(value);
    };

    const handleThemeSubmit = () => {
        if (roundTheme.trim() !== "") {
            onUpdateRoundTheme(roundTheme);
        } else {
            alert("Please enter a valid theme before submitting.");
        }
    };

    return (
        <div style={{backgroundColor: '#f1f1f1', width: '100%'}}>
            <div style={{backgroundColor: '#f1f1f1', width: '100%'}}>
                <h2 style={{margin: '3rem 1rem 1rem 1rem', textAlign: 'center'}}>This round's theme is</h2>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#848FA5',
                    color: '#fff',
                    margin: '1rem',
                    padding: '1rem',
                    textAlign: 'center'
                }}>
                    {round.roundTheme && round.roundTheme !== "" ? (
                        <h3 className='animated-text' style={{margin: '1rem', padding:'1rem'}}>{round.roundTheme}</h3>
                    ) : (
                        <h3 className='animated-text'>{roundTheme || "No theme selected yet"}</h3>
                    )}
                </div>
            </div>

            {round.memberWhoSuggestedTheme === "" && club.clubAdminId === user.uid ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center'
                }}>
                    <RandomMemberRoulette
                        round={round}
                        members={members}
                        selectedMember={selectedMember}
                        spinRoulette={spinRoulette}
                        updateMemberWhoSuggestedTheme={() => updateMemberWhoSuggestedTheme(clubId, round)}
                    />
                </div>
            ) : (
                (user && user.uid === round.memberWhoSuggestedTheme && round.currentStage === 1 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        margin: '1rem',
                        textAlign: 'center'
                    }}>
                        <p>You are setting the theme!</p>
                        <ThemeInput value={roundTheme} onChange={handleThemeChange}/>
                        <button
                            className={'create-club-button'}
                            onClick={handleThemeSubmit}
                            style={{padding: '0.5rem', width: '100%', marginBottom: '1rem'}}
                        >
                            Submit Theme
                        </button>
                    </div>
                ) : (
                    <p style={{margin: '3rem 1rem 2rem 1rem', textAlign: 'center'}}>
                        {suggesterName ? (
                            <><b>{suggesterName}</b> is setting the theme!</>
                        ) : (
                            <> The raffle for the theme setter is in progress. Please wait...</>
                        )}
                    </p>
                ))
            )}
            {club.clubAdminId === user.uid && round.currentStage === 1 && round.roundTheme ? (
                <div>
                    <p style={{margin: '1rem', textAlign: 'center'}}>
                        Theme is set. You can now click on the button to advance to the next stage if you please.
                    </p>
                    <button
                        className={'create-club-button'}
                        onClick={advanceRoundStage}
                        style={{padding: '0.5rem', width: '100%', marginBottom: '1rem'}}
                    >
                        To Stage 2
                    </button>
                </div>
            ) : null
            }
        </div>
    );
}

export default RoundTheme;
