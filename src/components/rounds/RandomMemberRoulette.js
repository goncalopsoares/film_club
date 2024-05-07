import React from 'react';

const RandomMemberRoulette = ({ selectedMember, spinRoulette, updateMemberWhoSuggestedTheme}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ margin: '1rem', textAlign: 'center' }}>Click spin to randomly select a member who is going to decide this round's theme</p>
            <button className={'create-club-button'} onClick={spinRoulette} style={{ padding: '0.5rem', width: '50%', marginBottom: '1rem' }}>Spin</button>
            {selectedMember && (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <h3 style={{textAlign: 'center'}}>The person selecting this round's theme is</h3>
                    <p className='animated-text'>{selectedMember.userData.name}</p>
                    <button className={'create-club-button'} onClick={updateMemberWhoSuggestedTheme}
                            style={{padding: '0.5rem', width: '75%', marginBottom: '1rem'}}>Update Theme Suggester
                    </button>
                </div>
            )}
        </div>
    );
};

export default RandomMemberRoulette;
