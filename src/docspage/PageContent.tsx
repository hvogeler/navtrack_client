import {observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import {fetchJson} from "../backend/Backend";
import {DocumentTo} from "../transport/DocumentTo";

@observer
export class PageContent extends React.Component<any, any> {

    @observable private errorMsg: string = "unknown error";
    @observable private docNavureGeneral: string | null = null;

    public componentDidMount() {
        this.getDocuments()
    }

    public render() {
        return (
            <div className="row">
                <div className="ml-2 doc-sidebar">
                    <nav id="doccontents" className="navbar navbar-light bg-light">
                        <a className="navbar-brand text-left" href="#navure">Navure</a>
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link text-left text-dark pb-0" href="#navureweb">Navure Web</a>
                            <nav className="nav nav-pills flex-column">
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small"
                                   href="#introweb">Introduction</a>
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small" href="#item-2">item
                                    2</a>
                            </nav>
                            <a className="nav-link text-left text-dark pb-0" href="#navuremobile">Navure Mobile</a>
                            <nav className="nav nav-pills flex-column">
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small"
                                   href="#intromobile">Introduction</a>
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small" href="#item-2">item
                                    2</a>
                            </nav>
                        </nav>
                    </nav>
                </div>
                <div className="col-6">
                    <div className="text-left doc-scrollcol" data-spy="scroll" data-target="#navure" data-offset="0">
                        <h1 id="navure">Navure</h1>
                        {this.getDocument(this.docNavureGeneral)}
                        <h2 id="navureweb">Navure Web</h2>
                        <h3 id="introweb">Introduction</h3>
                        <p>...</p>
                        <h2 id="navuremobile">Navure Mobile</h2>
                        <h3 id="intromobile">Introduction</h3>
                        <p>...</p>

                    </div>
                </div>
            </div>
        )
    }

    public getDocuments(){
        fetchJson("/api/document?name=navure general1")
            .then((response) => {
                if (!this.isExceptionResponse(response)) {
                    const doc: DocumentTo = response;
                    this.docNavureGeneral = doc.doctext;
                }
            })
            .catch(ex => {
            this.errorMsg = ex;
        });
    }

    private getDocument(doctext: string | null) : JSX.Element {
        return (<div dangerouslySetInnerHTML={doctext !== null ? { __html: doctext} : { __html: this.errorMsg}}/>);

    }

    private isExceptionResponse(resp: any): boolean {
        try {
            const respException = JSON.parse(resp);
            if (respException.exception !== undefined) {
                this.errorMsg = `Error on document api : ${resp}`;
                return true;
            }
        } catch (e) {
            ;
        }
        return false;
    }

}