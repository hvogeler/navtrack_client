import * as React from 'react';
import insertdeletetrackpoint from "../images/insertdeletetrackpoint.png"
import trackicons from "../images/trackicons.png"

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
            <p>First enter the missing data into the form. As soon as you enter the region of where the track is
                supposed
                to be the map will pan to that location. If it doesn't the region entered was unknown. Please try a
                different
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
            <p><img src={trackicons} className="rounded float-right"/>
                After you have logged in the track list will show three icons next to your tracks that allow you to edit
                (<i
                className="material-icons md-yellow hand-pointer"
                data-toggle="tooltip" data-placement="left" title="Edit Track">edit</i>), delete (<i
                className="material-icons md-grey hand-pointer"
                data-toggle="tooltip" data-placement="top" title="Delete Track">delete</i>) or download (<i
                className="material-icons md-grey hand-pointer"
                data-toggle="tooltip" data-placement="top" title="Download">cloud_download</i>) your track. These icons are not
                shown for tracks that do not belong to you.
            </p>
            <p>After you click edit you will be presented the track in edit mode. You can
            <ul>
                <li>Change the meta data of the track on the form</li>
                <li>Add or delete trackpoints on the map</li>
            </ul>
            </p><p><img src={insertdeletetrackpoint} className="rounded float-right"/>
            You add a trackpoint simply by clicking on the map. If you click on an existing trackpoint to select.
        In the trackpoint list on the right you can now
        <ul>
            <li>Delete the selected trackpoint</li>
            <li>Insert a new trackpoint before or after the selected trackpoint</li>
            After you clicked insert (before or after) click on the map to add the trackpoint at the selected posision.
        </ul></p>
        </div>
    )
};