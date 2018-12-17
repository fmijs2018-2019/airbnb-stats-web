import DeckGL, { IconLayer, GeoJsonLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap } from 'react-map-gl';
import { connect } from 'react-redux';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { INeighborhood } from 'src/models/neighborhoods/neighborhood';
import { fetchLocations, setNeighborhoodFilter } from 'src/redux/actions/listingsActions';
import { fetchNeighborhoods, fetchNeighborhoodItem } from 'src/redux/actions/neighborhoodsActions';
import { IApplicationState } from 'src/redux/store';
import './DashboardScene.css';
import mapMarker from './utils/map_marker.png';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

interface IViewState {
    longitude: number,
    latitude: number,
    zoom: number,
}

// Initial viewport settings
const initialViewState: IViewState = {
    longitude: 4.899431,
    latitude: 52.365,
    zoom: 11,
};

interface DashBoardSceneStateProps {
    locations: IListingLocation[] | null;
    neighborhoods: INeighborhood[] | null;
    item: INeighborhood | null;
}

interface DashBardSceneActionsProps {
    fetchNeighborhoods: () => Promise<INeighborhood[]>;
    fetchLocations: () => Promise<IListingLocation[]>;
    setNeighborhoodFilter: (filter: number | null) => void;
    fetchItem: () => Promise<INeighborhood>;
}

interface DashBoardSceneProps extends DashBoardSceneStateProps, DashBardSceneActionsProps {
}

class DashBoardScene extends React.Component<DashBoardSceneProps> {
    constructor(props: Readonly<DashBoardSceneProps>) {
        super(props);

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
        const geoJson = this.props.item && this.props.item.geoJson;
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
            stroked: false,
            filled: true,
            extruded: true,
            lineWidthScale: 20,
            lineWidthMinPixels: 2,
            getFillColor: [160, 160, 180, 200],
            //getLineColor: d => colorToRGBArray(d.properties.color),
            getRadius: 100,
            getLineWidth: 1,
            getElevation: 30,
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

    setNeighborhood(neighborhood: string) {
        let neighborhoodFilter: number | null = null;
        if (neighborhood !== '') {
            neighborhoodFilter = +neighborhood;
        }

        this.props.setNeighborhoodFilter(neighborhoodFilter);
        this.props.fetchLocations();
        this.props.fetchItem();
    }

    render() {
        const { neighborhoods } = this.props;

        const layers = this.getLayers();

        return (
            <React.Fragment>
                <div className="dashboard">
                    <DeckGL
                        initialViewState={initialViewState}
                        controller={true}
                        layers={layers}
                    >
                        <StaticMap preventStyleDiffing width="100%" height="100%" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                    </DeckGL>
                </div>
                <div className="dashboard-pannel">Hello Amsterdam!
                    {neighborhoods && <Select onChange={e => this.setNeighborhood(e.target.value)}>
                        <MenuItem value="">Neighborhoods</MenuItem>
                        {neighborhoods.map(n => <MenuItem key={n.id} value={n.id}>{n.name}</MenuItem>)}
                    </Select>}
                    {/* {neighborhoods && <select onChange={e => this.setNeighborhood(e.target.value)}>
                        <option value="">Neighborhoods</option>
                        {neighborhoods.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                    </select>} */}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    locations: state.locations.list,
    neighborhoods: state.neighborhoods.list,
    item: state.neighborhoods.item,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchLocations: (): Promise<IListingLocation[]> => dispatch(fetchLocations()),
    fetchNeighborhoods: (): Promise<INeighborhood[]> => dispatch(fetchNeighborhoods()),
    setNeighborhoodFilter: (filter: number | null): void => dispatch(setNeighborhoodFilter(filter)),
    fetchItem: (): Promise<INeighborhood> => dispatch(fetchNeighborhoodItem()),
});

export default connect<DashBoardSceneStateProps, DashBardSceneActionsProps>(mapStateToProps, mapDispatchToProps)(DashBoardScene);