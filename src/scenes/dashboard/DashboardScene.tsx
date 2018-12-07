import axios from 'axios';
import DeckGL, { IconLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap } from 'react-map-gl';
import './DashboardScene.css';
import mapMarker from './utils/map_marker.png';

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

// const locations = [
//     { "latitude": 52.34922738, "longitude": 4.861726985 },
//     { "latitude": 52.35269364, "longitude": 4.901360933 },
//     { "latitude": 52.36848062, "longitude": 4.921038854 }
// ]

const roomTypes = ['Private room', 'Entire home/apt', 'Shared room'];

const getColor = (location: any) => {
    if (location.roomType === 'Private room') return [255, 0, 0];
    if (location.roomType === 'Entire home/apt') return [0, 255, 0];
    if (location.roomType === 'Shared room') return [0, 0, 255];
    return [255, 255, 255];
}

interface DashBoardSceneState {
    locations: [];
}

export default class DashBoardScene extends React.Component<{}, DashBoardSceneState> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { locations: [] };
    }

    render() {
        const layers = [
            new IconLayer({
                id: 'icon-layer-red',
                data: this.state.locations,
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
                getColor,
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
                <div className="dashboard-pannel">asdfjlaksdjflkjsdlkfjl
                <button onClick={() => {
                        axios.get("http://localhost:8080/listings/locations")
                            .then((locations) => {
                                this.setState({ locations: locations.data });
                            })
                    }}>Load</button>
                </div>
            </React.Fragment>
        );
    }
}