import DeckGL, { IconLayer, GeoJsonLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap, ViewState, FlyToInterpolator, TransitionInterpolator } from 'react-map-gl';
import { connect } from 'react-redux';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { INeighborhoodDetailed, INeighborhoodReport, INeighborhood } from 'src/models/neighborhoods/neighborhood';
import { fetchLocations, fetchListingDetailed } from 'src/redux/actions/listingsActions';
import { fetchNeighborhoodsDetailed, fetchAllReports } from 'src/redux/actions/neighborhoodsActions';
import { IApplicationState } from 'src/redux/store';
import './DashboardScene.css';
import mapMarker from './utils/map_marker.png';
import * as _ from 'lodash';
import NeighTooltip, { INeighTooltipProps } from './components/NeighTooltip';
import NgReportsPanel from './components/NgReportsPanel';
import Layout from 'src/Layout';
import { IListingDetailed } from 'src/models/listings/Listing';
import ListingInfoPanel from './components/ListingInfoPanel';
import { PlaceRounded } from '@material-ui/icons';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

interface IViewState extends ViewState {
    transitionDuration?: number;
    transitionInterpolator?: TransitionInterpolator;
    onTransitionStart?: () => void;
    onTransitionEnd?: () => void;
}

interface DashBoardSceneStateProps {
    selectedListing: IListingDetailed | null
    locations: _.Dictionary<IListingLocation[]> | null;
    neighborhoods: _.Dictionary<INeighborhoodDetailed> | null;
    allReports: _.Dictionary<INeighborhoodReport> | null;
}

interface DashBardSceneActionsProps {
    fetchNeighborhoodsDetailed: () => Promise<INeighborhoodDetailed[]>;
    fetchLocations: () => Promise<IListingLocation[]>;
    fetchAllReports: () => Promise<INeighborhoodReport[]>;
    fetchListingDetailed: (id: number | null) => Promise<IListingDetailed> | void;
}

interface DashBoardSceneState {
    viewState: IViewState,
    selectedNgId: number | null,
    hoveredNgId: number | null,
    tooltipInfo: INeighTooltipProps | null,
    placeMarkerInfo: IPlaceMarkerProps | null,
    showAllGeoJsons: boolean,
    cursor: string
}

interface IPlaceMarkerProps {
    x: number,
    y: number
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
            placeMarkerInfo: null,
            showAllGeoJsons: true,
            cursor: 'grab',
        }
    }

    componentDidMount() {
        !this.props.locations && this.props.fetchLocations();
        !this.props.neighborhoods && this.props.fetchNeighborhoodsDetailed();
        !this.props.allReports && this.props.fetchAllReports();
    }

    getLayers = () => {
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
            onClick: this.listingClickHandler,
            onHover: this.listingHoverHandler,
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
            onHover: this.ngHoverHandler,
            onClick: this.ngClickHandler,
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
            getLineColor: [7, 0, 255],
            getLineWidth: 30,
        });

        return [iconLayer, selectedNgLayer, geoJsonAllLayer, hoveredNgLayer];
    }

    ngHoverHandler = (feature: any) => {
        const { locations } = this.props;

        if (feature.object) {
            const ngName = feature.object.properties.neighbourhood;
            const ngId = feature.object.properties.id;
            const listCount = locations ? locations[ngId].length : 0;
            const { x, y } = feature;
            const tooltipProps: INeighTooltipProps = { ngName, listCount, x, y };

            this.setState({ hoveredNgId: feature.object.properties.id, tooltipInfo: tooltipProps });
        } else {
            this.setState({ hoveredNgId: null, tooltipInfo: null });
        }
    };

    ngClickHandler = (feature: any) => {
        if (feature.object) {
            const ngId = feature.object.properties.id;
            this.setNeighborhood(ngId);
        }
    };

    listingHoverHandler = (pickingInfo: { x: number, y: number, picked: boolean }, event: any) => {
        if (pickingInfo.picked) {
            const x = pickingInfo.x - 12;
            const y = pickingInfo.y - 29;
            this.setState({ placeMarkerInfo: { x, y }, cursor: 'pointer' });
        } else {
            this.setState({ placeMarkerInfo: null, cursor: 'grab' });
        }
    };

    listingClickHandler = (pickingInfo: any) => {
        const id = pickingInfo && pickingInfo.object && pickingInfo.object.id;
        this.props.fetchListingDetailed(id);
    }

    onViewStateChange = ({ viewState }: any) => {
        this.setState({ viewState });
    }

    setNeighborhood = (neighborhoodId: number) => {
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

    closeReportsPanelHandler = () => {
        this.setState({
            selectedNgId: null,
            hoveredNgId: null,
            viewState: { ...initialViewState, onTransitionEnd: () => this.setState({ showAllGeoJsons: true }) }
        });
    };

    closeListingPanelHandler = () => {
        this.props.fetchListingDetailed(null);
    };

    getSelectedNeighborhood = () => {
        const { neighborhoods } = this.props;
        const { selectedNgId } = this.state;
        return (selectedNgId && neighborhoods) ? neighborhoods[selectedNgId] : null;
    }

    getNgReports = (neigh: INeighborhood | null) => {
        const { allReports } = this.props;
        return (neigh && allReports) ? allReports[neigh.id] : null;
    }

    getNgListingsCount = (neigh: INeighborhood | null) => {
        const { locations } = this.props;
        return (neigh && locations) ? locations[neigh.id].length : 0;
    }

    render() {
        const { tooltipInfo, placeMarkerInfo, cursor } = this.state;
        const { neighborhoods, locations, selectedListing } = this.props;

        const neigh = this.getSelectedNeighborhood();
        const ngReport = this.getNgReports(neigh);
        const listingsCount = this.getNgListingsCount(neigh);

        return (
            <Layout>
                {neighborhoods && locations && <DeckGL
                    viewState={this.state.viewState}
                    layers={this.getLayers()}
                    controller={true}
                    onViewStateChange={this.onViewStateChange}
                    getCursor={() => cursor}
                    useDevicePixels={false}>
                    <StaticMap mapStyle="mapbox://styles/mapbox/dark-v9" width="100%" height="100%" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                </DeckGL>}
                {tooltipInfo && <NeighTooltip {...tooltipInfo} />}
                {placeMarkerInfo && <div style={{ position: 'absolute', top: placeMarkerInfo.y, left: placeMarkerInfo.x, zIndex: 99999, color: '#f9a9b4' }}><PlaceRounded color="inherit" /></div>}
                {selectedListing && <ListingInfoPanel listing={selectedListing} onClose={this.closeListingPanelHandler} />}
                {ngReport && !selectedListing && <NgReportsPanel listingsCount={listingsCount} ng={ngReport} onClose={this.closeReportsPanelHandler} />}
            </Layout>
        );
    }
};

const mapStateToProps = (state: IApplicationState) => {
    return {
        locations: state.listings.locations,
        neighborhoods: state.neighborhoods.detailedList,
        allReports: state.neighborhoods.allReports,
        selectedListing: state.listings.item,
    }
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchLocations: (): Promise<IListingLocation[]> => dispatch(fetchLocations()),
    fetchNeighborhoodsDetailed: (): Promise<INeighborhoodDetailed[]> => dispatch(fetchNeighborhoodsDetailed()),
    fetchAllReports: (): Promise<INeighborhoodReport[]> => dispatch(fetchAllReports()),
    fetchListingDetailed: (id: number | null) => dispatch(fetchListingDetailed(id)),
});

export default connect<DashBoardSceneStateProps, DashBardSceneActionsProps>(mapStateToProps, mapDispatchToProps)(DashBoardScene);