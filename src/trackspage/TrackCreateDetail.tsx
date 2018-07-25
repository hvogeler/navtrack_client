import {LatLng} from "leaflet";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as React from 'react';
import {ITrackCreateProps} from "./TrackCreateController";

export class TrackCreateDetail extends React.Component<ITrackCreateProps, any> {
    constructor(props: ITrackCreateProps) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    public render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <div id="detailForm" className="border border-light rounded bg-info text-white">
                    <div className="row">
                        <div className="form-group col-2">
                            <label htmlFor="trackNameField" className="text-left">Trackname</label>
                            <input type="text" className="form-control" id="trackNameField"/>
                        </div>
                        <div className="form-group col-3">
                            <label htmlFor="descriptionField" className="text-left">Description</label>
                            <input type="text" className="form-control" id="descriptionField"/>
                        </div>
                        <div className="form-group col-2">
                            <label htmlFor="countryField" className="text-left">Country</label>
                            <input type="text" className="form-control" id="countryField"/>
                        </div>
                        <div className="form-group col-2">
                            <label htmlFor="regionField" className="text-left">Region</label>
                            <input type="text" className="form-control" id="regionField" onChange={this.onChangeHandler}
                                   onBlur={this.onSubmitHandler}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-2">
                            <label htmlFor="ownerField" className="text-left">Owner</label>
                            <input type="text" className="form-control" id="ownerField"/>
                        </div>
                        <div className="form-group col-2">
                            <label htmlFor="createdField" className="text-left">Created</label>
                            <input type="text" className="form-control" id="createdField"/>
                            <button type="submit" className="btn btn-light" hidden={true}>Enter</button>
                        </div>
                    </div>
                </div>
            </form>

        );
    }

    private onChangeHandler(event: React.FormEvent<HTMLInputElement>) {
        this.props.changeTrack(
            {
                ...this.props.trackData,
                region: event.currentTarget.value
            }
    )
    }

    private onSubmitHandler(event: React.FormEvent) {
        console.log(`Geosearch for  ${this.props.trackData.region}`);
        const provider = new OpenStreetMapProvider();
        provider.search({query: this.props.trackData.region}).then((value) => {
            if (value.length <= 0) { return };
            console.log(value[0]);
            const topHitLocation = value[0];
            this.props.setMapCenter( {
                label: topHitLocation.label,
                location: new LatLng(topHitLocation.y, topHitLocation.x),
            })
        })
            .catch( (msg) => console.log(`Error on geosearch: ${msg}`))
    }
}
