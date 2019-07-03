import React, { PureComponent } from 'react';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
	{
		name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
	},
	{
		name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
	},
	{
		name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
	},
	{
		name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
	},
	{
		name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
	},
	{
		name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
	},
	{
		name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
	},
];

export interface ITripleLineChartProps {
	data: any[],
	dataKey1: string,
	dataKey2: string,
	dataKey3: string,
	label: string,
}

export default class SimpleLineChart extends PureComponent<ITripleLineChartProps> {

	render() {
		return (
			<ResponsiveContainer>
				<LineChart
					data={this.props.data}
					margin={{
						top: 20, right: 20, bottom: 20, left: 20,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey={this.props.label} />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey={this.props.dataKey1} stroke="#8884d8" activeDot={{ r: 8 }} />
					<Line type="monotone" dataKey={this.props.dataKey2} stroke="#632428" activeDot={{ r: 8 }} />
					<Line type="monotone" dataKey={this.props.dataKey3} stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		);
	}
}
