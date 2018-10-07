import * as FileSaver from "file-saver";
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import * as moment from "moment";
import * as React from 'react';
import {ChangeEvent} from "react";
import {Link} from "react-router-dom";
import {globalRootStore} from "../App";
import {TrackTo} from "../transport/TrackTo";


interface ITrackListProps {
    pageSizeInLines: number;
    setPageSize: (lines: number) => void;
    numberOfPages: number;
    getPage: (pageNumber: number) => TrackTo[];
    currentTrackListId: number;
    setCurrentTrackListId: (id: number) => void;
    tracks: TrackTo[];
}

@observer
export class TrackList extends React.Component<ITrackListProps, any> {
    @observable private currentPageNumber: number = 0;
    private pageSizeInLines: number;

    constructor(props: ITrackListProps) {
        super(props);
        this.pageSizeInLines = this.props.pageSizeInLines;
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    public componentWillMount() {
        this.pageSizeInLines = this.props.pageSizeInLines;
    }

    public render() {
        console.log(this.props.tracks.length);
        return (
            <div className="border-bottom border-secondary mb-1">
                <div className="px-1">
                    <table id="TrackList" className="table table-hover table-responsive-sm">
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
                        {this.props.getPage(this.currentPageNumber).map(it => {
                            const mimeType = "application/gpx+xml";
                            const blob = new Blob([it.gpx], {type: mimeType});
                            const url = window.URL.createObjectURL(blob);
                            url.anchor("xxx.gpx");
                            return (<tr key={it.id}
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
                                           data-md-tooltip="Delete Track">delete</i>
                                            <i className="material-icons md-grey hand-pointer"
                                               data-md-tooltip="Download" onClick={() => FileSaver.saveAs(blob, `${it.trackname}.${"gpx"}`)}>cloud_download</i></td> : <td/>}
                            </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="row pl-1 align-text-bottom">
                    <div className="col-auto">
                        <nav aria-label="Pagination">
                            <ul className="pagination">
                                <li className="page-item page-link text-dark">Page: {this.currentPageNumber + 1}</li>
                                <li className="page-item page-link"
                                    onClick={() => this.onClickPreviousPage()}>Previous
                                </li>
                                {this.props.numberOfPages >= 1 ? <li className="page-item page-link"
                                                                     onClick={() => this.currentPageNumber = 0}>1</li> : ""}
                                {this.props.numberOfPages >= 2 ? <li className="page-item page-link"
                                                                     onClick={() => this.currentPageNumber = 1}>2</li> : ""}
                                {this.props.numberOfPages >= 3 ? <li className="page-item page-link"
                                                                     onClick={() => this.currentPageNumber = 2}>3</li> : ""}
                                <li className="page-item page-link">...</li>
                                <li className="page-item page-link"
                                    onClick={() => this.currentPageNumber = this.props.numberOfPages - 1}>{this.props.numberOfPages}</li>
                                <li className="page-item page-link" onClick={() => this.onClickNextPage()}>Next</li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-auto mr-3">
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group row">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Lines per Page</span>
                                    </div>
                                    <input type="number"
                                           readOnly={false}
                                           className="form-control"
                                           id="pagesize"
                                           placeholder={this.props.pageSizeInLines.toString()}
                                           onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                               this.pageSizeInLines = +event.currentTarget.value;
                                           }}
                                           onBlur={(event: React.FormEvent) => this.props.setPageSize(this.pageSizeInLines)}
                                    />
                                </div>
                            </div>
                        </form>
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

    private onSubmitHandler(event: React.FormEvent) {
        event.preventDefault();
        this.props.setPageSize(this.pageSizeInLines)
    }

    @action
    private deleteItem(trackid: number) {
        console.log(`Delete Row ${trackid}`);
    };


    // private onMouseEnter(trackid: number) {
    //     console.log(`Row ${trackid} entered`)
    // };


}

