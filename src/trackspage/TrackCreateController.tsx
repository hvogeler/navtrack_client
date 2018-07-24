import * as React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackCreateDetail} from "./TrackCreateDetail";
import {TrackCreateMap} from "./TrackCreateMap";
import {TrackDo} from "./TrackDo";
import {TrackPtDo} from "./TrackPtDo";

export interface ITrackCreateProps {
    trackData: TrackDo;
    trackPts: TrackPtDo[];
    additionalTrackInfo: AdditionalTrackInfo;
    changeTrack: (track: TrackDo) => void;
}

export class TrackCreateController extends React.Component<ITrackCreateProps, any> {
    constructor(props: ITrackCreateProps) {
        super(props)
    }

    public render() {
        return (
            <div className="container-fluid">
                <div>
                    <TrackCreateDetail trackData={this.props.trackData}
                    trackPts={this.props.trackPts}
                    additionalTrackInfo={this.props.additionalTrackInfo}
                    changeTrack={this.props.changeTrack}/>
                </div>
                <div>
                    <TrackCreateMap/>
                </div>
            </div>
        )
    }
}

