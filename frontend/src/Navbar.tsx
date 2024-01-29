import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
    return (
        <div id='navbar'>
            <div id='logocontainer'>
                <div><FontAwesomeIcon className="navicon" icon={faForward} color='#004080' /></div>
                <h3 id="name">SLack Off</h3>
            </div>
            <div id="scrollbtncontainer">
                <a href="#content">
                    <button className='navbutton'>Try me!</button>
                </a>
            </div>

        </div>
    )
}