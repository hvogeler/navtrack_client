import * as React from 'react';
import {fetchJson} from "../backend/Backend";
import edittrackImg from "../images/edittrack1kl.png"
import {CreateTrackHtml, EditTrackHtml, GeneralIntroHtml} from './DocSnippets';

export class PageContent extends React.Component<any, any> {

    public componentDidMount() {
        {this.documentAccessLog("GeneralIntro")};
    }

    public render() {
        return (
            <div>
                <div className="ml-3 doc-sidebar">
                    <nav id="doccontents" className="navbar navbar-light bg-light">
                        <a className="navbar-brand text-left" href="#navure">Navure</a>
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link text-left text-dark pb-0" href="#navureweb" onClick={() => this.documentAccessLog("navureWeb")}>Navure Web</a>
                            <nav className="nav nav-pills flex-column">
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small"
                                   href="#createtrack" onClick={() => this.documentAccessLog("createtrack")}>Create Track</a>
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small"
                                   href="#edittrack" onClick={() => this.documentAccessLog("edittrack")}>Edit Track</a>
                            </nav>
                            <a className="nav-link text-left text-dark pb-0" href="#navuremobile" onClick={() => this.documentAccessLog("navureMobile")}>Navure Mobile</a>
                            <nav className="nav nav-pills flex-column">
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small"
                                   href="#intromobile" onClick={() => this.documentAccessLog("navureMobileIntro")}>Introduction</a>
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small" href="#item-2">item
                                    2</a>
                            </nav>
                        </nav>
                    </nav>
                </div>
                <div className="col-sm-8 table-wrapper-scroll-y">
                    <div className="text-left">
                        <h1 id="navure" data-spy="scroll" data-target="#navure" data-offset="0">Navure</h1>
                        <GeneralIntroHtml/>

                        <h2 id="navureweb" data-spy="scroll" data-target="#navureweb" data-offset="0">Navure Web</h2>
                        <img src={edittrackImg} className="rounded float-right"/>

                        <h3 id="createtrack">Create a Track</h3>
                        <CreateTrackHtml/>
                        <h3 id="edittrack">Edit a Track</h3>
                        <EditTrackHtml/>

                        <h2 id="navuremobile" data-spy="scroll" data-target="#navuremobile" data-offset="0">Navure Mobile</h2>
                        <h3 id="intromobile">Introduction</h3>
                        <p>...</p>

                    </div>
                </div>
            </div>
        )
    }

    public documentAccessLog(title: string, language: string = "en") {
        fetchJson(`/api/document?name=${title}&language=${language}`);
        return null;
    }
}