import {LatLng} from "leaflet";
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import {observable} from "mobx";
import {observer} from "mobx-react";
import * as moment from "moment";
import * as React from 'react';
import {ChangeEvent} from 'react';
import {globalRootStore} from "../App";
import {ITrackCreateProps} from "./TrackCreateController";
import {EditOrCreate} from "./TrackCreateMain";

@observer
export class TrackCreateDetail extends React.Component<ITrackCreateProps, any> {

    @observable private errorMsg: string | null = null;
    @observable private okMsg: string | null = null;
    private uploadInput: HTMLInputElement | null;

    constructor(props: ITrackCreateProps) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeHandlerSelect = this.onChangeHandlerSelect.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeFileUPload = this.onChangeFileUPload.bind(this);
    }

    public componentDidMount() {
        if (this.props.mode === EditOrCreate.edit) {
            this.centerMap(this.props.trackData.region);
        }
    }

    public render() {
        const tableRows = [
            {
                "label": "Length (Km)",
                "value": this.props.trackLengthInKm.toFixed(2)
            },
            {
                "label": "Trackpoints",
                "value": this.props.trackPts.length
            },
            {
                "label": "Elevation Diff",
                "value": this.props.elevationInfo.maxEleDiff.toFixed(0)
            },
            {
                "label": "Cum Ascend",
                "value": this.props.elevationInfo.cumAscend.toFixed(0)
            },
            {
                "label": "Cum Descend",
                "value": this.props.elevationInfo.cumDescend.toFixed(0)
            },
        ];

        if (!globalRootStore.uiStore.isLoggedIn) {
            return (<div className="container-fluid">
                <div className="row no-gutters">
                    <div className="col-md-10  bg-info text-white ">
                        Please log in
                    </div>
                </div>
            </div>)
        }
        else {
            return (
                <div className="container-fluid">
                    <div className="row no-gutters pl-1">
                        <div className="col-md-10  bg-info text-white">
                            <form onSubmit={this.onSubmitHandler}>
                                <div id="detailForm" className="">
                                    <div className="row">
                                        <div className="form-group text-left col-2">
                                            <label htmlFor="trackname">Trackname</label>
                                            <input type="text" className="form-control" id="trackname"
                                                   onChange={this.onChangeHandler}
                                                   value={this.props.trackData.trackname}/>
                                        </div>
                                        <div className="form-group col-3 text-left">
                                            <label htmlFor="description">Description</label>
                                            <textarea rows={3} className="form-control" id="description"
                                                      onChange={this.onChangeHandler}
                                                      value={this.props.trackData.description}
                                                      maxLength={250}/>
                                        </div>
                                        <div className="form-group col-2 text-left">
                                            <label htmlFor="country">Country</label>
                                            <select id="country" className="form-control"
                                                    onChange={this.onChangeHandlerSelect}>
                                                <option selected={true}>{this.props.trackData.country}</option>
                                                {this.props.countries.map(value => {
                                                    return (<option key={value.id}>{value.name}</option>)
                                                })}
                                            </select>
                                            {/*<input type="text" className="form-control" id="country"*/}
                                            {/*onChange={this.onChangeHandler}/>*/}
                                        </div>
                                        <div className="form-group col-2 text-left">
                                            <label htmlFor="region">Region</label>
                                            <input type="text" className="form-control" id="region"
                                                   onChange={this.onChangeHandler}
                                                   onBlur={this.onBlurHandler} value={this.props.trackData.region}/>
                                        </div>
                                        <div className="form-group col-2 text-left">
                                            <label htmlFor="tracktype">Tracktype</label>
                                            <select id="tracktype" className="form-control" multiple={true}
                                                    onChange={this.onChangeHandlerSelect}>
                                                {this.props.tracktypes.map(value => {
                                                    const isSelected = this.props.trackData.tracktypes.some(tt => tt === value.tracktypename);
                                                    return (<option key={value.id}
                                                                    selected={isSelected}>{value.tracktypename}</option>)
                                                })}
                                            </select>
                                            {/*<input type="text" className="form-control" id="country"*/}
                                            {/*onChange={this.onChangeHandler}/>*/}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-2 text-left">
                                            <button type="submit" className={`btn btn-info ${this.saveButtonOutline()}`}
                                                    hidden={false}>Save Track
                                            </button>
                                        </div>

                                        {(this.props.mode === EditOrCreate.create) ?
                                            <div className="form-group col-2 text-left">
                                                <label className="btn btn-info btn-outline-light"
                                                       hidden={false}>Upload Gpx Track
                                                    <input type={"file"}
                                                           hidden={true}
                                                           ref={(ref) => this.uploadInput = ref}
                                                           onChange={this.onChangeFileUPload}
                                                           accept={".gpx"}
                                                    />
                                                </label>
                                            </div> : ""
                                        }
                                        {(this.errorMsg != null || this.props.errorMsg != null) ?
                                            <div className="form-group col-6 border-danger rounded"
                                                 style={{backgroundColor: 'red'}}>
                                                <div
                                                    className="text-light text-center justify-content-center align-self-center">
                                                    {this.props.errorMsg || this.errorMsg}
                                                </div>
                                            </div>
                                            : ""
                                        }
                                        {(this.okMsg != null && this.props.errorMsg == null) ?
                                            <div className="form-group col-6">
                                                <div className="text-light text-center">
                                                    {this.okMsg}
                                                </div>
                                            </div>
                                            : ""
                                        }
                                    </div>
                                    {/*<div className="row">*/}
                                    {/*<div className="form-group col-2 text-left">*/}
                                    {/*<label htmlFor="owner">Owner</label>*/}
                                    {/*<input type="text" className="form-control" id="owner" readOnly={true}*/}
                                    {/*value={globalRootStore.uiStore.user || "not logged in"}/>*/}
                                    {/*</div>*/}
                                    {/*<div className="form-group col-2 text-left">*/}
                                    {/*<label htmlFor="created">Created</label>*/}
                                    {/*<input type="text" className="form-control" id="created"*/}
                                    {/*onChange={this.onChangeHandler}/>*/}
                                    {/*<button type="submit" className="btn btn-light" hidden={true}>Enter</button>*/}
                                    {/*</div>*/}
                                    {/*</div>*/}
                                </div>
                            </form>
                        </div>
                        <div className="col-md-auto pl-1">
                            <table id="AdditionalDetail" className="table table-borderless">
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col" className="text-right">Parameter</th>
                                    <th scope="col" className="text-left">Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableRows.map((infoRow, idx) => {
                                    return (
                                        <tr key={idx}>
                                            <th className="text-right font-weight-bold">{infoRow.label}</th>
                                            <td className="text-left">{infoRow.value}</td>
                                        </tr>
                                    )
                                })
                                }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            );
        }
    }

    private onChangeHandler(event: React.FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const inputField = event.currentTarget.id;
        this.props.changeTrack(
            {
                ...this.props.trackData,
                [inputField]: event.currentTarget.value
            }
        )
    }

    private onChangeFileUPload(event: React.FormEvent<HTMLInputElement>) {
        const inputField = event.currentTarget.id;
        if (event.currentTarget.files !== null && event.currentTarget.files.length > 0) {
            const gpxfile: File = event.currentTarget.files[0];
            this.props.readGpxFile(gpxfile);
            this.okMsg = (`Track loaded from file ${gpxfile.name}. Filesize: ${(gpxfile.size / 1024).toFixed(1)} KB`);
            this.errorMsg = null;
        }
        console.log(inputField);
    }

    // private isShowSaveButton() : boolean {
    //     if (this.props.trackData.country != null) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    private saveButtonOutline(): string {
        let outline = "btn-outline-light";

        if (this.errorMsg != null) {
            outline = "btn-outline-danger"
        }
        if (this.okMsg != null) {
            outline = "btn-outline-light"
        }

        return outline;
    }

    private onChangeHandlerSelect(event: React.FormEvent<HTMLSelectElement>) {
        const inputField = event.currentTarget.id;
        if (inputField === "country") {
            this.props.trackData.country = event.currentTarget.value;
        }
        if (inputField === "tracktype") {
            this.props.trackData.tracktypes = [];
            const len = event.currentTarget.options.length;
            for (let i = 0; i < len; i++) {
                if (event.currentTarget.options[i].selected) {
                    this.props.trackData.tracktypes.push(event.currentTarget.options[i].value);
                }
            }
        }
    }

    private onBlurHandler(event: React.FormEvent) {
        console.log(`Geosearch for  ${this.props.trackData.region}`);
        this.centerMap(this.props.trackData.region);
    }


    private centerMap(region: string) {
        const provider = new OpenStreetMapProvider();
        provider.search({query: region}).then((value) => {
            if (value.length <= 0) {
                return;
            }
            console.log(value[0]);
            const topHitLocation = value[0];
            this.props.setMapCenter({
                label: topHitLocation.label,
                location: new LatLng(topHitLocation.y, topHitLocation.x),
            })
        })
            .catch((msg) => console.log(`Error on geosearch: ${msg}`))
    }

    private onSubmitHandler(event: React.FormEvent) {
        event.preventDefault();
        if (this.props.trackData.trackname === null
            || this.props.trackData.country === null
            || this.props.trackData.region === null
            || this.props.trackData.trackname === ""
            || this.props.trackData.region === ""
            || this.props.trackData.tracktypes.length === 0
        ) {
            this.okMsg = null;
            this.errorMsg = "Trackname, Country, Region and at least one Tracktype must be entered";
            return
        }
        this.errorMsg = null;
        this.props.trackData.owner = globalRootStore.uiStore.userDo;
        this.props.trackData.created = moment().format();
        const ret = this.props.saveTrack();
        if (ret !== "OK") {
            this.okMsg = null;
            this.errorMsg = ret;
            return
        }
        this.okMsg = `Track ${this.props.trackData.trackname} saved`;
    }

}
