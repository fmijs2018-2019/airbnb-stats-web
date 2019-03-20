import * as React from 'react';
import { Index, RowMouseEventHandlerParams, TableCellRenderer, TableHeaderRenderer, Table, AutoSizer, Column, TableCellProps, TableHeaderProps } from 'react-virtualized';
import classNames from 'classnames';
import ExpandMore from '@material-ui/icons/ExpandMore';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import { WithStyles, Theme, createStyles, TableCell, withStyles, Tooltip, TableSortLabel } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    table: {
        fontFamily: theme.typography.fontFamily,
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableRowHover: {
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
    sortLabelIcon: {
        display: 'inline',
        opacity: 1,
    },
    sortLabelIconWithoutTransition: {
        display: 'inline',
        opacity: 1,
        transition: 'none',
    }
});

export interface IVirtualizedColumn {
    width: number;
    dataKey: string;
    label: string;
    flexGrow?: number;
    renderCell?: TableCellRenderer;
    disableSort?: boolean;
}

type CellRenderer = (props: TableCellProps, column: IVirtualizedColumn) => React.ReactNode;
type HeaderRenderer = (props: TableHeaderProps, column: IVirtualizedColumn) => React.ReactNode;

interface IVirtualizedTableProps extends WithStyles<typeof styles> {
    rowClassName?: string;
    rowHeight: number;
    headerHeight: number;
    columns: IVirtualizedColumn[];
    onRowClick?: (info: RowMouseEventHandlerParams) => void;
    rowCount: number;
    rowGetter: (index: Index) => any;
    sortable?: boolean;
    onSort?: (sortBy: string, sort: 'asc' | 'desc') => void;
    orderBy?: string;
    order: 'asc' | 'desc';
}

class VirtualizedTable extends React.Component<IVirtualizedTableProps> {
    constructor(props: any) {
        super(props);
    }

    getRowClassName = ({ index }: Index) => {
        const { classes, rowClassName } = this.props;
        return classNames(classes.tableRow, classes.flexContainer, rowClassName);
    };

    cellRenderer: CellRenderer = (cellProps, column) => {
        const { classes, rowHeight } = this.props;
        const data = column.renderCell ? column.renderCell(cellProps) : cellProps.cellData;

        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer)}
                variant="body"
                style={{ height: rowHeight }}
                align="left"
            >
                {data || '-'}
            </TableCell>
        );
    };

    createSortHandler = (property: string) => (event: any) => {
        let order: any = 'desc';

        if (this.props.orderBy === property && this.props.order === 'desc') {
            order = 'asc';
        }

        this.props.onSort && this.props.onSort(property, order);
    }

    headerRenderer: HeaderRenderer = ({ label, dataKey }, column) => {
        const { orderBy, order, headerHeight, classes, sortable } = this.props;

        const active = orderBy === dataKey;
        const header = !column.disableSort && sortable
            ? <Tooltip
                title={`Order by ${dataKey}`}
                placement="top-end"
                enterDelay={300}>
                <TableSortLabel
                    classes={{ icon: active ? classes.sortLabelIcon : classes.sortLabelIconWithoutTransition }}
                    active={active}
                    direction={order}
                    onClick={this.createSortHandler(dataKey)}
                    IconComponent={active ? ExpandMore : UnfoldMore}
                >
                    {label}
                </TableSortLabel>
            </Tooltip>
            : label;


        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={'left'}
            >
                {header}
            </TableCell>
        );
    };

    render() {
        const { classes, columns, headerHeight, rowHeight, onRowClick, rowGetter, rowCount } = this.props;

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        headerHeight={headerHeight}
                        rowHeight={rowHeight}
                        rowGetter={rowGetter}
                        rowCount={rowCount}
                        onRowClick={onRowClick}
                        className={classes.table}
                        height={height}
                        width={width}
                        rowClassName={this.getRowClassName}
                    >
                        {columns.map((col) => {
                            const { dataKey, flexGrow, width, label } = col
                            return (
                                <Column
                                    key={dataKey}
                                    headerRenderer={props => this.headerRenderer(props, col)}
                                    className={classNames(classes.flexContainer)}
                                    cellRenderer={props => this.cellRenderer(props, col)}
                                    dataKey={dataKey}
                                    flexGrow={flexGrow}
                                    width={width}
                                    label={label}
                                />
                            );
                        })}
                    </Table>
                )}
            </AutoSizer>
        );
    }
}

export default withStyles(styles)(VirtualizedTable);