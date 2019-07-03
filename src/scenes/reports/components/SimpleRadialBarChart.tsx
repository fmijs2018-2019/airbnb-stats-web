import { RadialBarChart, Legend, RadialBar, ResponsiveContainer } from 'recharts';
import React from 'react';
import './SimpleRadialBarChart.css';

const data = [
	{ name: '18-24', uv: 31.47, fill: '#8884d8' },
	{ name: '25-29', uv: 26.69, fill: '#83a6ed' },
	{ name: '30-34', uv: 15.69, fill: '#8dd1e1' },
	{ name: '35-39', uv: 8.22, fill: '#82ca9d' },
	{ name: '40-49', uv: 8.63, fill: '#a4de6c' },
	{ name: '50+', uv: 2.63, fill: '#d0ed57' },
	{ name: 'unknow', uv: 6.67, fill: '#ffc658' }
];

export interface IChartFillData {
	name: string,
	value: number,
	fill: string,
}

export default (props: { data: IChartFillData[] }) => {
	return (
		<ResponsiveContainer>
			<RadialBarChart data={props.data} margin={{
				top: 20, right: 20, bottom: 20, left: 20,
			}}>
				<RadialBar label={{ position: 'insideStart', fill: '#fff' }} background dataKey='value' />
				<Legend iconSize={10} width={100} verticalAlign="middle" layout="horizontal" align="right" />
			</RadialBarChart>
		</ResponsiveContainer>
	);
}