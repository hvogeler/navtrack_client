import * as React from 'react';


interface ITrackListProps {
    trackList: TrackDo[];
    currentTrackListId: number;
    setCurrentTrackListId: (id: number) => void;
}

export class TrackList extends React.Component<ITrackListProps, any> {
    constructor(props: ITrackListProps) {
        super(props)
    }

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
                    {this.props.trackList.map(it =>
                        <tr key={it.id}
                            id="{it.id}"
                            className={this.props.currentTrackListId === it.id ? "bg-info text-white" : "bg-white text-dark"}
                            onClick={() => this.onClick(it.id)}
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
        this.props.setCurrentTrackListId(trackid)
    };

    private onMouseEnter(trackid: number) {
        console.log(`Row ${trackid} entered`)
    };


}

