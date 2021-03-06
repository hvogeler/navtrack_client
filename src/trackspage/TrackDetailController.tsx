import * as React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {TrackTo} from "../transport/TrackTo";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackDetail} from "./TrackDetail";
import {TrackMap} from "./TrackMap";
import {TrackPtDo} from "./TrackPtDo";

export interface ITrackDetailProps {
    trackData: TrackTo;
    trackPts: TrackPtDo[];
    additionalTrackInfo: AdditionalTrackInfo;
}

export class TrackDetailController extends React.Component<ITrackDetailProps, any> {
    constructor(props: ITrackDetailProps) {
        super(props)
    }

    public render() {
        return (
            <div className="row no-gutters">
                <div className="pl-3 col-md-8">
                    <TrackMap trackData={this.props.trackData} trackPts={this.props.trackPts}
                              additionalTrackInfo={this.props.additionalTrackInfo}/>
                </div>
                <div className="pl-1 col-md-4">
                    <TrackDetail trackData={this.props.trackData} trackPts={this.props.trackPts}
                                 additionalTrackInfo={this.props.additionalTrackInfo}/>
                </div>
            </div>
        )
    }
}

