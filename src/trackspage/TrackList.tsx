import * as React from 'react';

export class TrackList extends React.Component {
    public render() {
        return (
            <div className="container-fluid">
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">TrackId</th>
                            <th scope="col">Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">Region</th>
                            <th scope="col">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr onClick={() => this.onClick(1)} onMouseEnter={() => this.onMouseEnter(1)}>
                            <th scope="row">1</th>
                            <td>Bayenthal_Jogging</td>
                            <td>Germany</td>
                            <td>Cologne</td>
                            <td>2018-03-14 09:24:00</td>
                        </tr>
                        <tr onClick={() => this.onClick(2)} onMouseEnter={() => this.onMouseEnter(2)}>
                            <th scope="row">2</th>
                            <td>Furggulti</td>
                            <td>Switzerland</td>
                            <td>Wallis</td>
                            <td>2018-03-14 09:24:00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    private onClick(trackid: number) {
        console.log(`Row ${trackid} clicked`)
    };

    private onMouseEnter(trackid: number) {
        console.log(`Row ${trackid} entered`)
    };


}

