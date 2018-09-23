import {LatLng} from "leaflet";
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import {observable} from "mobx";
import {observer} from "mobx-react";
import * as moment from "moment";
import * as React from 'react';
import {globalRootStore} from "../App";
import {ITrackCreateProps} from "./TrackCreateController";

@observer
export class TrackCreateDetail extends React.Component<ITrackCreateProps, any> {

    @observable private errorMsg: string | null = null;
    @observable private okMsg: string | null = null;

    constructor(props: ITrackCreateProps) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeHandlerSelect = this.onChangeHandlerSelect.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    public render() {
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
                    <div className="row no-gutters">
                        <div className="col-md-10  bg-info text-white ">
                            <form onSubmit={this.onSubmitHandler}>
                                <div id="detailForm" className="">
                                    <div className="row">
                                        <div className="form-group text-left col-2">
                                            <label htmlFor="trackname">Trackname</label>
                                            <input type="text" className="form-control" id="trackname"
                                                   onChange={this.onChangeHandler}/>
                                        </div>
                                        <div className="form-group col-3 text-left">
                                            <label htmlFor="description">Description</label>
                                            <input type="text" className="form-control" id="description"
                                                   onChange={this.onChangeHandler}/>
                                        </div>
                                        <div className="form-group col-2 text-left">
                                            <label htmlFor="country">Country</label>
                                            <select id="country" className="form-control"
                                                    onChange={this.onChangeHandlerSelect}>
                                                <option selected={true}>Choose...</option>
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
                                                   onBlur={this.onBlurHandler}/>
                                        </div>
                                        <div className="form-group col-2 text-left">
                                            <label htmlFor="tracktype">Tracktype</label>
                                            <select id="tracktype" className="form-control" multiple={true}
                                                    onChange={this.onChangeHandlerSelect}>
                                                {this.props.tracktypes.map(value => {
                                                    return (<option key={value.id}>{value.tracktypename}</option>)
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
                                        {(this.errorMsg != null || this.props.errorMsg != null) ?
                                            <div className="form-group col-8 border-danger rounded"
                                                 style={{backgroundColor: 'red'}}>
                                                <div className="text-light text-center justify-content-center align-self-center">
                                                    {this.props.errorMsg || this.errorMsg}
                                                </div>
                                            </div>
                                            : ""
                                        }
                                        {(this.okMsg != null) ?
                                            <div className="form-group col-8">
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
                        <div className="col-md-2">
                            <table id="AdditionalDetail" className="table table-borderless">
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col" className="text-right">Parameter</th>
                                    <th scope="col" className="text-left">Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="text-right">Length (Km)</td>
                                    <td className="text-left">{this.props.trackLengthInKm.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="text-right">Trackpoints</td>
                                    <td className="text-left">{this.props.trackPts.length}</td>
                                </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            );
        }
    }

    private onChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        const inputField = event.currentTarget.id;
        this.props.changeTrack(
            {
                ...this.props.trackData,
                [inputField]: event.currentTarget.value
            }
        )
    }

    // private isShowSaveButton() : boolean {
    //     if (this.props.trackData.country != null) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    private saveButtonOutline() : string {
        let outline = "btn-outline-light";

        if (this.errorMsg != null) {outline = "btn-outline-danger"};
        if (this.okMsg != null) {outline = "btn-outline-light"};

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
        const provider = new OpenStreetMapProvider();
        provider.search({query: this.props.trackData.region}).then((value) => {
            if (value.length <= 0) {
                return
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
        this.okMsg = `Track ${this.props.trackData.trackname} saved`;
        this.props.trackData.owner = globalRootStore.uiStore.userDo;
        this.props.trackData.created = moment().format();
        const ret = this.props.saveTrack();
        if (ret !== "OK") {
            this.okMsg = null;
            this.errorMsg = ret;
            return
        }
        Object.keys(this.props.trackData).forEach((v, i, a) => console.log(`${v} ${this.props.trackData[v]}`));
        console.log(`Country = ${this.props.trackData.country}`);
        console.log(`Tracktypes = ${this.props.trackData.tracktypes.join(", ")}`);
    }

}
