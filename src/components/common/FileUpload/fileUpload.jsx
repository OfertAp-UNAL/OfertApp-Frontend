import React from 'react';
import config from '../../../config';
import "./fileUpload.css";

const { mediaUrl } = config;

const FileUpload = ({ label, type, value, onChange}) => {   
    return (
        <React.Fragment>
            <h5 className='label-style'>{label}</h5>
            <div className = "file-upload-wrapper mb-3">
              <input 
                type = "file"  
                className = "file-upload"
                accept = {type}
                onChange={e => {
                    const imgContainer = document.getElementById("profile-preview");
                    imgContainer.src = URL.createObjectURL(e.currentTarget.files[0]);
                    onChange(e.currentTarget.files[0])
                }}
              />
            </div>
            <img 
                id = "profile-preview" className = "profilePreview" 
                alt = "profile"
                src = {mediaUrl + "/media/defaultProfile.png"} 
            />
        </React.Fragment>
    );
}

export default FileUpload;