import 'babel-polyfill';
import 'isomorphic-fetch';
import {TrackDo} from "../trackspage/TrackDo";


// TODO: make backend URL configurable
// const BACKEND_URL = 'http://localhost:8080';
const BACKEND_URL = process.env.REACT_APP_SERVER_URL;

export function fetchJson(path: string) {
    console.log(`REST Server URL: ${BACKEND_URL}`);
    const url = `${BACKEND_URL}${path}`;
    const headers = {
        "Accept" : "application/json",
        "Authorization" : "Basic aHZvOmh2bw==",
        'Content-Type' : "application/json"
    };

    console.log(headers);

    return fetch(url, {
        "headers" : headers,
        "method" : "GET",
        "mode" : "cors"
    }, )
        .then(response => response.json())
        .catch(ex => {
            console.error('parsing failed', ex);
        });
}

export function sendJson(method: string, path: string, payload: TrackDo | null) {
    const url = `${BACKEND_URL}${path}`;
    return fetch(url, {
        'body': JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Basic YWRtaW46YWRtaW4=',
            'Content-Type': 'application/json'
        },
        'method': method,
        "mode" : "cors"
    })
        .then(response => response.json())
        .catch(ex => {
            console.error('parsing failed', ex);
        })
}