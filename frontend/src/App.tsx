import './App.css'
import { UploadIcon } from './Links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from "@fortawesome/free-solid-svg-icons";


import { ChangeEvent, useState } from 'react';
// import { Loading } from './Loading';
import { CenteredTabs } from './Tabs';
import { RingLoader } from "react-spinners";

// import { Tab } from '@mui/base/Tab';
// import { TabsList } from '@mui/base/TabsList';
// import { TabPanel } from '@mui/base/TabPanel';
// import { Tabs } from '@mui/base/Tabs';




function FileUploadSingle() {
  const [showButton, setShowButton] = useState(false);
  const [showUploadPhrase, setShowUploadPhrase] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setShowButton(true);
      setShowUploadPhrase(false);
      setFile(e.target.files[0]);
    }
  };
  function Loading() {

    return (
      <div className="loading">
        <RingLoader color='#30CAFB' size='3rem' />
      </div>
    )
  }
  const UploadButton = () => {
    return (
      <div>
        <button onClick={handleUploadClick}>Generate Study Tools</button>
        <div className='loaderwrapper'>
          {showLoading ? <Loading /> : null}
        </div>
      </div>
    )
  }
  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    if (file.type != "application/pdf") {
      return;
    }
    setShowLoading(true);
    fetch('/uploadPDF', {
      method: 'POST',
      body: file,
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`
      },
    })
      .then(function (res: Response) {
        console.log(res);
        return res.json();
      })
      .then(function (json) {
        console.log(json);
      })
      .catch(function (err) {
        console.log("big error\n");
        console.log(err)
      });
  };
  return (
    <>
      
      <div className='uploaddiv'>
        <label className='fileupload'>
          <UploadIcon />
          <input type="file" onChange={handleFileChange} />
        </label>
        <div>{file && `${file.name} - ${file.type}`}</div>
        {showButton ? <UploadButton /> : null}
      </div>
      { showUploadPhrase ? <span className='uploadphrase'>Upload your lecture materials</span> : null}
    </>
  );
}

function App() {

  return (
    <>

      <div id='navbar'>
        <FontAwesomeIcon icon={faForward} />
        <h3 id="name">SLack Off</h3>
      </div>
      <section>
        <h1 className='pagetitle'>Your Ultimate Study Companion</h1>
        <div className='containerrim'>
          <div className='container'>
            <p>Get your lecture materials summarized and
              consolidated, with a personal study plan:</p>
            <div id='uploadwrapper'>
              <FileUploadSingle />
            </div>
          </div>
        </div>
      </section>
      <section>
        
      </section>
      <section>
        <h1 className='pagetitle'>Slides Summary</h1>
        <div className='tabwrapper'>
          <CenteredTabs />
        </div>
        <div id='summarywrapper'>
          <div className='summary'>
            <h2>Slides Summary</h2>
          </div>
        </div>
      </section>
      <section>
        
      </section>

    </>
  )
}

export default App
