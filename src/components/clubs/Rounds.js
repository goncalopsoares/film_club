import React from 'react';
import RoundCard from "../rounds/RoundCard";

const Rounds = ({rounds, clubId, createNewRound}) => {

    return (
        <div>
            {rounds.map((round, index) => (
                <React.Fragment key={index}>
                    <RoundCard round={round} clubId={clubId} currentStage={round.currentStage}/>

                    {round.currentStage === 4 && index === round.roundNumber-1 ? (
                        <button
                            className={'create-club-button'}
                            onClick={createNewRound}
                            style={{padding: '0.5rem', width: '100%', marginBottom: '1rem', backgroundColor: '#d9d9d9', color: '#000'}}
                        >
                            Start Next Round </button>
                    ) : null}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Rounds;
