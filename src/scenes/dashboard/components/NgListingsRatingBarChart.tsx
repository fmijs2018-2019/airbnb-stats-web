import * as React from 'react';
import { BarChart, CartesianGrid, YAxis, Tooltip, Legend, Bar, XAxis, Margin } from 'recharts';
import { IRatingReport } from '../../../models/neighborhoods/neighborhood';

interface Props {
    byRating: IRatingReport[];
    width: number;
    height: number;
    barSize: number;
    margin?: Partial<Margin>;
}

export default (props: Props) => {
    const { byRating, width, height, barSize, margin } = props;

    let reportByRange: any = { };
        for (let i = -1; i < 10; i++) {
            reportByRange[i.toString()] = {
                range: i >= 0 ? `${i * 10 + 1}-${(i + 1) * 10}` : 'NO', // range string or NO for listings without reports
                count: 0 // count of listings in rating range
            }          
        }

        for (let i = 0; i < byRating.length; i++) {
            const el = byRating[i];
            const rt = el.rating ? Math.floor((el.rating - 1) / 10) : -1;
            reportByRange[rt].count += el.count;
        }

    const reports = (Object as any).values(reportByRange);

    const renderLegend = () => {
        return <ul style={{margin: 0, listStyle: 'none'}}>
            <li style={{textAlign: 'center'}}>Rating</li>
        </ul>
    }

    return (
        <BarChart margin={margin} width={width} height={height} data={reports}>
            <CartesianGrid stroke='#f5f5f5' />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Legend content={renderLegend} margin={{left: 20, right: 0}} align="center" verticalAlign="top" />
            <Bar dataKey='count' barSize={barSize} fill='#413ea0' />
        </BarChart>
    );
}