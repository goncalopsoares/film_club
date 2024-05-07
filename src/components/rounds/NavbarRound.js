import {Link} from 'react-router-dom';

const NavbarRound = ({setActiveTab}) => {

    return (
        <nav className="navbar-club">
            <ul>
                <li>
                    <Link to="#" onClick={() => setActiveTab('RoundTheme')}>Theme</Link>
                </li>
                <li>
                    <Link to="#" onClick={() => setActiveTab('RoundFilms')}>Films</Link>
                </li>
                <li>
                    <Link to="#" onClick={() => setActiveTab('RoundVoting')}>Voting</Link>
                </li>
                <li>
                    <Link to="#" onClick={() => setActiveTab('RoundResults')}>Results</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarRound;