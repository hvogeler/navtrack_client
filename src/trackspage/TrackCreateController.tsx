import {observer} from "mobx-react";
import * as React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {CountryTo} from "../transport/CountryTo";
import {TrackTo} from "../transport/TrackTo";
import {TrackTypeTo} from "../transport/TrackTypeTo";
import {AdditionalTrackInfo} from "./AdditionalTrackInfo";
import {TrackCreateDetail} from "./TrackCreateDetail";
import {EditOrCreate, IMapCenter} from "./TrackCreateMain";
import {InsertMode} from "./TrackCreateMain";
import {TrackCreateMap} from "./TrackCreateMap";
import {TrackPointList} from "./TrackPointList";
import {TrackPtDo} from "./TrackPtDo";

export interface ITrackCreateProps {
    trackData: TrackTo;
    trackPts: TrackPtDo[];
    additionalTrackInfo: AdditionalTrackInfo;
    changeTrack: (track: TrackTo) => void;
    mapCenter: IMapCenter;
    setMapCenter: (mapCenter: IMapCenter) => void;
    addTrackPt: (trackPt: TrackPtDo) => void;
    deleteTrackPt: (idx: number) => void;
    saveTrack: () => string;
    trackLengthInKm: number;
    countries: CountryTo[];
    tracktypes: TrackTypeTo[];
    errorMsg: string | null;
    mode: EditOrCreate;
    selectedTrackPtIdx: number;
    setSelectedTrackPt: (idx: number) => void;
    insertMode: InsertMode | null;
    setInsertMode: (position: InsertMode | null) => void;
    readGpxFile: (file: File) => void;
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
                            saveTrack={this.props.saveTrack}
                            errorMsg={this.props.errorMsg}
                            mode={this.props.mode}
                            setSelectedTrackPt={this.props.setSelectedTrackPt}
                            selectedTrackPtIdx={this.props.selectedTrackPtIdx}
                            insertMode={this.props.insertMode}
                            setInsertMode={this.props.setInsertMode}
                            readGpxFile={this.props.readGpxFile}
                        />
                    </div>
                </div>
                <div className="contrainer-fluid no-gutters pl-1 pt-1">
                    <div className="row no-gutters col-12">
                        <div className="col-md-9">
                            <TrackCreateMap
                                mapCenter={this.props.mapCenter}
                                addTrackPt={this.props.addTrackPt}
                                trackPts={this.props.trackPts}
                                trackLengthInKm={this.props.trackLengthInKm}
                                setSelectedTrackPt={this.props.setSelectedTrackPt}
                                selectedTrackPtIdx={this.props.selectedTrackPtIdx}
                            />
                        </div>
                        <div className="col-md-3 border border-light pl-1">
                            <TrackPointList trackPts={this.props.trackPts}
                                            setSelectedTrackPt={this.props.setSelectedTrackPt}
                                            selectedTrackPtIdx={this.props.selectedTrackPtIdx}
                                            deleteTrackPt={this.props.deleteTrackPt}
                                            insertMode={this.props.insertMode}
                                            setInsertMode={this.props.setInsertMode}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

