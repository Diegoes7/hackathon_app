import React from 'react';
import './ChildSelector.css';

export interface Child {
    id: number;
    name: string;
}

interface ChildSelectorProps {
    children: Child[];
    selectedChildId: number;
    onChildChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ChildSelector: React.FC<ChildSelectorProps> = ({ children, selectedChildId, onChildChange }) => {
    return (
        <div className="child-selector">
            <label htmlFor="child-select">Избери дете:</label>
            <select id="child-select" value={selectedChildId} onChange={onChildChange}>
                {children.map(child => (
                    <option key={child.id} value={child.id}>
                        {child.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChildSelector;
