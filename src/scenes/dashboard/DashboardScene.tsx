import DeckGL, { IconLayer, GeoJsonLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap, ViewState, FlyToInterpolator, TransitionInterpolator } from 'react-map-gl';
import { connect } from 'react-redux';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { INeighborhood, IReportsData } from 'src/models/neighborhoods/neighborhood';
import { fetchLocations } from 'src/redux/actions/listingsActions';
import { fetchNeighborhoods, fetchReports } from 'src/redux/actions/neighborhoodsActions';
import { IApplicationState } from 'src/redux/store';
import './DashboardScene.css';
import mapMarker from './utils/map_marker.png';
import * as _ from 'lodash';
import Close from '@material-ui/icons/Close';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Charts } from './charts';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

const colors = [
    [65, 182, 196, 255],
    [127, 205, 187, 255],
    [199, 233, 180, 255],
    [237, 248, 177, 255],
    [255, 255, 204, 255],
    [255, 237, 160, 255],
    [254, 217, 118, 255],
    [254, 178, 76, 255],
    [253, 141, 60, 255],
    [252, 78, 42, 255],
    [227, 26, 28, 255],
    [189, 0, 38, 255],
    [128, 0, 38, 255],
    [65, 18, 196, 255],
    [66, 107, 244, 255],
    [109, 240, 255, 255],
    [102, 56, 201, 255],
    [162, 229, 96, 255],
    [219, 167, 160, 255],
    [90, 232, 90, 255],
    [211, 183, 80, 255],
    [191, 80, 210, 255],
    [1, 78, 42, 255],
];

interface IViewState extends ViewState {
    transitionDuration?: number,
    transitionInterpolator?: TransitionInterpolator
}

interface DashBoardSceneStateProps {
    locations: _.Dictionary<IListingLocation[]> | null;
    neighborhoods: _.Dictionary<INeighborhood> | null;
    reports: IReportsData | null;
}

interface DashBardSceneActionsProps {
    fetchNeighborhoods: () => Promise<INeighborhood[]>;
    fetchLocations: () => Promise<IListingLocation[]>;
    fetchReports: (id: number) => Promise<IReportsData>;
}

interface IHoveredInfo {
    object: {
        message: string,
        properties: { id: number, neighbourhood: string }
    },
    x: string,
    y: string,
    coordinate: number[]
};

interface DashBoardSceneState {
    viewState: IViewState,
    selectedNeighborhoodId: number | null,
    hoveredNeighborhoodId: number | null,
    hoveredItemInfo: IHoveredInfo | null
}

const styles = (theme: Theme) => createStyles({
    button: {
        top: 0,
        right: 0,
        margin: '5px',
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        borderRadius: '50%',
        position: 'absolute',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            cursor: 'pointer'
        }
    }
});
interface DashBoardSceneProps extends DashBoardSceneStateProps, DashBardSceneActionsProps, WithStyles<typeof styles> {
}

const initialViewState: IViewState = {
    longitude: 4.916651,
    latitude: 52.366693,
    zoom: 11,
    pitch: 0,
    bearing: 0,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator()
}

class DashBoardScene extends React.Component<DashBoardSceneProps, DashBoardSceneState> {
    constructor(props: Readonly<DashBoardSceneProps>) {
        super(props);

        this.state = {
            viewState: initialViewState,
            selectedNeighborhoodId: null,
            hoveredNeighborhoodId: null,
            hoveredItemInfo: null
        }

        this.onViewStateChange = this.onViewStateChange.bind(this);
        this.setNeighborhood = this.setNeighborhood.bind(this);
        this.hoverHandler = this.hoverHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.getIconColor = this.getIconColor.bind(this);
        this.renderTooltip = this.renderTooltip.bind(this);
    }

    componentDidMount() {
        !this.props.locations && this.props.fetchLocations();
        !this.props.neighborhoods && this.props.fetchNeighborhoods();
    }

    getLayers(): any[] {
        const hoveredId = this.state.hoveredNeighborhoodId;
        const selectedId = this.state.selectedNeighborhoodId;
        const { locations, neighborhoods } = this.props;

        const iconLayer = locations && selectedId && locations[selectedId] && new IconLayer({
            id: 'icon-layer',
            pickable: true,
            data: locations[selectedId],
            iconAtlas: mapMarker,
            iconMapping: {
                marker: {
                    "x": 150,
                    "y": 150,
                    "width": 400,
                    "height": 400,
                    "mask": true
                }
            },
            sizeScale: 4,
            getPosition: (d: IListingLocation) => [d.lon, d.lat],
            getIcon: () => 'marker',
            getSize: () => 7,
            getColor: this.getIconColor,
            visible: selectedId,
        });

        const geoJsonAllLayer = !selectedId && new GeoJsonLayer({
            id: 'geojson-all-layer',
            data: _.map(this.props.neighborhoods, 'geoJson'),
            pickable: true,
            stroked: true,
            filled: true,
            extruded: false,
            getFillColor: (object: { properties: { id: number } }) => colors[object.properties.id],
            opacity: 0.15,
            lineJointRounded: true,
            getLineColor: [196, 196, 196, 255],
            getLineWidth: 25,
            onHover: this.hoverHandler,
            onClick: this.clickHandler,
            visible: !selectedId
        });

        const selectedNgGeoJsonLayer = selectedId && neighborhoods && new GeoJsonLayer({
            id: 'selected-neighborhood-layer',
            data: neighborhoods[selectedId] && neighborhoods[selectedId].geoJson,
            stroked: true,
            filled: false,
            extruded: false,
            getFillColor: [0, 0, 0, 0],
            lineJointRounded: true,
            getLineColor: [255, 255, 255, 255],
            getLineWidth: 10,
            visible: selectedId
        });

        const hoveredNgGeoJsonLayer = hoveredId && !selectedId && neighborhoods && new GeoJsonLayer({
            id: 'hovered-neighborhood-layer',
            data: neighborhoods[hoveredId] && neighborhoods[hoveredId].geoJson,
            stroked: true,
            filled: true,
            extruded: false,
            lineWidthMinPixels: 2,
            getFillColor: (object: { properties: { id: number } }) => colors[object.properties.id],
            opacity: 2,
            lineJointRounded: true,
            getLineColor: [255, 255, 255, 255],
            getLineWidth: 25,
            visible: !selectedId
        });

        return [iconLayer, selectedNgGeoJsonLayer, hoveredNgGeoJsonLayer, geoJsonAllLayer];
    }

    hoverHandler(feature: IHoveredInfo) {
        if (feature.object) {
            this.setState({
                hoveredNeighborhoodId: feature.object.properties.id,
                hoveredItemInfo: feature
            });
        } else {
            this.setState({
                hoveredNeighborhoodId: null,
                hoveredItemInfo: null
            });
        }
    };

    clickHandler(feature: IHoveredInfo) {
        if (feature.object) {
            this.setNeighborhood(feature.object.properties.id);
            this.setState({
                hoveredItemInfo: null,
                hoveredNeighborhoodId: null
            })
        } else {
            this.setState({
                selectedNeighborhoodId: null,
            });
        }
    };

    renderTooltip() {
        const { hoveredItemInfo } = this.state;

        if (!hoveredItemInfo || !hoveredItemInfo.object || !this.props.locations) {
            return null;
        }

        const neighborhoodName = hoveredItemInfo.object.properties.neighbourhood;
        const neighborhoodId = hoveredItemInfo.object.properties.id;
        const listingsCount = this.props.locations[neighborhoodId].length
        return hoveredItemInfo && hoveredItemInfo.object && (
            <div style={{ backgroundColor: 'black', color: 'white', padding: '3px', position: 'absolute', zIndex: 99999, pointerEvents: 'none', left: hoveredItemInfo.x, top: hoveredItemInfo.y }}>
                <div>
                    Neighborhood: {neighborhoodName}
                </div>
                <div>
                    Listings: {listingsCount}
                </div>
            </div>
        );
    };

    getIconColor(location: IListingLocation): number[] {
        if (location.rId === 1) return [247, 19, 72];
        if (location.rId === 2) return [127, 239, 217];
        if (location.rId === 3) return [0, 107, 247];
        return [255, 255, 255];
    };

    onViewStateChange({ viewState }: any) {
        this.setState({ viewState });
    }

    setNeighborhood(neighborhoodId: number) {
        const ng = this.props.neighborhoods && this.props.neighborhoods[neighborhoodId];

        if (!ng) {
            return;
        }

        const newViewState: IViewState = {
            longitude: ng.centerLongitude,
            latitude: ng.centerLatitude,
            zoom: ng.zoom,
            pitch: 0,
            bearing: 0,
            transitionDuration: 1000,
            transitionInterpolator: new FlyToInterpolator()
        };

        this.props.fetchReports(neighborhoodId)
            .then(() => {
                this.setState({
                    selectedNeighborhoodId: neighborhoodId,
                    viewState: newViewState
                });
            });
    };

    render() {
        const { reports, classes: { button }, neighborhoods, locations } = this.props;

        return (
            <React.Fragment>
                {neighborhoods && locations && <DeckGL
                    viewState={this.state.viewState}
                    layers={this.getLayers()}
                    controller={true}
                    onViewStateChange={this.onViewStateChange}
                    useDevicePixels={false}>
                    <StaticMap mapStyle="mapbox://styles/mapbox/dark-v9" width="100%" height="100%" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                </DeckGL>}
                {this.renderTooltip()}
                {this.state.selectedNeighborhoodId && <div className="dashboard-pannel">
                    <div>
                        {this.props.neighborhoods && <p style={{ margin: "20px", textAlign: "center" }}>{this.props.neighborhoods[this.state.selectedNeighborhoodId].name}</p>}
                        <Close className={button} onClick={() => this.setState({ selectedNeighborhoodId: null, hoveredNeighborhoodId: null, viewState: initialViewState })} />
                        {this.props.locations && <div style={{ textAlign: "right", margin: "15px" }}>total: {this.props.locations[this.state.selectedNeighborhoodId].length}</div>}
                    </div>
                    {reports && <Charts data={reports} />}
                </div>}
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state: IApplicationState) => {
    return {
        locations: state.locations.list,
        neighborhoods: state.neighborhoods.list,
        reports: state.neighborhoods.reports,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchLocations: (): Promise<IListingLocation[]> => dispatch(fetchLocations()),
    fetchNeighborhoods: (): Promise<INeighborhood[]> => dispatch(fetchNeighborhoods()),
    fetchReports: (id: number): Promise<IReportsData> => dispatch(fetchReports(id)),
});

export default connect<DashBoardSceneStateProps, DashBardSceneActionsProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashBoardScene));