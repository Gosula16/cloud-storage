import React, { useState } from 'react';

import api, { getErrorMessage } from '../api';

import { useDropzone } from 'react-dropzone';

function UploadForm() {

    const [file, setFile] = useState();

    const { getRootProps, getInputProps } =
        useDropzone({

            onDrop: acceptedFiles => {

                setFile(acceptedFiles[0]);
            }
        });

    const uploadFile = async () => {

        if (!file) {

            alert("Select file");

            return;
        }

        const formData = new FormData();

        formData.append('file', file);

        try {
            await api.post(

                '/api/files/upload',

                formData
            );

            alert("File Uploaded");

            window.location.reload();
        } catch (error) {
            alert(getErrorMessage(error, "Upload failed"));
        }
    };

    return (

        <div className="upload-box">

            <div {...getRootProps()}>

                <input {...getInputProps()} />

                <h2>
                    Drag & Drop your file here
                </h2>

                <p>
                    or click to browse
                </p>

            </div>

            {file && (
                <p>
                    Selected:
                    {file.name}
                </p>
            )}

            <button
    className="theme-btn"
    onClick={uploadFile}
>
    Upload File
</button>

        </div>
    );
}

export default UploadForm;
