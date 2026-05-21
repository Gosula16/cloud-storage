
import React, { useEffect, useState } from 'react';
import UploadForm from '../components/UploadForm';
import FileList from '../components/FileList';
import StorageStats from '../components/StorageStats';
import SharedLinks from '../components/SharedLinks';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Dashboard() {
    const [activePage, setActivePage] =
    useState('dashboard');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const logout = () => {

    api.post('/api/auth/logout').finally(() => {
        localStorage.removeItem('token');

        navigate('/');
    });
};

    return (

        <div className="dashboard">

            <div className="sidebar">

                <div className="logo">
                    Cloud<span>Drive</span>
                </div>

                <div className="sidebar-menu">

                    <div className="sidebar-menu">

    <div
        className="sidebar-item"
        onClick={() =>
            setActivePage('dashboard')
        }
    >
        Dashboard
    </div>

    <div
        className="sidebar-item"
        onClick={() =>
            setActivePage('files')
        }
    >
        My Files
    </div>

    <div
        className="sidebar-item"
        onClick={() =>
            setActivePage('shared')
        }
    >
        Shared Links
    </div>

    <div
        className="sidebar-item"
        onClick={() =>
            setActivePage('settings')
        }
    >
        Settings
    </div>

</div>

                </div>

            </div>

            <div className="main">

                <div className="topbar">

                    <div>
                        <h1>
                            Welcome Back
                        </h1>

                        <p>
                            Manage your files
                            and storage
                        </p>
                    </div>

                </div>

                {
    activePage === 'dashboard' && (

        <>

            <StorageStats />

            <UploadForm />

            <FileList />

        </>
    )
}

{
    activePage === 'files' && (

        <div className="files-section">

            <h2>My Files</h2>

            <FileList />

        </div>
    )
}

{
    activePage === 'shared' && (

        <div className="files-section">

            <h2>Shared Files</h2>

            <SharedLinks />

        </div>
    )
}

{
    activePage === 'settings' && (

        <div className="files-section">

            <h2>Settings</h2>

            <button
    className="logout-btn"
    onClick={logout}
>
    Logout
</button>

        </div>
    )
}

            </div>

        </div>
    );
}

export default Dashboard;
