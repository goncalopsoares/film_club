import {Link} from 'react-router-dom';


const NavbarClub = ({setActiveTab}) => {

    return (
        <nav className="navbar-club">
            <ul>
                <li>
                    <Link to="#" onClick={() => setActiveTab('Rounds')}>Rounds</Link>
                </li>
                <li>
                    <Link to="#" onClick={() => setActiveTab('Films')}>Films</Link>
                </li>
                <li>
                    <Link to="#" onClick={() => setActiveTab('Standings')}>Standings</Link>
                </li>
                <li>
                    <Link to="#" onClick={() => setActiveTab('Chat')}>Chat</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavbarClub;