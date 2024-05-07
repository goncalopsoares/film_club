const JoinClub = ({ clubCode, handleInputChange, joinClub, message }) => {
    return (
        <div className={'join-club-card'}>
            <form onSubmit={joinClub}>
                <label>
                    <p style={{fontSize: '1.5rem', marginBottom: '0'}}>Insert Club's Code:</p>
                    <input className={'rounded-input'} style={{fontSize:'2rem', textAlign: 'center'}}  type="text" value={clubCode} onChange={handleInputChange}/>
                </label>
                <input id={'join-club-button'} type="submit" value="Join Club"/>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default JoinClub;