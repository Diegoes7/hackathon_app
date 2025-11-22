import React from 'react';
import './UserInfo.css';

// Static data for the user
const userData = {
    name: 'Ивелина Иванова',
    email: 's.connor@email.com',
    memberSince: '2023-01-15',
    avatar: 'https://i.pravatar.cc/50?img=1', // Placeholder avatar image
};

const UserInfo: React.FC = () => {
    return (
        <div className="user-info-bar">
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
    );
};

export default UserInfo;
