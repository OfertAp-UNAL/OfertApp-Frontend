import React from 'react';

const FileUpload = ({ label, type, value, onChange}) => {   
    return (
        <React.Fragment>
            <h5>{label}</h5>
            <div class = "file-upload-wrapper mb-3">
              <input 
                type = "file"  
                className = "file-upload"
                accept = {type}
                onChange={e => onChange(e.currentTarget.files[0])}
              />
            </div>
        </React.Fragment>
    );
}

export default FileUpload;