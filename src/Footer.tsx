import {observer} from "mobx-react";
import * as React from 'react'
import {Link} from "react-router-dom";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import {globalRootStore} from "./App";

@observer
export class Footer extends React.Component {

    constructor(props: any) {
        super(props)
    }


    public render() {
        return (
            <div className="mt-1">
                <div className="row pt-3 bg-info">
                    <div className="col-sm-12 ">
                        <div className="text-secondary">
                            <span className="text-white">Navure {globalRootStore.version} - Heiko Vogeler {globalRootStore.versionYear}</span>
                        </div>
                    </div>
                </div>
                <div className="row pt-3 bg-info">
                    <div className="col-sm-12 ">
                        <div className="text-secondary">
                            <Link className="text-white" to="/disclaimerAndImpressum">Disclaimer</Link>
                        </div>
                    </div>
                </div>
                <div className="row pt-0 bg-info">
                    <div className="col-sm-12">
                        <div className="text-secondary">
                            <Link className="text-white" to="/disclaimerAndImpressum">Impressum</Link>
                        </div>
                    </div>
                </div>
                <div className="row pb-3 bg-info">
                    <div className="col-sm-12">
                        <div className="text-secondary">
                            <Link className="text-white" to="/datenschutz">Datenschutz</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}