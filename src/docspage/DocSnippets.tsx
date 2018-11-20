import * as React from 'react';
import insertdeletetrackpoint from "../images/insertdeletetrackpoint.png"
import navuremobile from "../images/NavureMobile.jpg"
import searchweb from "../images/searchweb.jpg"
import trackicons from "../images/trackicons.png"
import watch1 from "../images/Watch1.png"
import watch2 from "../images/Watch2.png"

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
                    data-toggle="tooltip" data-placement="top" title="Download">cloud_download</i>) your track. These
                icons are not
                shown for tracks that do not belong to you.
            </p>
            <p>After you click edit you will be presented the track in edit mode. You can
                <ul>
                    <li>Change the meta data of the track on the form</li>
                    <li>Add or delete trackpoints on the map</li>
                </ul>
            </p>
            <p><img src={insertdeletetrackpoint} className="rounded float-right"/>
                You add a trackpoint simply by clicking on the map. If you click on an existing trackpoint to select.
                In the trackpoint list on the right you can now
                <ul>
                    <li>Delete the selected trackpoint</li>
                    <li>Insert a new trackpoint before or after the selected trackpoint</li>
                    After you clicked insert (before or after) click on the map to add the trackpoint at the selected
                    posision.
                </ul></p>
        </div>
    )
};

export const NavureMobileIntro: React.SFC = () => {
    return (<div>
        <img src={navuremobile} className="rounded float-right"/>
        <p>Navure lets you to navigate GPS tracks acoustically without the need to take the phone out of your pocket.
            Navure simply guides you thru nature turn by turn. I use it for hiking and running.</p>
        <p>
            Load a track in gpx format and off you go. No configuration, no parameters. No way to make mistakes. Instead
            it
            relies on standard IOS features
            whenever available. For example sound volume is not controlled by Navure but by the standard IOS controls.
        </p><p>
        Navure not even uses maps. It just shows the necessary information to follow the track. It is designed to just
        do one thing and do it good and simple.
    </p><p>
        Please inform me directly at heiko.vogeler@hvo.de if you encounter bugs. I will fix them as quickly as possible.
        Please also let me know if you have good ideas to improve Navure. By "Improve" I don't mean adding features but
        making the current features better and better usable.
    </p>
    </div>)
};

export const MobileUniqueFeatures: React.SFC = () => {
    return (<div>
            <p>
                <ul>
                    <li>***signals turns acoustically*** if the track turns half, normal, sharp right or left at the
                        next
                        trackpoint
                    </li>
                    <li> signals if you leave the track more than 50 meters</li>
                    <li>signals if you get back on track</li>
                    <li>track view shows ***fixed scales*** 1:6000, 1:12000, 1:25000</li>
                    <li>1:25000 means: one square on the screen is 250m in nature</li>
                    <li>you immediately see how far the next turn is away using the fixed scale</li>
                    <li>***low battery*** strain because of much less screen use. Typically 8 hours of using Navure
                        costs
                        less than
                        50% battery!
                    </li>
                    <li>automatic detection of the direction you follow the track</li>
                    <li>show if track legs are ascending ot descending thru coloring</li>
                </ul>
            </p>
            <p>
                <h5>Changes in Version 1.1</h5>
                <ul>
                    <li>Magnetic heading used if not moving</li>
                    <li>Smooth display refresh if not moving</li>
                    <li>Ascend and descend indicated by colours in track</li>
                    <li>Open last used track when app is started</li>
                    <li>Scroll infinitely in all directions</li>
                    <li>Nicer message on Apple Watch if the iPhone app is not running</li>
                    <li>Nicer tab bar icons that scale smoothly (thanks to my son for creating them late at night)</li>
                    <li>Don't signal turns and reverse if GPS signal is weak or if track curved tightly or if leaving
                        out
                        track points
                    </li>
                </ul>
            </p>
        </div>
    )
};

export const MobileAppleWatchSupport: React.SFC = () => {
    return (<div>
            <p>
                <ul>
                    <li>important data about your track and your position relative to the track is shown on Apple Watch</li>
                    <li>scrolls automatically thru the data so you don't need to take your gloves off and touch Apple
                        Watch
                    </li>
                    <li>turn notifications are sent to Apple Watch</li>
                    <li>track is shown graphically on the watch. Scroll to second pane and see where you are at a glance
                    </li>
                </ul>
            </p>
            <p>
            <img src={watch1} className="rounded mx-2 px-1"/>

            <img src={watch2} className="rounded"/>
            </p>
        </div>
    )
};

export const MobileUsage: React.SFC = () => {
    return (<div>
            <p><img src={searchweb} className="rounded float-right"/>
                <ul>
                    <li>load a track from any source supported by the iPhone. From a message, from mail, from Safari</li>
                    <li>load a previously loaded track from the list of previously used tracks in Navure</li>
                    <li>search for a track on Navure Web</li>
                    <li>navigation starts immediately</li>
                    <li>if you follow the track from start (green dot) to end (yellow dot) the arrow in the bottom right
                        corner
                        points
                        to the right
                    </li>
                    <li>your position is the tip of the blue "V". The "V" shows in the direction you are moving</li>
                    <li>the read dot is the closest point on the track</li>
                    <li>I usually create tracks myself using web sites like GPSies.com. Make sure you have set trackpoints
                        at
                        turns,
                        send the track to yourself via mail and open it with Navure
                    </li>
                    <li>Tracks from other people are sometimes bad:</li>
                    <li>too many trackpoints</li>
                    <li>gps errors not smoothed out</li>
                    <li>tracks that record points in both directions</li>
                    <li>check for such problems and correct the tracks before use</li>
                </ul>
            </p>
        </div>
    )
};
