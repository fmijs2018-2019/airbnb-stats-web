import * as React from 'react';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { ITypeReport } from 'src/models/neighborhoods/neighborhood';

interface Props {
    width: number;
    height: number;
    innerRadius: number;
    outerRadius: number;
    cx?: string | number;
    cy?: string | number;
    ngListingsByType: ITypeReport[];
}

export default (props: Props) => {
    const { width, height, ngListingsByType, cx, cy, outerRadius, innerRadius } = props;
    const widthPixels = width.toString() + 'px';
    let reports = ngListingsByType;

    if (reports.length >= 5) {
        // combine all after the 4th to one
        reports = props.ngListingsByType
            .sort((a, b) => b.count - a.count)
            .slice(0, 4);

        const other = ngListingsByType
            .sort((a, b) => b.count - a.count)
            .slice(4, ngListingsByType.length)
            .reduce<ITypeReport>((prevValue, currentValue) => {
                prevValue.count += currentValue.count;
                return prevValue;
            }, { id: 0, type: 'Other', count: 0 });

            reports.push(other);
    }

    return (
            <PieChart width={width} height={height}>
                <Pie
                    legendType="square"
                    dataKey="count"
                    nameKey="type"
                    data={reports}
                    cy={cy}
                    cx={cx}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    fill="#82ca9d"
                    label />
                <Legend iconSize={8} verticalAlign="bottom" />
                <Tooltip />
            </PieChart>
    );
}