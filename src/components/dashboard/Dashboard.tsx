import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import UserInfo from '../userInfo/UserInfo';
import { Child } from '../childSelector/ChildSelector';
import TimelineSelector from '../timeline/TimelineSelector';
import MentalHealthReport, { ReportDataItem } from '../mentalHealth/MentalHealthReport';

// --- Fake Data Generation for Multiple Children ---
const generateAllFakeData = () => {
    return [
        {
            id: 1,
            name: 'Алекс Донев',
            age: 14,
            school: 'СУ "Иван Вазов"',
            city: 'София',
            country: 'България',
            activity: {
                urls: {
                    '1': ['youtube.com', 'coolmathgames.com'],
                    '3': ['youtube.com', 'coolmathgames.com', 'wikipedia.org', 'reddit.com/r/gaming'],
                    '6': ['youtube.com', 'coolmathgames.com', 'wikipedia.org', 'reddit.com/r/gaming', 'roblox.com'],
                },
                keywords: {
                    '1': ['смешни котки', 'помощ по математика'],
                    '3': ['смешни котки', 'помощ по математика', 'факти за динозаври', 'нови игри'],
                    '6': ['смешни котки', 'помощ по математика', 'факти за динозаври', 'нови игри', 'roblox'],
                }
            }
        },
        {
            id: 2,
            name: 'Елена Петрова',
            age: 12,
            school: 'ОУ "Христо Ботев"',
            city: 'Пловдив',
            country: 'България',
            activity: {
                urls: {
                    '1': ['artstation.com', 'pinterest.com'],
                    '3': ['artstation.com', 'pinterest.com', 'deviantart.com'],
                    '6': ['artstation.com', 'pinterest.com', 'deviantart.com', 'behance.net'],
                },
                keywords: {
                    '1': ['как се рисува дракон', 'идеи за рисуване'],
                    '3': ['как се рисува дракон', 'идеи за рисуване', 'дигитална живопис'],
                    '6': ['как се рисува дракон', 'идеи за рисуване', 'дигитална живопис', 'таблети за рисуване'],
                }
            }
        }
    ];
};

const fetchAllData = (): Promise<any[]> => {
    console.log(`Fetching all children data...`);
    return new Promise(resolve => {
        setTimeout(() => {
            const data = generateAllFakeData();
            console.log("All data fetched:", data);
            resolve(data);
        }, 500);
    });
};


const fetchMentalHealthReport = (): Promise<ReportDataItem[]> => {
    console.log("Fetching data from Gemini API...");
    return new Promise(resolve => {
        setTimeout(() => {
            const suicideScore = Math.random() < 0.9 ? 10 : Math.floor(Math.random() * 5) + 1;
            const newData: ReportDataItem[] = [
                { label: 'Aggression Rate', score: Math.floor(Math.random() * 10) + 1 },
                { label: 'Emotional Status', score: Math.floor(Math.random() * 10) + 1 },
                { label: 'Suicide Thinking', score: suicideScore },
                { label: 'Mental Health Stability', score: Math.floor(Math.random() * 10) + 1 },
                { label: 'Social Interaction', score: Math.floor(Math.random() * 10) + 1 },
            ];
            resolve(newData);
        }, 1500);
    });
};

const Dashboard: React.FC = () => {
    // Top-level state
    const [allChildrenData, setAllChildrenData] = useState<any[]>([]);
    const [selectedChildId, setSelectedChildId] = useState<number>(0);
    const [timeline, setTimeline] = useState('all');

    // Derived state for the selected child's full data
    const selectedChildData = allChildrenData.find(child => child.id === selectedChildId);

    // Display state for dashboard cards
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isDashboardLoading, setIsDashboardLoading] = useState(true);
    
    // State for mental health report
    const [showReport, setShowReport] = useState(false);
    const [reportData, setReportData] = useState<ReportDataItem[] | null>(null);
    const [isReportLoading, setIsReportLoading] = useState(false);

    // Fetch all data on initial mount
    useEffect(() => {
        fetchAllData().then(data => {
            setAllChildrenData(data);
            if (data.length > 0) {
                setSelectedChildId(data[0].id);
            }
        });
    }, []);

    // Update dashboard cards when selected child or timeline changes
    useEffect(() => {
        if (selectedChildData) {
            setIsDashboardLoading(true);
            const timelineKey = ['1', '2', '3', '6'].includes(timeline) ? timeline : '6';
            const activity = selectedChildData.activity;
            
            setDashboardData({
                ...selectedChildData,
                visitedUrls: activity.urls[timelineKey] || activity.urls['6'],
                typedKeywords: activity.keywords[timelineKey] || activity.keywords['6'],
            });
            
            // Simulate loading
            setTimeout(() => setIsDashboardLoading(false), 300);
        }
    }, [selectedChildId, timeline, allChildrenData, selectedChildData]);


    const handleChildChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedChildId(Number(event.target.value));
        // Reset report when changing child
        setShowReport(false);
        setReportData(null);
    };

    const handleTimelineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeline(event.target.value);
    };

    const handleGenerateReport = () => {
        setIsReportLoading(true);
        setShowReport(true);
        fetchMentalHealthReport().then(data => {
            setReportData(data);
            setIsReportLoading(false);
        });
    };

    const childrenForSelector: Child[] = allChildrenData.map(c => ({ id: c.id, name: c.name }));

    if (allChildrenData.length === 0) {
        return <div className="container"><p>Зареждане на данни...</p></div>;
    }

    return (
        <div className="container">
            <UserInfo 
                children={childrenForSelector}
                selectedChildId={selectedChildId}
                onChildChange={handleChildChange}
            />
            <div className="dashboard-header">
                <h1>Табло за активност на детето</h1>
                <TimelineSelector timeline={timeline} onTimelineChange={handleTimelineChange} />
            </div>

            <div className="dashboard-grid">
                <div className="card child-info-card">
                    <h2>Информация за детето</h2>
                    {isDashboardLoading ? <p>Зареждане...</p> : (
                        <>
                            <p><strong>Име:</strong> {dashboardData?.name}</p>
                            <p><strong>Възраст:</strong> {dashboardData?.age}</p>
                            <p><strong>Училище:</strong> {dashboardData?.school}</p>
                            <p><strong>Град:</strong> {dashboardData?.city}</p>
                            <p><strong>Държава:</strong> {dashboardData?.country}</p>
                        </>
                    )}
                </div>

                <div className="card">
                    <h2>Посетени URL адреси</h2>
                    {isDashboardLoading ? <p>Зареждане...</p> : (
                        <ul>
                            {dashboardData?.visitedUrls.map((url: string, index: number) => <li key={index}>{url}</li>)}
                        </ul>
                    )}
                </div>

                <div className="card">
                    <h2>Въведени ключови думи</h2>
                    {isDashboardLoading ? <p>Зареждане...</p> : (
                        <ul>
                            {dashboardData?.typedKeywords.map((keyword: string, index: number) => <li key={index}>{keyword}</li>)}
                        </ul>
                    )}
                </div>

                {!showReport && (
                    <div className="card report-trigger-card">
                        <h2>Доклад за Психично Здраве</h2>
                        <p>Натиснете бутона, за да генерирате подробен анализ на база последните данни.</p>
                        <button className="report-button" onClick={handleGenerateReport}>
                            Генерирай доклад
                        </button>
                    </div>
                )}
            </div>

            {showReport && (
                <MentalHealthReport reportData={reportData} isLoading={isReportLoading} />
            )}

            <div className="note">
                <p><strong>Забележка:</strong> Данните в това табло се генерират динамично за демонстрационни цели.</p>
            </div>
        </div>
    );
};

export default Dashboard;
