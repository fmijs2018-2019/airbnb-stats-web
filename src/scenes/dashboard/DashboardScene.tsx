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
import { PieChart, Pie, Cell } from 'recharts';
import { any, object } from 'prop-types';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

const colors = [
    [65, 182, 196, 100],
    [127, 205, 187, 100],
    [199, 233, 180, 100],
    [237, 248, 177, 100],
    [255, 255, 204, 100],
    [255, 237, 160, 100],
    [254, 217, 118, 100],
    [254, 178, 76, 100],
    [253, 141, 60, 100],
    [252, 78, 42, 100],
    [227, 26, 28, 100],
    [189, 0, 38, 100],
    [128, 0, 38, 100],
    [65, 18, 196, 100],
    [66, 107, 244, 100],
    [109, 240, 255, 100],
    [102, 56, 201, 100],
    [162, 229, 96, 100],
    [219, 167, 160, 100],
    [90, 232, 90, 100],
    [211, 183, 80, 100],
    [191, 80, 210, 100],
    [1, 78, 42, 100],
    // [227, 26, 28, 100],
    // [189, 0, 38, 100],
    // [128, 0, 38, 100]
];

const colorsStrings = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

interface IFeature { object: { properties: { id: number } }, coordinate: number[] }

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
    fetchReports: (id: number | null) => Promise<IReportsData>;
}

interface DashBoardSceneState {
    viewState: IViewState,
    selectedNeighborhoodId: number | null,
    hoveredNeighborhoodId: number | null
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
    transitionDuration: 3000,
    transitionInterpolator: new FlyToInterpolator()
}

class DashBoardScene extends React.Component<DashBoardSceneProps, DashBoardSceneState> {
    constructor(props: Readonly<DashBoardSceneProps>) {
        super(props);

        this.state = {
            viewState: initialViewState,
            selectedNeighborhoodId: null,
            hoveredNeighborhoodId: null
        }

        this.onViewStateChange = this.onViewStateChange.bind(this);
        this.setNeighborhood = this.setNeighborhood.bind(this);
        this.hoverHandler = this.hoverHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.getIconColor = this.getIconColor.bind(this);
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
            sizeScale: 2,
            getPosition: (d: any) => [d.longitude, d.latitude],
            getIcon: () => 'marker',
            getSize: () => 7,
            getColor: this.getIconColor,
        });

        const geoJsonAllLayer = !selectedId && new GeoJsonLayer({
            id: 'geojson-all-layer',
            data: _.map(this.props.neighborhoods, 'geoJson'),
            pickable: true,
            stroked: true,
            filled: true,
            extruded: false,
            lineWidthMinPixels: 2,
            getFillColor: (object: { properties: { id: number } }) => colors[object.properties.id],
            lineJointRounded: true,
            getLineColor: [196, 196, 196, 200],
            fp64: true,
            getLineWidth: 1,
            onHover: this.hoverHandler,
            onClick: this.clickHandler
        });

        const selectedNgGeoJsonLayer = selectedId && neighborhoods && new GeoJsonLayer({
            id: 'geojson-neighborhood-layer',
            data: neighborhoods[selectedId] && neighborhoods[selectedId].geoJson,
            pickable: true,
            stroked: true,
            filled: false,
            extruded: false,
            lineWidthMinPixels: 2,
            getFillColor: [0, 0, 0, 0],
            lineJointRounded: true,
            getLineColor: [255, 255, 255, 255],
            fp64: true,
            getLineWidth: 25,
        });

        const hoveredNgGeoJsonLayer = hoveredId && !selectedId && neighborhoods && new GeoJsonLayer({
            id: 'geojson-neighborhood-layer',
            data: neighborhoods[hoveredId] && neighborhoods[hoveredId].geoJson,
            pickable: true,
            stroked: true,
            filled: true,
            extruded: false,
            lineWidthMinPixels: 2,
            getFillColor: (object: { properties: { id: number } }) => _.concat(_.take(colors[object.properties.id], 3), 220),
            lineJointRounded: true,
            getLineColor: [255, 255, 255, 255],
            fp64: true,
            getLineWidth: 25,
        });

        console.log(selectedNgGeoJsonLayer, hoveredNgGeoJsonLayer, geoJsonAllLayer);
        return selectedId && [iconLayer, selectedNgGeoJsonLayer] || [hoveredNgGeoJsonLayer, geoJsonAllLayer];
    }

    hoverHandler(feature: IFeature) {
        if (feature.object) {
            this.setState({
                ...this.state,
                hoveredNeighborhoodId: feature.object.properties.id
            });
        } else {
            this.setState({
                ...this.state,
                hoveredNeighborhoodId: null
            });
        }
    };

    clickHandler(feature: IFeature) {
        if (feature.object) {
            this.setNeighborhood(feature.object.properties.id);
        } else {
            this.setState({
                ...this.state,
                selectedNeighborhoodId: null
            });
        }
    };

    getIconColor(location: IListingLocation): number[] {
        if (location.roomTypeId === 1) return [247, 19, 72];
        if (location.roomTypeId === 2) return [127, 239, 217];
        if (location.roomTypeId === 3) return [0, 107, 247];
        return [255, 255, 255];
    };

    onViewStateChange({ viewState }: any) {
        this.setState({ ...this.state, viewState });
    }

    setNeighborhood(neighborhoodId: number) {
        const ng = _.find(this.props.neighborhoods, (ng) => ng.id === neighborhoodId);
        const newViewState: IViewState = {
            longitude: ng && ng.centerLongitude || initialViewState.longitude,
            latitude: ng && ng.centerLatitude || initialViewState.latitude,
            zoom: ng && ng.zoom || initialViewState.zoom,
            pitch: 0,
            bearing: 0,
            transitionDuration: 3000,
            transitionInterpolator: new FlyToInterpolator()
        };

        this.props.fetchReports(neighborhoodId)
            .then(() => {
                this.setState({
                    ...this.state,
                    selectedNeighborhoodId: neighborhoodId,
                    viewState: newViewState
                });
            });
    };

    render() {
        // const layers = this.getLayers();
        const { reports, classes: { button }, neighborhoods, locations } = this.props;
        const byRoomType = reports && reports.byRoomType || undefined;
        const byPropertyType = reports && reports.byPropertyType || undefined;

        return (
            <React.Fragment>
                {neighborhoods && locations && <DeckGL
                    viewState={this.state.viewState}
                    layers={this.getLayers()}
                    controller={true}
                    onViewStateChange={this.onViewStateChange}
                >
                    <StaticMap mapStyle='mapbox://styles/mapbox/dark-v9' width="100%" height="100%" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                </DeckGL>}
                {this.state.selectedNeighborhoodId && <div className="dashboard-pannel">
                    <Close className={button} onClick={() => this.setState({ ...this.state, selectedNeighborhoodId: null, hoveredNeighborhoodId: null, viewState: initialViewState })} />
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
    fetchReports: (id: number | null): Promise<IReportsData> => dispatch(fetchReports(id)),
});

export default connect<DashBoardSceneStateProps, DashBardSceneActionsProps>(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DashBoardScene));