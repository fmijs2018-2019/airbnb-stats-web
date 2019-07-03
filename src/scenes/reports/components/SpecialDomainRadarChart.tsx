import React, { PureComponent } from 'react';
import {
	Radar, RadarChart, PolarGrid,
	PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';

const data = [
	{
		subject: 'Math', A: 120, fullMark: 150,
	},
	{
		subject: 'Chinese', A: 98, fullMark: 150,
	},
	{
		subject: 'English', A: 86, fullMark: 150,
	}
];

export default class SpecialDomainRadarChart extends PureComponent {

	render() {
		return (
			<ResponsiveContainer>
				<RadarChart data={data} margin={{
					top: 20, right: 20, bottom: 20, left: 20,
				}}>
					<PolarGrid />
					<PolarAngleAxis dataKey="subject" />
					<PolarRadiusAxis angle={30} domain={[0, 150]} />
					<Radar dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
				</RadarChart>
			</ResponsiveContainer>
		);
	}
}
