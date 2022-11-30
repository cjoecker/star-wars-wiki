import HomeIcon from '../assets/home-icon.svg'
import {useNavigate} from "react-router-dom";

export const HomeButton = () => {
    const navigate = useNavigate()
    return (
        <button className="fixed top-3 left-3 hover:opacity-70" aria-label="main page" onClick={()=>navigate('/')}>
            <img width="48px" height="48px" src={HomeIcon} alt="home"/>
        </button>
    );
};
