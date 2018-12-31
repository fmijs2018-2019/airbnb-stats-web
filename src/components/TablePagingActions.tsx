import * as React from "react";
import { withStyles, createStyles, Theme, WithStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const styles = (theme: Theme) => createStyles({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
    button: {
        padding: '6px',
    }
});

interface ITablePaginationActionsProps extends WithStyles<typeof styles> {
    count: number,
    onChangePage: (event: any, page: number) => void,
    page: number,
    rowsPerPage: number,
    theme: number,
}

class TablePaginationActions extends React.Component<ITablePaginationActionsProps> {
    handleFirstPageButtonClick = (event: any) => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = (event: any) => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = (event: any) => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = (event: any) => {
        const lastPage = Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1);
        this.props.onChangePage(event, lastPage);
    };

    render() {
        const { classes, count, page, rowsPerPage } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    classes={{ root: classes.button }}
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    classes={{ root: classes.button }}
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    classes={{ root: classes.button }}
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    classes={{ root: classes.button }}
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    <LastPageIcon />
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(TablePaginationActions);