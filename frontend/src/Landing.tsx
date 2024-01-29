import "./Landing.css"
import "./App.css"
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function Landing() {
    return (
        <>
            <div id="pagewrapper">
                <i><h2 className="italics">Fast forward your learning with</h2></i>
                <div className="title">
                    <div className="icon"><FontAwesomeIcon className="iconimg" icon={faForward} color='#004080' /></div>
                    <h1>SLack Off</h1>
                </div>
                <h2 className="desc">your ultimate study companion</h2>
            </div>
        </>
    )
}