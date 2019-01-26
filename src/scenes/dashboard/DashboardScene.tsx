import DeckGL, { IconLayer, GeoJsonLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap, ViewState, FlyToInterpolator, TransitionInterpolator } from 'react-map-gl';
import { connect } from 'react-redux';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { INeighborhoodDetailed, IReportsData, INeighborhoodReport } from 'src/models/neighborhoods/neighborhood';
import { fetchLocations } from 'src/redux/actions/listingsActions';
import { fetchNeighborhoodsDetailed, fetchNeighborhoodReports, fetchAllReports } from 'src/redux/actions/neighborhoodsActions';
import { IApplicationState } from 'src/redux/store';
import './DashboardScene.css';
import mapMarker from './utils/map_marker.png';
import * as _ from 'lodash';
import NeighTooltip, { NeighTooltipProps } from './components/NeighTooltip';
import Pannel from './components/pannel';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

interface IViewState extends ViewState {
    transitionDuration?: number;
    transitionInterpolator?: TransitionInterpolator;
    onTransitionStart?: () => void;
    onTransitionEnd?: () => void;
}

interface DashBoardSceneStateProps {
    locations: _.Dictionary<IListingLocation[]> | null;
    neighborhoods: _.Dictionary<INeighborhoodDetailed> | null;
    allReports: _.Dictionary<INeighborhoodReport> | null;
}

interface DashBardSceneActionsProps {
    fetchNeighborhoodsDetailed: () => Promise<INeighborhoodDetailed[]>;
    fetchLocations: () => Promise<IListingLocation[]>;
    fetchAllReports: () => Promise<INeighborhoodReport[]>;
}

interface DashBoardSceneState {
    viewState: IViewState,
    selectedNgId: number | null,
    hoveredNgId: number | null,
    tooltipInfo: NeighTooltipProps | null,
    showAllGeoJsons: boolean
}
interface DashBoardSceneProps extends DashBoardSceneStateProps, DashBardSceneActionsProps {
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
            selectedNgId: null,
            hoveredNgId: null,
            tooltipInfo: null,
            showAllGeoJsons: true,
        }

        this.onViewStateChange = this.onViewStateChange.bind(this);
        this.setNeighborhood = this.setNeighborhood.bind(this);
        this.hoverHandler = this.hoverHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.closePannelHandler = this.closePannelHandler.bind(this);
    }

    componentDidMount() {
        !this.props.locations && this.props.fetchLocations();
        !this.props.neighborhoods && this.props.fetchNeighborhoodsDetailed();
        !this.props.allReports && this.props.fetchAllReports();
    }

    getLayers(): any[] {
        const { hoveredNgId, selectedNgId } = this.state;
        const { locations, neighborhoods } = this.props;

        const iconLayer = locations && new IconLayer({
            id: `icon-layer`,
            pickable: true,
            data: selectedNgId ? locations[selectedNgId] : [],
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
            getColor: [247, 19, 72, 200],
            visible: selectedNgId,
        });

        const geoJsonAllLayer = neighborhoods && new GeoJsonLayer({
            id: 'geojson-all-layer',
            data: _.map(neighborhoods, 'geoJson'),
            pickable: true,
            filled: true,
            extruded: false,
            getFillColor: [0, 0, 0, 0],
            lineJointRounded: true,
            getLineColor: [255, 255, 255, 255],
            getLineWidth: 40,
            onHover: this.hoverHandler,
            onClick: this.clickHandler,
            visible: this.state.showAllGeoJsons
        });

        const selectedNgLayer = neighborhoods && selectedNgId && new GeoJsonLayer({
            id: `geoJson-selected-layer`,
            data: neighborhoods[selectedNgId].geoJson,
            stroked: true,
            filled: false,
            extruded: false,
            lineJointRounded: true,
            getLineColor: [255, 255, 255, 150],
            getLineWidth: 10,
            visible: selectedNgId
        });

        const hoveredNgLayer = hoveredNgId && neighborhoods && new GeoJsonLayer({
            id: `geoJson-hovered-layer`,
            data: neighborhoods[hoveredNgId].geoJson,
            filled: true,
            getFillColor: [0, 0, 0, 0],
            extruded: false,
            getLineColor: [255, 0, 170],
            getLineWidth: 30,
        });

        return [iconLayer, selectedNgLayer, geoJsonAllLayer, hoveredNgLayer];
    }

    hoverHandler(feature: any) {
        const { locations } = this.props;

        if (feature.object) {
            const ngName = feature.object.properties.neighbourhood;
            const ngId = feature.object.properties.id;
            const listCount = locations ? locations[ngId].length : 0;
            const { x, y } = feature;
            const tooltipProps: NeighTooltipProps = { ngName, listCount, x, y };

            this.setState({ hoveredNgId: feature.object.properties.id, tooltipInfo: tooltipProps });
        } else {
            this.setState({ hoveredNgId: null, tooltipInfo: null });
        }
    };

    clickHandler(feature: any) {
        if (feature.object) {
            const ngId = feature.object.properties.id;
            this.setNeighborhood(ngId);
        }
    };

    onViewStateChange({ viewState }: any) {
        this.setState({ viewState });
    }

    setNeighborhood(neighborhoodId: number) {
        const { neighborhoods } = this.props;
        const ng = neighborhoods && neighborhoods[neighborhoodId];

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
            transitionInterpolator: new FlyToInterpolator(),
            onTransitionStart: () => this.setState({ showAllGeoJsons: false }),
            onTransitionEnd: () => this.setState({ selectedNgId: neighborhoodId }),
        };

        this.setState({
            viewState: newViewState,
            tooltipInfo: null,
            hoveredNgId: null,
        });
    };

    closePannelHandler() {
        this.setState({
            selectedNgId: null,
            hoveredNgId: null,
            viewState: { ...initialViewState, onTransitionEnd: () => this.setState({ showAllGeoJsons: true }) }
        });
    };

    render() {
        const { tooltipInfo, selectedNgId } = this.state;
        const { neighborhoods, allReports, locations } = this.props;

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
                {tooltipInfo && <NeighTooltip {...tooltipInfo} />}
                {selectedNgId && allReports && locations && <Pannel clickHandler={this.closePannelHandler} data={allReports[selectedNgId]} total={locations[selectedNgId].length} />}
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state: IApplicationState) => {
    return {
        locations: state.locations.list,
        neighborhoods: state.neighborhoods.detailedList,
        allReports: state.neighborhoods.allReports,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchLocations: (): Promise<IListingLocation[]> => dispatch(fetchLocations()),
    fetchNeighborhoodsDetailed: (): Promise<INeighborhoodDetailed[]> => dispatch(fetchNeighborhoodsDetailed()),
    fetchAllReports: (): Promise<INeighborhoodReport[]> => dispatch(fetchAllReports()),
});

export default connect<DashBoardSceneStateProps, DashBardSceneActionsProps>(mapStateToProps, mapDispatchToProps)(DashBoardScene);