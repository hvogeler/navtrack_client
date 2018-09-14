import {observer} from "mobx-react";
import * as React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {TrackDo} from "../dataObjects/TrackDo";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackCreateDetail} from "./TrackCreateDetail";
import {TrackCreateMap} from "./TrackCreateMap";
import {TrackPointList} from "./TrackPointList";
import {TrackPtDo} from "./TrackPtDo";
import {IMapCenter} from "./TracksCreateMain";

export interface ITrackCreateProps {
    trackData: TrackDo;
    trackPts: TrackPtDo[];
    additionalTrackInfo: AdditionalTrackInfo;
    changeTrack: (track: TrackDo) => void;
    mapCenter: IMapCenter;
    setMapCenter: (mapCenter: IMapCenter) => void;
    addTrackPt: (trackPt: TrackPtDo) => void;
    deleteTrackPt: (idx: number) => void;
    trackLengthInKm: number;
    countries: string[];
    tracktypes: string[];
}

@observer
export class TrackCreateController extends React.Component<ITrackCreateProps, any> {
    constructor(props: ITrackCreateProps) {
        super(props)
    }

    public render() {
        return (
            <div>
                <div className="container-fluid">
                    <div>
                        <TrackCreateDetail
                            trackData={this.props.trackData}
                            trackPts={this.props.trackPts}
                            additionalTrackInfo={this.props.additionalTrackInfo}
                            changeTrack={this.props.changeTrack}
                            mapCenter={this.props.mapCenter}
                            setMapCenter={this.props.setMapCenter}
                            addTrackPt={this.props.addTrackPt}
                            deleteTrackPt={this.props.deleteTrackPt}
                            trackLengthInKm={this.props.trackLengthInKm}
                            countries={this.props.countries}
                            tracktypes={this.props.tracktypes}
                        />
                    </div>
                </div>
                <div className="contrainer-fluid">
                    <div className="row no-gutters">
                        <div className="col-md-10">
                            <TrackCreateMap
                                mapCenter={this.props.mapCenter}
                                zoom={13}
                                addTrackPt={this.props.addTrackPt}
                                trackPts={this.props.trackPts}
                                trackLengthInKm={this.props.trackLengthInKm}
                            />
                        </div>
                        <div className="col-md-2">
                            <TrackPointList trackPts={this.props.trackPts}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

