import React, { PureComponent } from 'react';
import {
	ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export interface IBarChartData {
	name: string,
	value: number,
}

export default class ComposedBarChart extends PureComponent<{data: IBarChartData[]}> {

	render() {
		return (
			<ResponsiveContainer>
				<ComposedChart
					data={this.props.data}
					margin={{
						top: 20, right: 20, bottom: 20, left: 20,
					}}
				>
					<CartesianGrid stroke="#f5f5f5" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="value" fill="#413ea0" />
					<Line type="monotone" dataKey="value" stroke="#ff7300" />
				</ComposedChart>
			</ResponsiveContainer>
		);
	}
}
