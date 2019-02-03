import * as React from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

interface IFromToDatePickerProps extends WithStyles {
    from?: string,
    to?: string,
    fromChangeHandler: (newDate: string) => void,
    toChangeHandler: (newDate: string) => void
};

class FromToDatePicker extends React.Component<IFromToDatePickerProps> {

    render() {
        const { classes, from, to, fromChangeHandler, toChangeHandler } = this.props;

        return (
            <React.Fragment>
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="From"
                        type="date"
                        value={from || ''}
                        InputProps={{}}
                        onChange={(event: any) => fromChangeHandler(event.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
                <br />
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="To"
                        type="date"
                        value={to || ''}
                        onChange={(event: any) => toChangeHandler(event.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(FromToDatePicker);