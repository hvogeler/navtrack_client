import * as React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackCreateDetail} from "./TrackCreateDetail";
import {TrackCreateMap} from "./TrackCreateMap";
import {TrackDo} from "./TrackDo";
import {TrackPtDo} from "./TrackPtDo";

export interface ITrackDetailProps {
    trackData: TrackDo;
    trackPts: TrackPtDo[];
    additionalTrackInfo: AdditionalTrackInfo;
}

export class TrackCreateController extends React.Component<ITrackDetailProps, any> {
    constructor(props: ITrackDetailProps) {
        super(props)
    }

    public render() {
        return (
            <div className="container-fluid">
                <div>
                    <TrackCreateDetail/>
                </div>
                <div>
                    <TrackCreateMap/>
                </div>
            </div>
        )
    }
}

