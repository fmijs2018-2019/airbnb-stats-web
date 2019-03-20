import { Theme, createStyles, WithStyles, withStyles, TablePagination } from '@material-ui/core';
import * as React from 'react';
import classNames from 'classnames';
import TablePagingActions from './TablePagingActions';

const styles = (theme: Theme) => createStyles({
    root: {
        border: 'none',
    }
});

interface ITablePagingProps extends WithStyles<typeof styles> {
    className?: string,
    page: number;
    pagesCount: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

class TablePaging extends React.Component<ITablePagingProps> {

    handleChangePage = (event: any, page: number) => {
        this.props.onPageChange(page);
    };

    handleChangeRowsPerPage = (event: any) => {
        this.props.onPageSizeChange(event.target.value);
    };

    render() {
        const { rowsPerPage, page, pagesCount, classes, className } = this.props;

        const rootClasses = classNames(classes.root, className);

        return (
            <TablePagination
                classes={{root: rootClasses}}
                rowsPerPageOptions={[5, 10, 20]}
                colSpan={3}
                count={pagesCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePagingActions as any}
            />
        );
    }
}

export default withStyles(styles)(TablePaging);
