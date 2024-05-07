import {Route, Routes} from 'react-router-dom';
import "./styles.css";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import Dashboard from "./pages/Dashboard";
import CreateClub from "./pages/CreateClub";
import ProfilePage from "./pages/ProfilePage";
import ClubPage from "./pages/ClubPage";
import RoundPage from "./pages/RoundPage";

export default function App() {
    return (
        <>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/club" element={<CreateClub/>}/>
                    <Route path="/club/:clubId" element={<ClubPage/>}/>
                    <Route path="/club/:clubId/:roundId" element={<RoundPage/>}/>
                    <Route path="/profile/edit" element={<CreateProfile/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </div>
        </>
    );
}