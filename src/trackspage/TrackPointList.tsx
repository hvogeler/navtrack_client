import {observer} from "mobx-react";
import * as React from 'react';
import {globalRootStore} from "../App";
import {InsertMode, InsertPosition} from "./TrackCreateMain";
import {TrackPtDo} from "./TrackPtDo";


interface ITrackPointListProps {
    trackPts: TrackPtDo[];
    selectedTrackPtIdx: number;
    setSelectedTrackPt: (idx: number) => void;
    deleteTrackPt: (idx: number) => void;
    insertMode: InsertMode | null;
    setInsertMode: (mode: InsertMode | null) => void;
}

@observer
export class TrackPointList extends React.Component<ITrackPointListProps, any> {

    constructor(props: ITrackPointListProps) {
        super(props)
        this.insertItem = this.insertItem.bind(this);
    }

    public render() {
        return (
            <div className="table-wrapper-scroll-y">
                <table id="TrackPointsList" className="table table-hover">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Lat</th>
                        <th scope="col">Lon</th>
                        <th scope="col">Alt</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.trackPts.map((it, idx) =>
                        <tr id={idx.toString()}
                            key={idx}
                            className={this.props.selectedTrackPtIdx === idx ? "bg-info text-white" : "bg-white text-dark"}
                            onClick={() => {
                                this.props.setSelectedTrackPt(idx);
                                console.log(this.props.insertMode)
                            }}
                        >
                            <td>{it.lat.toFixed(4)}</td>
                            <td>{it.lng.toFixed(4)}</td>
                            <td>{it.ele.toFixed(0)}</td>
                            {globalRootStore.uiStore.isLoggedIn ?
                                <td>
                                    <i className="material-icons md-grey hand-pointer" data-md-tooltip="Insert Before" onClick={() => this.insertItem({
                                        "idx": idx,
                                        "position": InsertPosition.before
                                    })}>skip_next</i>
                                    <i className="material-icons md-grey hand-pointer" data-md-tooltip="Delete" onClick={() => this.deleteItem(idx)}>delete</i>
                                    <i className="material-icons md-grey hand-pointer" data-md-tooltip="Insert After" onClick={() => this.insertItem({
                                        "idx": idx,
                                        "position": InsertPosition.after
                                    })}>skip_previous</i>
                                </td> : <td/>
                            }

                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }

    private deleteItem(idx: number) {
        console.log(`delete ${idx}`);
        this.props.deleteTrackPt(idx);
    }

    private insertItem(mode: InsertMode) {
        console.log(`Insert Trackpoint ${mode.position} ${mode.idx}`);
        this.props.setInsertMode(mode);
    }
}

