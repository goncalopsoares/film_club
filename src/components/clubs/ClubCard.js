import {FaLock, FaLockOpen} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {GetClubBackground} from "./GetClubBackground";


const ClubCard = ({club, uid}) => {

    const clubBackground = GetClubBackground(club);
    const navigate = useNavigate();

    return (
        <div className={'club-card'} style={{backgroundImage: `url(${clubBackground})`}}
             onClick={() => navigate(`/club/${club.id}`)}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <div style={{
                        backgroundColor: '#0e0e0e',
                        opacity: '0.85',
                        padding: '0.2rem 1rem',
                        border: 'none',
                        borderRadius: '3px',
                        margin: '0 1rem 0 0',
                        width: '95%',
                    }}>
                        <div style={{display: 'flex'}}>
                            {club.clubVisibility === 'Private' ? <><FaLock size={12} color={'#fff'} style={{marginRight:'0.3rem'}}/><span
                                style={{fontSize: '0.7rem'}}> {club.clubVisibility}</span></> : club.clubVisibility === 'Open' && <>
                                <FaLockOpen size={12} color={'#fff'} style={{marginRight:'0.3rem'}}/><span
                                style={{fontSize: '0.7rem'}}> {club.clubVisibility}</span></>}
                            <span style={{fontSize: '0.7rem'}}><b style={{marginLeft: '1.2rem'}}>Pace</b> {club.clubPace}</span>
                            <span style={{fontSize: '0.7rem'}}><b style={{marginLeft: '1.2rem'}}>Code</b> {club.clubCode}</span>
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: '#0e0e0e',
                        opacity: '0.85',
                        padding: '0.2rem 1rem',
                        border: 'none',
                        borderRadius: '3px',
                        margin: '0.3rem 1rem 0 0',
                        width: '95%',
                    }}>
                        <h3 style={{marginBottom: '0.3rem'}}>{club.clubName}</h3>
                        <p style={{
                            fontSize: '0.9rem',
                            marginTop: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>{club.clubDescription}</p>
                    </div>
                    <div style={{
                        backgroundColor: '#0e0e0e',
                        opacity: '0.85',
                        padding: '0.2rem 1rem',
                        border: 'none',
                        borderRadius: '3px',
                        margin: '0.5rem 0 0 0',
                        width: '95%',
                    }}>
                        <b>Current round</b> {club.currentRound} <b
                        style={{marginLeft: '0.7rem'}}>Members</b> {club.clubMembers.length}
                    </div>
                </div>
                <div>
                    <img className={'club-card-logo'} src={club.clubLogo} alt={'Club Logo'}/>
                </div>
            </div>
        </div>
    )
}

export default ClubCard;