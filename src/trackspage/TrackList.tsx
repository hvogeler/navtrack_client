import {action, observable} from "mobx";
import {observer} from "mobx-react";
import * as moment from "moment";
import * as React from 'react';
import {Link} from "react-router-dom";
import {globalRootStore} from "../App";
import {TrackTo} from "../transport/TrackTo";


interface ITrackListProps {
    pageSizeInLines: number;
    numberOfPages: number;
    getPage: (pageNumber: number) => TrackTo[];
    currentTrackListId: number;
    setCurrentTrackListId: (id: number) => void;
    tracks: TrackTo[];
}

@observer
export class TrackList extends React.Component<ITrackListProps, any> {
     @observable private currentPageNumber: number = 0;

    constructor(props: ITrackListProps) {
        super(props)
    }

    public render() {
        console.log(this.props.tracks.length);
        return (
            <div className="container-fluid border-bottom border-secondary mb-1">
                <div className="px-1">
                    <table id="TrackList" className="table table-hover">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col" className="text-left">Name</th>
                            <th scope="col">Country</th>
                            <th scope="col">Region</th>
                            <th scope="col">Created</th>
                            <th scope="col">Owner</th>
                            {globalRootStore.uiStore.isLoggedIn ?
                                <th scope="col">Action</th> : <th/>}
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.getPage(this.currentPageNumber).map(it =>
                            <tr key={it.id}
                                id="{it.id}"
                                className={this.props.currentTrackListId === it.id ? "bg-info text-white" : "bg-white text-dark"}
                                onClick={() => this.onClick(it.id)}
                                //                            onMouseEnter={() => this.onMouseEnter(it.id)}
                            >
                                <td className="text-left">{it.trackname}</td>
                                <td>{it.country}</td>
                                <td>{it.region}</td>
                                <td>{moment(it.created).format("Y-MM-DD HH:mm")}</td>
                                <td>{it.owner!.username}</td>
                                {globalRootStore.uiStore.isLoggedIn && globalRootStore.uiStore.userDo!.id === it.owner!.id ?
                                    <td><Link to={`/edit/${it.id}`}> <i
                                        className="material-icons md-yellow hand-pointer"
                                        data-md-tooltip="Edit Track">edit </i></Link>
                                        <i className="material-icons md-grey hand-pointer"
                                           onClick={() => this.deleteItem(it.id)}
                                           data-md-tooltip="Delete Track">delete</i></td> : <td/>}
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="row pl-1 align-text-bottom">
                    <div className="col">
                        <nav aria-label="Pagination">
                            <ul className="pagination">
                                <li className="page-item page-link text-dark">Page: {this.currentPageNumber + 1}</li>
                                <li className="page-item page-link" onClick={() => this.onClickPreviousPage()}>Previous</li>
                                {this.props.numberOfPages >= 1 ? <li className="page-item page-link" onClick={() => this.currentPageNumber = 0}>1</li> : ""}
                                {this.props.numberOfPages >= 2 ? <li className="page-item page-link" onClick={() => this.currentPageNumber = 1}>2</li> : ""}
                                {this.props.numberOfPages >= 3 ? <li className="page-item page-link" onClick={() => this.currentPageNumber = 2}>3</li> : ""}
                                <li className="page-item page-link">...</li>
                                <li className="page-item page-link" onClick={() => this.currentPageNumber = this.props.numberOfPages - 1}>{this.props.numberOfPages}</li>
                                <li className="page-item page-link" onClick={() => this.onClickNextPage()}>Next</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }

    @action
    private onClickNextPage() {
        if (this.currentPageNumber < (this.props.numberOfPages - 1)) {
            this.currentPageNumber++;
        }
    };

    @action
    private onClickPreviousPage() {
        if (this.currentPageNumber > 0) {
            this.currentPageNumber--;
        }
    };

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

    // private onMouseEnter(trackid: number) {
    //     console.log(`Row ${trackid} entered`)
    // };


}

