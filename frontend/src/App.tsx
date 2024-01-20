import './App.css'
import { UploadIcon } from './Links';
function App() {

  return (
    <>
      <h3>SLack Off</h3>
      <h1>Your Ultimate Study Guide</h1>
      <div className='container'>
        <p>Get your lecture materials summarized, 
          consolidated and recieve a personal study plan</p>
          
        <div id='uploadwrapper'>
          <a> 
            <UploadIcon />
            <button className='upload'>Upload</button>  
          </a>
        </div>
      </div>
    </>
  )
}

export default App
