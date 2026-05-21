import React, {
    useEffect,
    useState
} from 'react';

import api, { getErrorMessage } from '../api';

function FileList({ refreshKey = 0, onChange }) {

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        fetchFiles();

    }, [refreshKey]);

    const fetchFiles = async () => {

        try {
            setLoading(true);
            const res = await api.get('/api/files');
            setFiles(res.data.files || res.data || []);
            setError('');
        } catch (error) {
            setError(getErrorMessage(error, 'Could not load files'));
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = async (file) => {

    try {

        const response = await api.get(

            `/api/files/download/${encodeURIComponent(getFileKey(file))}`,

            {
                responseType: 'blob'
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement('a');

        link.href = url;

        link.setAttribute('download', getFileKey(file));

        document.body.appendChild(link);

        link.click();

    } catch (error) {

        alert(getErrorMessage(error, "Download failed"));
    }
};

    const previewFile = async (file) => {

        try {
            const res = await api.get(
                `/api/files/share/${encodeURIComponent(getFileKey(file))}`
            );

            window.open(res.data.url, '_blank', 'noopener,noreferrer');
        } catch (error) {
            alert(getErrorMessage(error, "Preview failed"));
        }
    };

    const shareFile = async (name) => {

        try {

            const res = await api.get(

                `/api/files/share/${encodeURIComponent(getFileKey(name))}`
            );

            navigator.clipboard.writeText(
                res.data.url
            );
            const existingLinks =
    JSON.parse(
        localStorage.getItem(
            'sharedLinks'
        )
    ) || [];

existingLinks.push({

    file: getFileKey(name),

    url: res.data.url
});

localStorage.setItem(

    'sharedLinks',

    JSON.stringify(existingLinks)
);

            alert("Share link copied!");

        } catch (error) {

            alert(getErrorMessage(error, "Error generating link"));
        }
    };

    const deleteFile = async (file) => {

        try {
            await api.delete(`/api/files/${encodeURIComponent(getFileKey(file))}`);
            onChange?.();
            fetchFiles();
        } catch (error) {
            alert(getErrorMessage(error, "Delete failed"));
        }
    };

    const getFileKey = (file) =>
        typeof file === 'string' ? file : file.key;

    return (

        <div className="files-section">

            <h2>
                Recent Files
            </h2>

            {error && (
                <div className="inline-error">
                    {error}
                </div>
            )}

            {loading && (
                <p className="muted-text">
                    Loading files...
                </p>
            )}

            {!loading && !error && files.length === 0 && (
                <p className="muted-text">
                    No files uploaded yet.
                </p>
            )}

            {files.map((file) => (

                <div
                    className="file-card"
                    key={getFileKey(file)}
                >

                    <p>{getFileKey(file)}</p>

                    <div className="file-actions">

                        <button
                            onClick={() =>
                                downloadFile(file)
                            }
                        >
                            Download
                        </button>

                        <button
                            onClick={() =>
                                previewFile(file)
                            }
                        >
                            Preview
                        </button>

                        <button
                            onClick={() =>
                                shareFile(file)
                            }
                        >
                            Share
                        </button>

                        <button
                            onClick={() =>
                                deleteFile(file)
                            }
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
}

export default FileList;
