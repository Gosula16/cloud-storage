import React, {
    useEffect,
    useState
} from 'react';

import api, { getErrorMessage } from '../api';

function StorageStats() {

    const [stats, setStats] = useState({});

    useEffect(() => {

        fetchStats();

    }, []);

    const fetchStats = async () => {

        try {
            const res = await api.get('/api/files/stats');
            setStats(res.data);
        } catch (error) {
            alert(getErrorMessage(error, 'Could not load storage stats'));
        }
    };

    return (

        <div className="stats-grid">

            <div className="stat-card">

                <h3>Total Files</h3>

                <p>
                    {stats.totalFiles}
                </p>

            </div>

            <div className="stat-card">

                <h3>Total Storage</h3>

                <p>
                    {stats.totalSizeMB} MB
                </p>

            </div>

            <div className="stat-card">

                <h3>Cloud Status</h3>

                <p>Active</p>

            </div>

            <div className="stat-card">

                <h3>Security</h3>

                <p>Protected</p>

            </div>

        </div>
    );
}

export default StorageStats;
