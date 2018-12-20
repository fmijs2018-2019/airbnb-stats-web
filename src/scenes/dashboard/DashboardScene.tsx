import DeckGL, { IconLayer, GeoJsonLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap, ViewState, FlyToInterpolator, MapController, TransitionInterpolator } from 'react-map-gl';
import { connect } from 'react-redux';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { INeighborhood, INeighborhoodDetailed } from 'src/models/neighborhoods/neighborhood';
import { fetchLocations, setNeighborhoodFilter } from 'src/redux/actions/listingsActions';
import { fetchNeighborhoods, fetchNeighborhoodItem } from 'src/redux/actions/neighborhoodsActions';
import { IApplicationState } from 'src/redux/store';
import './DashboardScene.css';
import mapMarker from './utils/map_marker.png';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

interface IViewState extends ViewState {
    transitionDuration: number,
    transitionInterpolator: TransitionInterpolator
}

interface DashBoardSceneStateProps {
    locations: IListingLocation[] | null;
    neighborhoods: INeighborhood[] | null;
    neighborhoodItem: INeighborhoodDetailed | null;
}

interface DashBardSceneActionsProps {
    fetchNeighborhoods: () => Promise<INeighborhood[]>;
    fetchLocations: () => Promise<IListingLocation[]>;
    setNeighborhoodFilter: (filter: number | null) => void;
    fetchNeighborhoodItem: () => Promise<INeighborhoodDetailed>;
}

interface DashBoardSceneState {
    viewState: IViewState
}

interface DashBoardSceneProps extends DashBoardSceneStateProps, DashBardSceneActionsProps {
}

class DashBoardScene extends React.Component<DashBoardSceneProps, DashBoardSceneState> {
    constructor(props: Readonly<DashBoardSceneProps>) {
        super(props);

        this.state = {
            viewState: {
                longitude: 4.899431,
                latitude: 52.365,
                zoom: 11,
                pitch: 0,
                bearing: 0,
                transitionDuration: 3000,
                transitionInterpolator: new FlyToInterpolator()
            }
        }

        this.onViewStateChange = this.onViewStateChange.bind(this);
        this.getColor = this.getColor.bind(this);
        this.setNeighborhood = this.setNeighborhood.bind(this);
    }

    componentDidMount() {
        this.props.fetchLocations();
        this.props.fetchNeighborhoods();
    }

    getColor(location: IListingLocation): number[] {
        if (location.roomTypeId === 1) return [247, 19, 72];
        if (location.roomTypeId === 2) return [127, 239, 217];
        if (location.roomTypeId === 3) return [0, 107, 247];
        return [255, 255, 255];
    }

    getLayers(): any[] {
        const { locations } = this.props;
        const geoJson = this.props.neighborhoodItem && this.props.neighborhoodItem.geoJson;
        const iconLayer = location && new IconLayer({
            id: 'icon-layer',
            pickable: true,
            data: locations,
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
            getColor: this.getColor,
        });

        const geoJsonLayer = new GeoJsonLayer({
            id: 'geojson-layer',
            data: geoJson,
            pickable: true,
            stroked: true,
            filled: true,
            extruded: false,
            // lineWidthScale: 20,
            lineWidthMinPixels: 2,
            getFillColor: [210, 210, 210, 100],
            lineJointRounded: true,
            getLineColor: [100, 100, 100, 200],
            fp64: true,
            // getRadius: 100,
            getLineWidth: 1,
            // getElevation: 30,
            // onHover: ({ object, x, y }) => {
            //     const tooltip = object.properties.name || object.properties.station;
            //     /* Update tooltip
            //        http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
            //     */
            // }
        });

        return [
            iconLayer,
            geoJsonLayer
        ];
    }

    onViewStateChange({ viewState }: { viewState: IViewState }) {
        this.setState({ viewState: { ...viewState } });
    }

    setNeighborhood(neighborhood: string) {
        let neighborhoodFilter: number | null = null;
        if (neighborhood !== '') {
            neighborhoodFilter = +neighborhood;
        }

        this.props.setNeighborhoodFilter(neighborhoodFilter);
        this.props.fetchLocations();
        this.props.fetchNeighborhoodItem()
            .then(item => {
                this.setState({
                    viewState: {
                        ...this.state.viewState,
                        zoom: 13,
                        longitude: item.centerLongitude,
                        latitude: item.centerLatitude,
                        transitionDuration: 3000,
                        transitionInterpolator: new FlyToInterpolator()
                    }
                });
                console.log('pesho');
                console.log(this.state.viewState);
            });
    }

    render() {
        const { neighborhoods } = this.props;

        const layers = this.getLayers();

        return (
            <React.Fragment>
                <div className="dashboard">
                    <DeckGL
                        viewState={this.state.viewState}
                        layers={layers}
                        controller={true}
                        onViewStateChange={this.onViewStateChange}
                    >
                        <StaticMap width="100%" height="100%" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                    </DeckGL>
                </div>
                <div className="dashboard-pannel">Hello Amsterdam!
                    {neighborhoods && <Select onChange={e => this.setNeighborhood(e.target.value)}>
                        <MenuItem value="">Neighborhoods</MenuItem>
                        {neighborhoods.map(n => <MenuItem key={n.id} value={n.id}>{n.name}</MenuItem>)}
                    </Select>}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    locations: state.locations.list,
    neighborhoods: state.neighborhoods.list,
    neighborhoodItem: state.neighborhoods.item,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchLocations: (): Promise<IListingLocation[]> => dispatch(fetchLocations()),
    fetchNeighborhoods: (): Promise<INeighborhood[]> => dispatch(fetchNeighborhoods()),
    setNeighborhoodFilter: (filter: number | null): void => dispatch(setNeighborhoodFilter(filter)),
    fetchNeighborhoodItem: (): Promise<INeighborhoodDetailed> => dispatch(fetchNeighborhoodItem()),
});

export default connect<DashBoardSceneStateProps, DashBardSceneActionsProps>(mapStateToProps, mapDispatchToProps)(DashBoardScene);