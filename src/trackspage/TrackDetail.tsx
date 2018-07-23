import * as React from 'react';
import {ITrackDetailProps} from "./TrackDetailController";

export class TrackDetail extends React.Component<ITrackDetailProps, any> {
    constructor(props: ITrackDetailProps) {
        super(props)
    }

    public render() {
        return (
            <div id="detailList" className="border border-light rounded bg-info text-white">
                <table className="table table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col" className="text-right">Property</th>
                        <th scope="col" className="text-left">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row" className="text-right">Trackname</th>
                        <td className="text-left">{this.props.trackData.trackname}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Description</th>
                        <td className="text-left">{this.props.trackData.description}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Country</th>
                        <td className="text-left">{this.props.trackData.country}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Region</th>
                        <td className="text-left">{this.props.trackData.region}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Owner</th>
                        <td className="text-left">{this.props.trackData.ownerid}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Length(Km)</th>
                        <td className="text-left">{this.props.additionalTrackInfo.length.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right"># TrackPoints</th>
                        <td className="text-left">{this.props.additionalTrackInfo.trackPtCnt}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Types</th>
                        <td className="text-left">{this.props.trackData.tracktypes.map((it) => it.tracktypename).join(", ")}</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Touched</th>
                        <td className="text-left">{this.props.trackData.created}</td>
                    </tr>
                    </tbody>
                </table>

            </div>

        );
    }
}
