import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import TimelineSelector from '../timeline/TimelineSelector';
import MentalHealthReport from '../mentalHealth/MentalHealthReport';

// --- Fake Data Generation ---
const generateFakeData = (timeline: string) => {
    const data: { [key: string]: any } = {
        childName: 'Alex Doe', // Name is constant
        urls: {
            '1': ['youtube.com/watch?v=abc', 'coolmathgames.com'],
            '3': ['youtube.com/watch?v=abc', 'coolmathgames.com', 'wikipedia.org/wiki/Dinosaurs', 'reddit.com/r/gaming'],
            '6': ['youtube.com/watch?v=abc', 'coolmathgames.com', 'wikipedia.org/wiki/Dinosaurs', 'reddit.com/r/gaming', 'nationalgeographic.com', 'roblox.com'],
        },
        keywords: {
            '1': ['funny cat videos', 'math homework help'],
            '3': ['funny cat videos', 'math homework help', 'T-Rex facts', 'new video games'],
            '6': ['funny cat videos', 'math homework help', 'T-Rex facts', 'new video games', 'volcanoes', 'roblox login'],
        }
    };

    const timelineKey = ['1', '3', '6'].includes(timeline) ? timeline : '6';

    return {
        childName: data.childName,
        visitedUrls: data.urls[timelineKey],
        typedKeywords: data.keywords[timelineKey],
    };
};

const fetchDashboardData = (timeline: string): Promise<any> => {
    console.log(`Fetching dashboard data for timeline: ${timeline}`);
    return new Promise(resolve => {
        setTimeout(() => {
            const data = generateFakeData(timeline);
            console.log("Dashboard data fetched:", data);
            resolve(data);
        }, 500); // Simulate 0.5s network delay
    });
};


const Dashboard: React.FC = () => {
    const [timeline, setTimeline] = useState('all');
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isDashboardLoading, setIsDashboardLoading] = useState(true);

    useEffect(() => {
        setIsDashboardLoading(true);
        fetchDashboardData(timeline).then(data => {
            setDashboardData(data);
            setIsDashboardLoading(false);
        });
    }, [timeline]);

    const handleTimelineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeline(event.target.value);
    };

    return (
        <div className="container">
            <div className="dashboard-header">
                <h1>Child Activity Dashboard</h1>
                <TimelineSelector timeline={timeline} onTimelineChange={handleTimelineChange} />
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <h2>Child Name</h2>
                    {isDashboardLoading ? <p>Loading...</p> : <p><strong>Name:</strong> {dashboardData?.childName}</p>}
                </div>

                <div className="card">
                    <h2>Visited URLs</h2>
                    {isDashboardLoading ? <p>Loading...</p> : (
                        <ul>
                            {dashboardData?.visitedUrls.map((url: string, index: number) => <li key={index}>{url}</li>)}
                        </ul>
                    )}
                </div>

                <div className="card">
                    <h2>Typed Keywords</h2>
                    {isDashboardLoading ? <p>Loading...</p> : (
                        <ul>
                            {dashboardData?.typedKeywords.map((keyword: string, index: number) => <li key={index}>{keyword}</li>)}
                        </ul>
                    )}
                </div>
                <MentalHealthReport />
            </div>

            <div className="note">
                <p><strong>Note:</strong> The data in this dashboard is dynamically generated for demonstration purposes.</p>
            </div>
        </div>
    );
};

export default Dashboard;
