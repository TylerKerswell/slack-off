import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from "@fortawesome/free-solid-svg-icons";
import FileUploadSingle from './FileUploadSingle';
import { Landing } from './Landing';

function App() {

  return (
    <>
      <div id='navbar'>
        <div><FontAwesomeIcon icon={faForward} color='#004080' /></div>
        <h2 id="space">..</h2>
        <h3 id="name">SLack Off</h3>
        <a href="#content">
          <button className='navbutton'>Try me!</button>
          </a>
      </div>
      <Landing />
      <section id='content'>
        <h1 className='pagetitle'>Improve your learning now!</h1>
        <div className='containerrim'>
          <div className='container'>
            <p>Get your lecture materials summarized and
              consolidated, with a personal study plan</p>
            
              <FileUploadSingle />
           
          </div>
        </div>
      </section>
    </>
  )
}

export default App
