import React, { PureComponent } from 'react';
import {
	Radar, RadarChart, PolarGrid,
	PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';



export interface IRadialChartData {
	label: string;
	value: number;
	fullMark: number;
}

export default class SpecialDomainRadarChart extends PureComponent<{data: IRadialChartData[]}> {

	render() {
		return (
			<ResponsiveContainer>
				<RadarChart data={this.props.data} margin={{
					top: 20, right: 20, bottom: 20, left: 20,
				}}>
					<PolarGrid />
					<PolarAngleAxis dataKey="label" />
					<PolarRadiusAxis angle={30} domain={[0, 150]} />
					<Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
				</RadarChart>
			</ResponsiveContainer>
		);
	}
}
