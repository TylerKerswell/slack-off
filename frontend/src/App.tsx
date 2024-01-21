import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from "@fortawesome/free-solid-svg-icons";
import FileUploadSingle from './FileUploadSingle';
// import { Loading } from './Loading';
import { CenteredTabs } from './Tabs';


// import { Tab } from '@mui/base/Tab';
// import { TabsList } from '@mui/base/TabsList';
// import { TabPanel } from '@mui/base/TabPanel';
// import { Tabs } from '@mui/base/Tabs';

function App() {

  return (
    <>

      <div id='navbar'>
        <div><FontAwesomeIcon icon={faForward} color='#004080' /></div>
        <h2 id="space">..</h2>
        <h3 id="name">SLack Off</h3>
      </div>
      <section>
        <h1 className='pagetitle'>Your Ultimate Study Companion</h1>
        <div className='containerrim'>
          <div className='container'>
            <p>Get your lecture materials summarized and
              consolidated, with a personal study plan</p>
            <div id='uploadwrapper'>
              <FileUploadSingle />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1 className='pagetitle'>Slides Summary</h1>
        <div className='tabwrapper'>
          <CenteredTabs />
        </div>
      </section>
    </>
  )
}

export default App
