import { CreatorProfile } from "./CreatorProfile";
import "./Footer.css";

export const Footer = () => {
    const Colin = {name: "Colin Sung", github: "https://github.com/colinsung0714", linkedin: ""};
    const Vivian = {name: "Vivian Li", github: "https://github.com/Vivi355", linkedin: ""};
    const Ludia = {name: "Ludia Park", github: "https://github.com/lypark5", linkedin: ""};
    const Jon = {name: "Jon Ezana", github: "https://github.com/JonEzana", linkedin: ""};

    const creators = [Colin, Vivian, Ludia, Jon];

    return (
        <div id="footer-body">
            <span id="technologies-left">
                <div className='footer-h3-title-div'>
                    Technologies Used:
                </div>
                <div id="technology-icons">
                    <i className="fab fa-aws fa-xs"></i>
                    <i className="fab fa-js-square fa-xs"></i>
                    <i className="fab fa-react fa-xs"></i>
                    <i className="fab fa-html5 fa-xs"></i>
                    <i className="fab fa-css3 fa-xs"></i>
                    <i className="fab fa-python fa-xs"></i>
                </div>
            </span>
            <span id="creators-right">
                <div className='footer-h3-title-div'>
                    Meet the Devs:
                </div>
                <div id='profile-items-container'>
                    {creators.map((creator, i) =>
                    <div key={i}>
                        <CreatorProfile creator={creator} creators={creators}/>
                    </div>
                    )}
                </div>
            </span>
        </div>
    )
}

