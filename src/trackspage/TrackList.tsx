import {action} from "mobx";
import * as moment from "moment";
import * as React from 'react';
import {Link} from "react-router-dom";
import {globalRootStore} from "../App";
import {TrackTo} from "../transport/TrackTo";


interface ITrackListProps {
    trackList: TrackTo[];
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
                        <th scope="col" className="text-left">Name</th>
                        <th scope="col">Country</th>
                        <th scope="col">Region</th>
                        <th scope="col">Created</th>
                        <th scope="col">Owner</th>
                        {globalRootStore.uiStore.isLoggedIn ?
                        <th scope="col">Action</th> : <th/> }
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.trackList.map(it =>
                        <tr key={it.id}
                            id="{it.id}"
                            className={this.props.currentTrackListId === it.id ? "bg-info text-white" : "bg-white text-dark"}
                            onClick={() => this.onClick(it.id)}
                            onMouseEnter={() => this.onMouseEnter(it.id)}>
                            <td className="text-left">{it.trackname}</td>
                            <td>{it.country}</td>
                            <td>{it.region}</td>
                            <td>{moment(it.created).format("Y-MM-DD HH:mm")}</td>
                            <td>{it.owner!.username}</td>
                            {globalRootStore.uiStore.isLoggedIn && globalRootStore.uiStore.userDo!.id === it.owner!.id?
                                <td><Link to={`/edit/${it.id}`}> <i className="material-icons md-yellow hand-pointer" data-md-tooltip="Edit Track">edit </i></Link>
                            <i className="material-icons md-grey hand-pointer" onClick={() => this.deleteItem(it.id)} data-md-tooltip="Delete Track">delete</i></td> : <td/>}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

    @action
    private onClick(trackid: number) {
        console.log(`Row ${trackid} clicked`);
        this.props.setCurrentTrackListId(trackid)
    };

    // @action
    // private editItem(trackid: number) {
    //     console.log(`Edit Row ${trackid}`);
    // };

    @action
    private deleteItem(trackid: number) {
        console.log(`Delete Row ${trackid}`);
    };

    private onMouseEnter(trackid: number) {
        console.log(`Row ${trackid} entered`)
    };


}

