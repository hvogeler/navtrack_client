import {observer} from "mobx-react";
import * as React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackCreateDetail} from "./TrackCreateDetail";
import {TrackCreateMap} from "./TrackCreateMap";
import {TrackDo} from "./TrackDo";
import {TrackPtDo} from "./TrackPtDo";
import {IMapCenter} from "./TracksCreateMain";

export interface ITrackCreateProps {
    trackData: TrackDo;
    trackPts: TrackPtDo[];
    additionalTrackInfo: AdditionalTrackInfo;
    changeTrack: (track: TrackDo) => void;
    mapCenter: IMapCenter;
    setMapCenter: (mapCenter: IMapCenter) => void;
}

@observer
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
                    changeTrack={this.props.changeTrack}
                    mapCenter={this.props.mapCenter}
                    setMapCenter={this.props.setMapCenter}
                    />
                </div>
                <div>
                    <TrackCreateMap mapCenter={this.props.mapCenter} zoom={13}/>
                </div>
            </div>
        )
    }
}

