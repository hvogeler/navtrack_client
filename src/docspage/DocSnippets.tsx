import * as React from 'react';

export const GeneralIntroHtml: React.SFC = () => {
    return (<div>
            <p>Navure Mobile is a phone navigation app that leads you through the wilderness following a GPS track.
                Unlike many others it does so with acoustic signals and the Apple Watch so you do not need
                to constantly pull out your phone, turn it on, start the app and look</p>
            <p>Navure Web lets you create tracks on a map, store them and later use them on your mobile phone
                to navigate you thru nature.</p>
            <p>Navure consists of Navure Web and Navure Mobile. With Navure Web you can upload or define
                your track
                on a topographical map. You give the track a name, a description, a country and a region
                when you store it.
                This information later lets you find the track, edit it or use it with Navure Mobil guiding
                you thru the
                wild</p>
        </div>
    )
};

export const CreateTrackHtml: React.SFC = () => {
    return (<div>
            <p>
                Create a track either by
                <ul>
                    <li>uploading an existing track</li>
                    <li>manually entering trackpoints on the map</li>
                </ul>
            </p>
            <h5>Upload existing track</h5>
            <p>First you need to register yourself and log in. A menu item <b>Create</b> will appear.
            You are presented with an empty map and a form to enter track data.
            Now click <b>Upload GPX Track</b> and select a .gpx file from your disk.</p>
            <p>The track will be shown on the map and the form will be filled with data available in the gpx file.
            Complete the form with meaningful track data. If possible use the English language because the search
            algorithm is optimzed for English.</p>
            <h5>Manually enter a track</h5>
            <p>
            If you plan your outdoor activity you can very quickle create your track manually. In fact this is my
                normal use case.</p>
            <p>First enter the missing data into the form. As soon as you enter the region of where the track is supposed
            to be the map will pan to that location. If it doesn't the region entered was unknown. Please try a different
            name for your region in this case</p>
            <p>Now go to the map, zoom it to a convenient detail level and click on it where the trackpoints should be.
            Whenever your track changes direction add a trackpoint by clicking on the location of the turn.</p>
            <p>When you are done, click <b>Save</b>. The track will be saved in the database and it will be available
            for to be found by the search function in your browser or in Navure Mobile.</p>
        </div>
    )
};

export const EditTrackHtml: React.SFC = () => {
    return (<div>
            <p>
                Edit a track
            </p>
        </div>
    )
};