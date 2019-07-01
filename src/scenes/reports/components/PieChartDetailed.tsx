import { PieChart, Pie, Sector } from 'recharts';
import * as React from 'react';
import { ITypeReport } from '../../../models/neighborhoods/neighborhood';

export const fakeData = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }, { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }, { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }, { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }, { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }, { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];

interface IProps {
    cx: number,
    cy: number,
    midAngle: number,
    startAngle: number,
    endAngle: number,
    fill: string,
    percent: number,
    value: number,
    activeIndex: number,
    onPieEnter: (data: any, index: any) => void,
    //data: ITypeReport[]
}

export default (props: IProps) => {
    const innerRadius = 60;
    const outerRadius = 80;
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, startAngle, endAngle,
        fill, percent, value, activeIndex, onPieEnter } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    const renderActiveShape = (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{fakeData[activeIndex].name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    )

    return (
        <PieChart width={800} height={400}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={fakeData}
                cx={300}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                onMouseEnter={onPieEnter}
                dataKey="count"
                nameKey="type"
            />
        </PieChart>
    );
};
