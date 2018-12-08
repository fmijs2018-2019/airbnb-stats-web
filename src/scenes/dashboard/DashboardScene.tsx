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

interface DashBoardSceneProps extends IListingActionsProps {
    locations: IListingLocation[];
}

class DashBoardScene extends React.Component<DashBoardSceneProps> {
    constructor(props: Readonly<DashBoardSceneProps>) {
        super(props);

        this.getColor = this.getColor.bind(this);
    }

    componentDidMount() {
        this.props.fetchLocations();
    }

    getColor(location: IListingLocation): number[] {
        if (location.roomType === 'Private room') return [255, 0, 0];
        if (location.roomType === 'Entire home/apt') return [0, 255, 0];
        if (location.roomType === 'Shared room') return [0, 0, 255];
        return [255, 255, 255];
    }

    render() {
        const { locations } = this.props;

        const layers = [
            new IconLayer({
                id: 'icon-layer-red',
                data: locations || [],
                iconAtlas: mapMarker,
                iconMapping: {
                    marker: {
                        "x": 0,
                        "y": 0,
                        "width": 305,
                        "height": 485,
                        "anchorY": 485,
                        "anchorX": 152,
                        "mask": true
                    }
                },
                sizeScale: 4,
                getPosition: (d: any) => [d.longitude, d.latitude],
                getIcon: () => 'marker',
                getSize: () => 6,
                getColor: this.getColor,
            })
        ];

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
                <div className="dashboard-pannel">Hello Amsterdam!</div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IApplicationState) => ({
    locations: state.listings.locations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    ...bindListingActions(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScene);