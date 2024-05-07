import {useNavigate} from "react-router-dom";
import {FaMasksTheater} from "react-icons/fa6";
import {RiFilmFill} from "react-icons/ri";
import {PiGavelFill} from "react-icons/pi";
import {IoStatsChart} from "react-icons/io5";

const RoundCard = ({clubId, round, currentStage}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/club/${clubId}/${round.roundId}`);
    };

    return (
        <div onClick={handleClick} className="round-card">
            <h3>Round {round.roundNumber}</h3>
            {round.roundTheme ? <h2>{round.roundTheme}</h2> : <p>Theme not yet decided</p>}
            {/* {round.roundTheme && <p>Theme suggested by {round.memberWhoSuggestedTheme}</p>} */}
            {round.currentStage === 1 &&
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <FaMasksTheater size={30} style={{marginRight: '0.3rem'}}/><p style={{fontSize: '1.1rem'}}><b style={{marginRight: '0.8rem'}}>Stage 1</b>Theme Selection</p>
                </div>}
            {round.currentStage === 2 &&
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <RiFilmFill size={30} style={{marginRight: '0.3rem'}}/><p style={{fontSize: '1.1rem'}}><b style={{marginRight: '0.8rem'}}>Stage 2</b>Film Submission</p>
                </div>}
            {round.currentStage === 3 &&
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <PiGavelFill size={30} style={{marginRight: '0.3rem'}}/><p style={{fontSize: '1.1rem'}}><b style={{marginRight: '0.8rem'}}>Stage 3</b>Film Voting</p>
                </div>}
            {round.currentStage === 4 &&
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <IoStatsChart size={30} style={{marginRight: '0.3rem'}}/><p style={{fontSize: '1.1rem'}}><b style={{marginRight: '0.8rem'}}>Stage 4</b>Results</p>
                </div>}
        </div>
    );
};

export default RoundCard;
