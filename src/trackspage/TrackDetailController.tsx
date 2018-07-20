import * as React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {TrackDetail} from "./TrackDetail";
import {TrackMap} from "./TrackMap";

export class TrackDetailController extends React.Component {

    public render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <TrackMap/>
                    </div>
                    <div className="col-4">
                        <TrackDetail/>
                    </div>
                </div>
            </div>
        )
    }
}

