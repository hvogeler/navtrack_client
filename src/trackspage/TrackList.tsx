import * as React from 'react';

interface ITrackData {
    id: number;
    name: string;
    country: string;
    region: string;
    created: string;
}

export class TrackList extends React.Component {
    private trackListData: ITrackData[] = [
        {
            country: "Germany",
            created: "2018-03-14 09:24:00",
            id: 1,
            name: "Bayenthal_Jogging",
            region: "Cologne"
        },
        {
            country: "Switzerland",
            created: "2018-03-14 09:24:00",
            id: 2,
            name: "Furggulti",
            region: "Wallis"
        }];

    public render() {
        return (
            <div className="container-fluid border border-light rounded">
                <table id="TrackList" className="table table-hover">
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
                    {this.trackListData.map(it =>
                        <tr key="{it.id}" id="{it.id}" onClick={() => this.onClick(it.id)}
                            onMouseEnter={() => this.onMouseEnter(it.id)}>
                            <th scope="row">{it.id}</th>
                            <td>{it.name}</td>
                            <td>{it.country}</td>
                            <td>{it.region}</td>
                            <td>{it.created}</td>
                        </tr>
                    )}
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

