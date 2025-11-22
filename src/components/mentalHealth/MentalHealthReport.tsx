import React, { useState, useEffect } from 'react';
import './MentalHealthReport.css';

type ReportDataItem = {
	label: string;
	score: number;
};

// --- Fake Gemini API Call ---
// This function simulates calling an API to get the mental health report data.
const fetchMentalHealthReport = (): Promise<ReportDataItem[]> => {
	console.log('Fetching data from Gemini API...');
	return new Promise((resolve) => {
		setTimeout(() => {
			const suicideScore =
				Math.random() < 0.9 ? 10 : Math.floor(Math.random() * 5) + 1; // 90% chance of being 10
			const newData = [
				{ label: 'Aggression Rate', score: Math.floor(Math.random() * 10) + 1 },
				{
					label: 'Emotional Status',
					score: Math.floor(Math.random() * 10) + 1,
				},
				{ label: 'Suicide Thinking', score: suicideScore },
				{
					label: 'Mental Health Stability',
					score: Math.floor(Math.random() * 10) + 1,
				},
				{
					label: 'Social Interaction',
					score: Math.floor(Math.random() * 10) + 1,
				},
			];
			console.log('Data fetched:', newData);
			resolve(newData);
		}, 1500); // Simulate 1.5 seconds of network delay
	});
};

// Helper function to generate the report and recommendations
const generateAnalysis = (data: ReportDataItem[]) => {
	let recommendations = [];
	let positivePoints: any = [];
	let areasForObservation: any = [];
	let criticalAlerts: any = [];

	const averageScore =
		data.reduce((acc, item) => acc + item.score, 0) / data.length;

	data.forEach((item) => {
		if (item.label === 'Suicide Thinking' && item.score < 9) {
			criticalAlerts.push(
				`A score of ${item.score}/10 in "Suicide Thinking" requires immediate attention. It is crucial to open a dialogue and consider professional consultation right away.`
			);
		}

		if (item.score <= 4) {
			areasForObservation.push(`${item.label} (${item.score}/10)`);
		} else if (item.score >= 8) {
			positivePoints.push(`${item.label} (${item.score}/10)`);
		}
	});

	if (criticalAlerts.length > 0) {
		recommendations.push(
			'CRITICAL: Immediate intervention is advised. Please consult with a mental health professional.'
		);
	}

	if (areasForObservation.length > 0) {
		recommendations.push(
			`The following areas warrant closer observation and open communication: ${areasForObservation.join(
				', '
			)}.`
		);
		recommendations.push(
			'Consider engaging in activities that can help strengthen these areas.'
		);
	}

	if (positivePoints.length === data.length && criticalAlerts.length === 0) {
		return {
			summary: 'Excellent Mental Health Status.',
			report:
				'All metrics indicate a very healthy and resilient personality. The child demonstrates emotional stability and positive social behaviors well-aligned with their developmental stage. Continue to foster this positive environment.',
			recommendations: [
				'Maintain open and supportive communication.',
				'Encourage current hobbies and social activities.',
			],
			criticalAlerts: [],
		};
	}

	let report = `Overall, the child's mental health appears to be in a ${
		averageScore > 7 ? 'good' : 'fair'
	} state, with several key strengths. `;
	report += `Positive indicators in ${positivePoints.join(
		', '
	)} suggest resilience and healthy coping mechanisms. `;
	if (areasForObservation.length > 0) {
		report += `However, some areas such as ${areasForObservation.join(
			', '
		)} could benefit from additional support and monitoring.`;
	}

	return {
		summary: `${averageScore > 7 ? 'Good Mental Health' : 'Needs Observation'}`,
		report,
		recommendations,
		criticalAlerts,
	};
};

const MentalHealthReport: React.FC = () => {
	const [reportData, setReportData] = useState<ReportDataItem[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchMentalHealthReport().then((data) => {
			setReportData(data);
			setIsLoading(false);
		});
	}, []);

	if (isLoading || !reportData) {
		return (
			<div className='mental-health-report-card'>
				<h2>Personality & Mental Health Report</h2>
				<div className='loading-section'>
					<p>Analyzing data from Gemini API...</p>
				</div>
			</div>
		);
	}

	const analysis = generateAnalysis(reportData);

	return (
		<div className='mental-health-report-card'>
			<h2>Personality & Mental Health Report</h2>

			<div className='recommendations-section'>
				{analysis.criticalAlerts && analysis.criticalAlerts.length > 0 && (
					<div className='report-subsection critical-alert'>
						<h4>Critical Alerts</h4>
						{analysis.criticalAlerts.map((alert: any, index: any) => (
							<p key={index}>{alert}</p>
						))}
					</div>
				)}
				{analysis.recommendations && analysis.recommendations.length > 0 && (
					<div className='report-subsection'>
						<h4>Recommendations</h4>
						<ul>
							{analysis.recommendations.map((rec, index) => (
								<li key={index}>{rec}</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<div className='report-content'>
				<div className='ratings-grid'>
					{reportData.map((item) => (
						<div key={item.label} className='rating-item'>
							<span className='rating-label'>{item.label}</span>
							<span className='rating-score'>{item.score}/10</span>
						</div>
					))}
				</div>

				<div className='analysis-section'>
					<h3>
						Summary: <span className='summary-text'>{analysis.summary}</span>
					</h3>

					<div className='report-subsection'>
						<h4>Detailed Analysis</h4>
						<p>{analysis.report}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MentalHealthReport;
