import { Button, Theme, createStyles, WithStyles, MobileStepper, withStyles } from "@material-ui/core";
import * as React from 'react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const styles = (theme: Theme) => createStyles({
    btn: {
        color: 'rgba(32, 35, 42, 0.9)',
    },
    btnDisable: {
        color: 'rgba(0, 0, 0, 0.26)',
    },
    dots: {
        backgroundColor: 'rgba(247, 19, 72, .3)',
    },
    dotsActive: {
        backgroundColor: 'rgba(247, 19, 72, .8)',
    }
});

interface StepperProps extends WithStyles<typeof styles> {
    activeStep: number;
    stepsCount: number;
    handleNext: () => void;
    handleBack: () => void;
}

const Stepper = (props: StepperProps) => {
    const { classes, activeStep, stepsCount, handleNext, handleBack } = props;
    return (
        <MobileStepper
            classes={{ dot: classes.dots, dotActive: classes.dotsActive }}
            variant="dots"
            steps={stepsCount}
            position="static"
            activeStep={activeStep}
            nextButton={
                <Button classes={{ root: classes.btn, disabled: classes.btnDisable }} size="small" onClick={handleNext} disabled={activeStep === stepsCount - 1}>
                    Next<KeyboardArrowRight />
                </Button>
            }
            backButton={
                <Button classes={{ root: classes.btn, disabled: classes.btnDisable }} size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                </Button>
            }
        />
    );
}

export default withStyles(styles)(Stepper);