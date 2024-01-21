import './App.css'
import { UploadIcon } from './Links';

import { ChangeEvent, useState } from 'react';

function FileUploadSingle() {
  const [file, setFile] = useState<File>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setShowButton(true);
      setFile(e.target.files[0]);
      
    }
  };
  
  const UploadButton = () => {
    return (
      <button onClick={handleUploadClick}>Generate Study Tools</button>
    )
  }

  const [showButton, setShowButton] = useState(false);

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    if (file.type != "application/pdf") {
      return;
    }

    fetch('/uploadPDF', {
      method: 'POST',
      body: file,
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`
      },
    })
      .then((res) => console.log(res))
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <div className='uploaddiv'>
      <label className='fileupload'>
        <UploadIcon />
        <input type="file" onChange={handleFileChange} />
      </label>
      <div>{file && `${file.name} - ${file.type}`}</div>
      { showButton ? <UploadButton /> : null }
    </div>
  );
}


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
            <FileUploadSingle />
            <span className='uploadphrase'>Upload your lecture materials</span>  
          </div>
        </div>
      </div>
    </>
  )
}

export default App
