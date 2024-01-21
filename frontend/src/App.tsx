import './App.css'
import { UploadIcon } from './Links';
function App() {

  return (
    <>
      <div id='navbar'><h3 id="name">SLack Off</h3></div>
      
      <h1 className='pagetitle'>Your Ultimate Study Companion</h1>
      <div className='containerrim'>
        <div className='container'>
          <p>Get your lecture materials summarized, 
            consolidated and recieve a personal study plan</p>
            
          <div id='uploadwrapper'>
            <a> 
              <UploadIcon />
            </a>
            <span className='uploadphrase'>Upload your lecture materials</span>  
          </div>
        </div>
      </div>
    </>
  )
}

export default App
