import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import * as React from 'react';
import NgListingsByTypePieChart from './NgListingsByTypePieChart';
import NgListingsRatingBarChart from './NgListingsRatingBarChart';
import { INeighborhoodReport } from '../../../models/neighborhoods/neighborhood';
import Panel from '../../../components/Panel';
import Stepper from '../../../components/Stepper';

interface NgReportProps extends WithStyles<typeof styles> {
    ng: INeighborhoodReport;
    listingsCount: number;
    onClose: () => void;
}

const styles = (theme: Theme) => createStyles({

})

class NgReportPanel extends React.Component<NgReportProps, any> {
    constructor(props: Readonly<NgReportProps>) {
        super(props);
        this.state = { activeStep: 0 };
    }

    handleNext = () => {
        this.setState((state: any) => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState((state: any) => ({
            activeStep: state.activeStep - 1,
        }));
    };

    header = () => {
        return <div>
            <div>{this.props.ng.name}</div>
            <p style={{margin: 0, textAlign: 'center', fontSize: '15px'}}>
                {'listings: ' + this.props.listingsCount}
            </p>
        </div>
    }

    render() {
        const { ng, onClose, classes } = this.props;
        return (
            <Panel header={this.header()} clickHandler={onClose}>
                {this.state.activeStep === 0 && <div style={{ width: '274px' }}>
                    <NgListingsRatingBarChart byRating={ng.byRating} width={235} height={280} barSize={20}/>
                </div>}
                {this.state.activeStep === 1 && <div style={{ width: '274px' }}>
                    <NgListingsByTypePieChart
                        ngListingsByType={ng.byPropType}
                        innerRadius={40}
                        outerRadius={80}
                        cy={110}
                        width={274}
                        height={280} />
                </div>}
                {this.state.activeStep === 2 && <div style={{width: '274px'}}>
                    <NgListingsByTypePieChart
                        ngListingsByType={ng.byRoomType}
                        innerRadius={40}
                        outerRadius={80}
                        cy={110}
                        width={274}
                        height={280} />
                </div>}
                <Stepper handleBack={this.handleBack} handleNext={this.handleNext} activeStep={this.state.activeStep} stepsCount={3} />
            </Panel>
        );
    }
}

class CustomTooltip extends React.Component<any> {
    render() {
        return (
            <div>
                {this.props.payload.type}
            </div>
        );
    }
}

export default withStyles(styles)(NgReportPanel);