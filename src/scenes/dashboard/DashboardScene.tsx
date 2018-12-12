import DeckGL, { IconLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap } from 'react-map-gl';
import { IListingLocation } from 'src/models/listings/ListingLocation';
import { IListingActionsProps, bindListingActions } from 'src/redux/actions/listingsActions';
import './DashboardScene.css';
import mapMarker from './utils/map_marker.png';
import { IApplicationState } from 'src/redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { INeighborhood } from 'src/models/neighborhoods/neighborhood';
import { INeighborhoodsActionsProps, bindNeighborhoodsActions } from 'src/redux/actions/neighborhoodsActions';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

// Initial viewport settings
const initialViewState = {
    longitude: 4.899431,
    latitude: 52.379189,
    zoom: 11,
    pitch: 0,
    bearing: 0
};

interface DashBoardSceneProps extends IListingActionsProps, INeighborhoodsActionsProps {
    locations: IListingLocation[];
    neighborhoods: INeighborhood[];
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
        if (location.roomType === 'Private room') return [247, 19, 72];
        if (location.roomType === 'Entire home/apt') return [127, 239, 217];
        if (location.roomType === 'Shared room') return [0, 107, 247];
        return [255, 255, 255];
    }

    getLayers(): any[] {
        const { locations } = this.props;
        return [
            new IconLayer({
                id: 'icon-layer-red',
                pickable: true,
                data: locations && locations.sort((a, b) => {
                    return a.roomType.localeCompare(b.roomType);
                }) || [],
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
                getSize: () => 10,
                // opacity: 5,
                getColor: this.getColor,
            })
        ];
    }

    setNeighborhood(neighborhood: string) {
        this.props.setNeighborhoodFilter(neighborhood);
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
                        <StaticMap width="100%" height="100%" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
                    </DeckGL>
                </div>
                <div className="dashboard-pannel">Hello Amsterdam!
                    {neighborhoods && <select onChange={e => this.setNeighborhood(e.target.value)}>
                        <option value="">All</option>
                        {neighborhoods.map(n => <option key={n.id } value={n.name}>{n.name}</option>)}
                    </select>}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    locations: state.locations.list,
    neighborhoods: state.neighborhoods.list
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindListingActions(dispatch),
    ...bindNeighborhoodsActions(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScene);