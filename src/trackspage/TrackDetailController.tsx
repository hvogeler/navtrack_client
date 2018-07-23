import * as React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {TrackDetail} from "./TrackDetail";
import {TrackDo} from "./TrackDo";
import {TrackMap} from "./TrackMap";
import {TrackPtDo} from "./TrackPtDo";

export interface ITrackDetailProps {
    trackData: TrackDo;
    trackPts: TrackPtDo[];
}

export class TrackDetailController extends React.Component<ITrackDetailProps, any> {
    constructor(props: ITrackDetailProps) {
        super(props)
    }

    public render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <TrackMap trackData={this.props.trackData} trackPts={this.props.trackPts}/>
                    </div>
                    <div className="col-4">
                        <TrackDetail trackData={this.props.trackData} trackPts={this.props.trackPts}/>
                    </div>
                </div>
            </div>
        )
    }
}

