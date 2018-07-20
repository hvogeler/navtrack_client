import * as React from 'react';

export class TrackDetail extends React.Component {

    public render() {
        return (
            <div className="border border-light rounded bg-info text-white">
                <table className="table table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Property</th>
                        <th scope="col">Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row" className="text-right">Trackname</th>
                        <td className="text-left">Bayenthal_Jogging</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Length</th>
                        <td className="text-left">7.91 km</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">country</th>
                        <td className="text-left">Germany</td>
                    </tr>
                    <tr>
                        <th scope="row" className="text-right">Region</th>
                        <td className="text-left">Cologne</td>
                    </tr>
                    </tbody>
                </table>

            </div>

        );
    }
}
