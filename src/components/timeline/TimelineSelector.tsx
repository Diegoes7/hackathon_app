import React from 'react';
import './TimelineSelector.css';

interface TimelineSelectorProps {
    timeline: string;
    onTimelineChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ timeline, onTimelineChange }) => {
    return (
        <div className="timeline-selector">
            <label htmlFor="timeline-select">Timeline: </label>
            <select id="timeline-select" value={timeline} onChange={onTimelineChange}>
                <option value="all">All</option>
                <option value="1">1 Month</option>
                <option value="2">2 Months</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
            </select>
        </div>
    );
};

export default TimelineSelector;
