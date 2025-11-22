import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import UserInfo from './components/userInfo/UserInfo';

function App() {
	return (
		<div className='App'>
			<h1>Добре дошли в Пазител</h1>
			{/* <UserInfo /> */}
			<Dashboard />
			{/* <MentalHealthReport /> */}
		</div>
	);
}

export default App;
