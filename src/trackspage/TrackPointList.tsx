import {observer} from "mobx-react";
import * as React from 'react';
import {TrackPtDo} from "./TrackPtDo";


interface ITrackPointListProps {
    trackPts: TrackPtDo[];
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
        )
    }
}

