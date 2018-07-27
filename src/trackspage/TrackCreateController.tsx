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
    addTrackPt: (trackPt: TrackPtDo) => void;
    deleteTrackPt: (idx: number) => void;
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
                        />
                    </div>
                </div>
                <div className="contrainer-fluid">
                    <div className="row">
                        <div className="col-md-9">
                            <TrackCreateMap
                                mapCenter={this.props.mapCenter}
                                zoom={13}
                                addTrackPt={this.props.addTrackPt}
                            />
                        </div>
                        <div className="col-md-3">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Trackpoints {this.props.trackPts.length}
                                </div>
                                <div className="table-wrapper-scroll-y">
                                    <table id="TrackPointsList" className="table table-hover">
                                        <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Lat</th>
                                            <th scope="col">Lon</th>
                                            <th scope="col">Alt</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.trackPts.reverse().map((it, idx) =>
                                            <tr id={idx.toString()} key={idx}>
                                                <td>{this.props.trackPts.length - idx}</td>
                                                <td>{it.lat.toFixed(4)}</td>
                                                <td>{it.lng.toFixed(4)}</td>
                                                <td>{it.ele.toFixed(0)}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

