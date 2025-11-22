import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import UserInfo from '../userInfo/UserInfo';
import TimelineSelector from '../timeline/TimelineSelector';
import MentalHealthReport, { ReportDataItem } from '../mentalHealth/MentalHealthReport';

// --- Fake Data Generation ---
const generateFakeData = (timeline: string) => {
    const data: { [key: string]: any } = {
        childName: 'Алекс Донев',
        age: 14,
        school: 'СУ "Иван Вазов"',
        city: 'София',
        country: 'България',
        urls: {
            '1': ['youtube.com/watch?v=abc', 'coolmathgames.com'],
            '3': ['youtube.com/watch?v=abc', 'coolmathgames.com', 'wikipedia.org/wiki/Dinosaurs', 'reddit.com/r/gaming'],
            '6': ['youtube.com/watch?v=abc', 'coolmathgames.com', 'wikipedia.org/wiki/Dinosaurs', 'reddit.com/r/gaming', 'nationalgeographic.com', 'roblox.com'],
        },
        keywords: {
            '1': ['смешни котки', 'помощ за домашно по математика'],
            '3': ['смешни котки', 'помощ за домашно по математика', 'факти за динозаври', 'нови видео игри'],
            '6': ['смешни котки', 'помощ за домашно по математика', 'факти за динозаври', 'нови видео игри', 'вулкани', 'roblox вход'],
        }
    };

    const timelineKey = ['1', '3', '6'].includes(timeline) ? timeline : '6';

    return {
        childName: data.childName,
        age: data.age,
        school: data.school,
        city: data.city,
        country: data.country,
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
            console.log("Report data fetched:", newData);
            resolve(newData);
        }, 1500);
    });
};

const Dashboard: React.FC = () => {
    const [timeline, setTimeline] = useState('all');
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [isDashboardLoading, setIsDashboardLoading] = useState(true);
    const [showReport, setShowReport] = useState(false);
    const [reportData, setReportData] = useState<ReportDataItem[] | null>(null);
    const [isReportLoading, setIsReportLoading] = useState(false);

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

    const handleGenerateReport = () => {
        setIsReportLoading(true);
        setShowReport(true);
        fetchMentalHealthReport().then(data => {
            setReportData(data);
            setIsReportLoading(false);
        });
    };

    return (
        <div className="container">
            <UserInfo />
            <div className="dashboard-header">
                <h1>Табло за активност на детето</h1>
                <TimelineSelector timeline={timeline} onTimelineChange={handleTimelineChange} />
            </div>

            <div className="dashboard-grid">
                <div className="card child-info-card">
                    <h2>Информация за детето</h2>
                    {isDashboardLoading ? <p>Зареждане...</p> : (
                        <>
                            <p><strong>Име:</strong> {dashboardData?.childName}</p>
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
