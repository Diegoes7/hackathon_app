import React from 'react';
import './MentalHealthReport.css';

export type ReportDataItem = {
	label: string;
	score: number;
};

// Helper function to generate the report and recommendations in Bulgarian
const generateAnalysis = (data: ReportDataItem[]) => {
	let recommendations: string[] = [];
	let positivePoints: string[] = [];
	let areasForObservation: string[] = [];
	let criticalAlerts: string[] = [];

	const averageScore =
		data.reduce((acc, item) => acc + item.score, 0) / data.length;

	const labelsBG: { [key: string]: string } = {
		'Aggression Rate': 'Ниво на агресия',
		'Emotional Status': 'Ниво на стрес',
		'Suicide Thinking': 'Мисли за самоубийство',
		'Mental Health Stability': 'Склоност към насилие',
		'Social Interaction': 'Социално взаимодействие',
        '': 'Тревожност'
	};

	data.forEach((item) => {
		const labelBG = labelsBG[item.label] || item.label;
		if (item.label === 'Suicide Thinking' && item.score < 9) {
			criticalAlerts.push(
				`Резултат от ${item.score}/10 по показател "Мисли за самоубийство" изисква незабавно внимание. От решаващо значение е да се започне диалог и да се обмисли незабавна професионална консултация.`
			);
		}

		if (item.score <= 4) {
			areasForObservation.push(`${labelBG} (${item.score}/10)`);
		} else if (item.score >= 8) {
			positivePoints.push(`${labelBG} (${item.score}/10)`);
		}
	});

	if (criticalAlerts.length > 0) {
		recommendations.push(
			'КРИТИЧНО: Препоръчва се незабавна намеса. Моля, консултирайте се със специалист по психично здраве.'
		);
	}

	if (areasForObservation.length > 0) {
		let obsText = ` следните области изискват по-внимателно наблюдение и открита комуникация: ${areasForObservation.join(
			', '
		)}.`;
		recommendations.push(obsText);
		recommendations.push(
			'Обмислете участие в дейности, които могат да помогнат за укрепване на тези области.'
		);
	}

	if (
		positivePoints.length === data.length &&
		criticalAlerts.length === 0 &&
		areasForObservation.length === 0
	) {
		return {
			summary: 'Отлично психично здраве.',
			report:
				'Всички показатели сочат към много здрава и устойчива личност.\n\nДетето демонстрира емоционална стабилност и положително социално поведение, добре съобразено с етапа на развитие.\n\nПродължавайте да насърчавате тази положителна среда.',
			recommendations: [
				'Поддържайте открита и подкрепяща комуникация.',
				'Насърчавайте настоящите хобита и социални дейности.',
			],
			criticalAlerts: [],
		};
	}

	let reportParts: string[] = [];
	reportParts.push(
		`В общи линии психичното здраве на детето изглежда в ${
			averageScore > 7 ? 'добро' : 'задоволително'
		} състояние с няколко основни силни страни.`
	);

	if (positivePoints.length > 0) {
		reportParts.push(
			`Положителни показатели в ${positivePoints.join(
				', '
			)} предполагат устойчивост и здрави механизми за справяне.`
		);
	}

	if (areasForObservation.length > 0) {
		reportParts.push(
			`Въпреки това, някои области като ${areasForObservation.join(
				', '
			)} биха могли да се възползват от допълнителна подкрепа и наблюдение.`
		);
	}

	return {
		summary: `${
			averageScore > 7 ? 'Добро психично здраве' : 'Нуждае се от наблюдение'
		}`,
		report: reportParts.join('\n\n'),
		recommendations:
			recommendations.length > 0
				? recommendations
				: ['Към момента няма конкретни препоръки, продължете с наблюдението.'],
		criticalAlerts,
	};
};

interface MentalHealthReportProps {
	reportData: ReportDataItem[] | null;
	isLoading: boolean;
}

const MentalHealthReport: React.FC<MentalHealthReportProps> = ({
	reportData,
	isLoading,
}) => {
	if (isLoading || !reportData) {
		return (
			<div className='mental-health-report-card'>
				<h2>Доклад за личност и психично здраве</h2>
				<div className='loading-section'>
					<p>Анализ на данни от Gemini API...</p>
				</div>
			</div>
		);
	}

	const analysis = generateAnalysis(reportData);
	const labelsBG: { [key: string]: string } = {
		'Aggression Rate': 'Ниво на агресия',
		'Emotional Status': 'Ниво на стрес',
		'Suicide Thinking': 'Мисли за самоубийство',
		'Mental Health Stability': 'Елементи на депресия',
		'Social Interaction': 'Интровертност',
	};

	const getRatingColorClass = (score: number): string => {
		if (score < 3) {
			return 'score-low';
		}
		if (score > 7) {
			return 'score-high';
		}
		return '';
	};

	return (
		<div className='mental-health-report-card'>
			<h2>Доклад за личност и психично здраве</h2>

            <div className='report-content'>
				<div className='ratings-grid'>
					{reportData.map((item) => (
						<div
							key={item.label}
							className={`rating-item ${getRatingColorClass(item.score)}`}
						>
							<span className='rating-label'>
								{labelsBG[item.label] || item.label}
							</span>
							<span className='rating-score'>{item.score}/10</span>
						</div>
					))}
				</div>

			<div className='recommendations-section'>
				{analysis.criticalAlerts && analysis.criticalAlerts.length > 0 && (
					<div className='report-subsection critical-alert'>
						<h4>Критични сигнали</h4>
						{analysis.criticalAlerts.map((alert, index) => (
							<p key={index}>{alert}</p>
						))}
					</div>
				)}
				<div className='analysis-section'>
					<h3>
						Резюме: <span className='summary-text'>{analysis.summary}</span>
					</h3>

					<div className='report-subsection'>
						<h4>Детайлен анализ</h4>
						<p>{analysis.report}</p>
					</div>
				</div>
			</div>

				{analysis.recommendations && analysis.recommendations.length > 0 && (
					<div className='report-subsection'>
						<h4>Препоръки</h4>
						<div>
							{analysis.recommendations.map((rec, index) => (
								<div key={index}>{rec}</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MentalHealthReport;
