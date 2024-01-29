import './App.css'
import FileUploadSingle from './FileUploadSingle';
import { Landing } from './Landing';
import { Navbar } from './Navbar';

function App() {

  return (
    <>
      <Navbar />
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
