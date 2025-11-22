import React from 'react';
import './TimelineSelector.css';

interface TimelineSelectorProps {
    timeline: string;
    onTimelineChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ timeline, onTimelineChange }) => {
    return (
        <div className="timeline-selector">
            <label htmlFor="timeline-select">Период: </label>
            <select id="timeline-select" value={timeline} onChange={onTimelineChange}>
                <option value="all">Всички</option>
                <option value="1">1 месец</option>
                <option value="2">2 месеца</option>
                <option value="3">3 месеца</option>
                <option value="6">6 месеца</option>
            </select>
        </div>
    );
};

export default TimelineSelector;
