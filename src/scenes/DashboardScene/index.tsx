import * as axios from 'axios';
import DeckGL, { Layer, LineLayer } from 'deck.gl';
import * as React from 'react';
import { StaticMap } from 'react-map-gl';
import './index.css';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZGFuaWVsYXBvc3QiLCJhIjoiY2puZGlpZWNnMDJlbTNxbjdxMGxzMTQ0diJ9.kyabw1ItkRkzxK-UqTqi9g';

// Initial viewport settings
const initialViewState = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

// Data to be used by the LineLayer
const data = [{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }];

export default class DashBoardScene extends React.Component<{}> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = { locations: [] };
    }

    render() {
        const layers = [
            new LineLayer({ id: 'line-layer', data }),
        ];

        return (
            <main>
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
                {/* <button onClick={() => {
                        axios.default.get("http://localhost:8080/listings/locations")
                            .then((locations) => {
                                console.log(locations[0].latitude);
                                this.setState({ locations });
                            })
                    }}>Load</button> */}
                </div>
            </main>
        );
    }
}