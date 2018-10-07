import * as React from 'react';
import {ITrackDetailProps} from "./TrackDetailController";

export class TrackDetail extends React.Component<ITrackDetailProps, any> {
    constructor(props: ITrackDetailProps) {
        super(props)
    }

    public render() {
        const tableRows = [
            {
                "label": "Trackname",
                "value": this.props.trackData.trackname
            },
            {
                "label": "Description",
                "value": this.props.trackData.description
            },
            {
                "label": "Country",
                "value": this.props.trackData.country
            },
            {
                "label": "Region",
                "value": this.props.trackData.region
            },
            {
                "label": "Owner",
                "value": this.props.trackData.owner!.username
            },
            {
                "label": "Length(Km)",
                "value": this.props.additionalTrackInfo.length.toFixed(2)
            },
            {
                "label": "TrackPoints",
                "value": this.props.additionalTrackInfo.trackPtCnt
            },
            {
                "label": "Types",
                "value": this.props.trackData.tracktypes.join(", ")
            },
            {
                "label": "Created",
                "value": this.props.trackData.created
            }
        ];

        return (
            <div id="detailList" className="border border-light rounded bg-info text-white pr-1">
                <table className="table">
                    <thead className="thead-light">
                    <tr className="d-flex">
                        <th scope="col" className="text-right col-4">Property</th>
                        <th scope="col" className="text-left col-8">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows.map((row, idx) => {
                        return (
                            <tr key={idx} className="d-flex">
                                <th scope="row" className="text-right col-4">{row.label}</th>
                                <td className="text-left col-8">{row.value}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

            </div>

        );
    }
}
