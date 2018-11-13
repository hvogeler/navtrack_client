import * as React from 'react';

export class PageContent extends React.Component<any, any> {
    public render() {
        return (
            <div className="row">
                <div className="ml-2 doc-sidebar">
                    <nav id="doccontents" className="navbar navbar-light bg-light">
                        <a className="navbar-brand text-left" href="#navure">Navure</a>
                        <nav className="nav nav-pills flex-column">
                            <a className="nav-link text-left text-dark pb-0" href="#navureweb">Navure Web</a>
                            <nav className="nav nav-pills flex-column">
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small" href="#introweb">Introduction</a>
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small" href="#item-2">item 2</a>
                            </nav>
                            <a className="nav-link text-left text-dark pb-0" href="#navuremobile">Navure Mobile</a>
                            <nav className="nav nav-pills flex-column">
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small" href="#intromobile">Introduction</a>
                                <a className="nav-link ml-3 pt-0 pb-0 text-left text-dark small" href="#item-2">item 2</a>
                            </nav>
                        </nav>
                    </nav>
                </div>
                <div className="col-6">
                    <div className="text-left doc-scrollcol" data-spy="scroll" data-target="#navure" data-offset="0">
                        <h1 id="navure">Navure</h1>
                        <p>Navure lets you created tracks on a map, store them and later use them on your mobile phone
                            to navigate you thru nature.</p>
                        <p>Navure consists of Navure Web and Navure Mobile. With Navure Web you can upload or define
                            your track
                            on a topographical map. You give the track a name, a description, a country and a region
                            when you store it.
                            This information later lets you find the track, edit it or use it with Navure Mobil guiding
                            you thru the
                            wild</p>
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
}