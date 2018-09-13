import {LatLng} from "leaflet";
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import * as React from 'react';
import {globalRootStore} from "../App";
import {ITrackCreateProps} from "./TrackCreateController";

export class TrackCreateDetail extends React.Component<ITrackCreateProps, any> {
    constructor(props: ITrackCreateProps) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
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
        } else {

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
                                            <select id="inputState" className="form-control">
                                                <option selected={true}>Choose...</option>
                                                {this.props.countries.map(value => {
                                                    return (<option key={value}>{value}</option>)
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
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-2 text-left">
                                            <label htmlFor="owner">Owner</label>
                                            <input type="text" className="form-control" id="owner"
                                                   onChange={this.onChangeHandler}/>
                                        </div>
                                        <div className="form-group col-2 text-left">
                                            <label htmlFor="created">Created</label>
                                            <input type="text" className="form-control" id="created"
                                                   onChange={this.onChangeHandler}/>
                                            <button type="submit" className="btn btn-light" hidden={true}>Enter</button>
                                        </div>
                                    </div>
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
        Object.keys(this.props.trackData).forEach((v, i, a) => console.log(`${v} ${this.props.trackData[v]}`))
        event.preventDefault();
    }

}
