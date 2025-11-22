import React from 'react';
import './UserInfo.css';

// Static data for the user
const userData = {
    name: 'Sarah Connor',
    email: 's.connor@email.com',
    memberSince: '2023-01-15',
    avatar: 'https://i.pravatar.cc/50?img=1', // Placeholder avatar image
};

const UserInfo: React.FC = () => {
    return (
        <div className="user-info-bar">
            <img src={userData.avatar} alt="User Avatar" className="user-avatar" />
            <div className="user-info-item">
                <strong>User:</strong> {userData.name}
            </div>
            <div className="user-info-item">
                <strong>Email:</strong> {userData.email}
            </div>
            <div className="user-info-item">
                <strong>Member Since:</strong> {userData.memberSince}
            </div>
        </div>
    );
};

export default UserInfo;
