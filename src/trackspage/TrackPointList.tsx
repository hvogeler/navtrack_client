import {observer} from "mobx-react";
import * as React from 'react';
import {globalRootStore} from "../App";
import {TrackPtDo} from "./TrackPtDo";


interface ITrackPointListProps {
    trackPts: TrackPtDo[];
    selectedTrackPtIdx: number;
    setSelectedTrackPt: (idx: number) => void;
    deleteTrackPt: (idx: number) => void;
}

@observer
export class TrackPointList extends React.Component<ITrackPointListProps, any> {
    constructor(props: ITrackPointListProps) {
        super(props)
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
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.trackPts.map((it, idx) =>
                        <tr id={idx.toString()}
                            key={idx}
                            className={this.props.selectedTrackPtIdx === idx ? "bg-info text-white" : "bg-white text-dark"}
                            onClick={() => this.props.setSelectedTrackPt(idx)}
                        >
                            <td>{it.lat.toFixed(4)}</td>
                            <td>{it.lng.toFixed(4)}</td>
                            <td>{it.ele.toFixed(0)}</td>
                            {globalRootStore.uiStore.isLoggedIn ?
                                <td><i className="material-icons md-grey hand-pointer" onClick={() => this.deleteItem(idx)}>delete</i></td> : <td/>
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
}

