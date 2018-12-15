import DeckGL, { IconLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap } from 'react-map-gl';
import { connect } from 'react-redux';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { INeighborhood } from 'src/models/neighborhoods/neighborhood';
import { fetchLocations, setNeighborhoodFilter } from 'src/redux/actions/listingsActions';
import { fetchNeighborhoods } from 'src/redux/actions/neighborhoodsActions';
import { IApplicationState } from 'src/redux/store';
import './DashboardScene.css';
import mapMarker from './utils/map_marker.png';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

// Initial viewport settings
const initialViewState = {
    longitude: 4.899431,
    latitude: 52.365,
    zoom: 11,
    pitch: 0,
    bearing: 0
};

interface DashBoardSceneStateProps {
    locations: IListingLocation[] | null;
    neighborhoods: INeighborhood[] | null;
}

interface DashBardSceneActionsProps {
    fetchNeighborhoods: () => Promise<INeighborhood[]>;
    fetchLocations: () => Promise<IListingLocation[]>;
    setNeighborhoodFilter: (filter: number | null) => void;
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
        const iconLayer = location && new IconLayer({
            id: 'icon-layer-red',
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
        })

        return [
            iconLayer
        ];
    }

    setNeighborhood(neighborhood: string) {
        let neighborhoodFilter: number | null = null;
        if(neighborhood !== '') {
            neighborhoodFilter = +neighborhood;
        }
        this.props.setNeighborhoodFilter(neighborhoodFilter);
        this.props.fetchLocations();
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
                    {neighborhoods && <select onChange={e => this.setNeighborhood(e.target.value)}>
                        <option value="">Neighborhoods</option>
                        {neighborhoods.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
                    </select>}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    locations: state.locations.list,
    neighborhoods: state.neighborhoods.list,
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchLocations: (): Promise<IListingLocation[]> => dispatch(fetchLocations()),
    fetchNeighborhoods: (): Promise<INeighborhood[]> => dispatch(fetchNeighborhoods()), 
    setNeighborhoodFilter: (filter: number | null): void => dispatch(setNeighborhoodFilter(filter)),
});

export default connect<DashBoardSceneStateProps, DashBardSceneActionsProps>(mapStateToProps, mapDispatchToProps)(DashBoardScene);