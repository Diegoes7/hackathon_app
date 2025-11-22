import React from 'react';
import './UserInfo.css';
import ChildSelector, { Child } from '../childSelector/ChildSelector';

// Static data for the user
const userData = {
    name: 'Sarah Connor',
    email: 's.connor@email.com',
    memberSince: '2023-01-15',
    avatar: 'https://i.pravatar.cc/50?img=1', // Placeholder avatar image
};

interface UserInfoProps {
    children: Child[];
    selectedChildId: number;
    onChildChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ children, selectedChildId, onChildChange }) => {
    return (
        <div className="user-info-bar">
            <div className="user-details">
                <img src={userData.avatar} alt="Аватар на потребителя" className="user-avatar" />
                <div className="user-info-item">
                    <strong>Потребител:</strong> {userData.name}
                </div>
                <div className="user-info-item">
                    <strong>Имейл:</strong> {userData.email}
                </div>
                <div className="user-info-item">
                    <strong>Член от:</strong> {userData.memberSince}
                </div>
            </div>
            <div className="child-selector-container">
                <ChildSelector 
                    children={children} 
                    selectedChildId={selectedChildId} 
                    onChildChange={onChildChange} 
                />
            </div>
        </div>
    );
};

export default UserInfo;
