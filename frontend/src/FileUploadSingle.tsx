import { UploadIcon } from './Links';
import { RingLoader } from "react-spinners";
import { ChangeEvent, useState } from 'react';


export default function FileUploadSingle() {
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
          // ANDREW DO THINGS WITH THE JSON HERE
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