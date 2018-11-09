import {observer} from "mobx-react";
import * as moment from "moment";
import * as React from 'react';
import {AccessLogTo} from "../transport/AccessLogTo";

interface ILogViewerListProps {
    accessLogEntries: AccessLogTo[];
}

@observer
export class LogViewerList extends React.Component<ILogViewerListProps, any> {
    constructor(props: ILogViewerListProps) {
        super(props);
    }

    public render() {
        return (
            <div className="border-bottom border-secondary mb-1">
                <div className="px-1">
                    <table id="LogViewerList" className="table table-hover table-responsive-sm">
                        <thead className="thead-light">
                        <tr>
                            <th scope="col" className="text-left">User</th>
                            <th scope="col" className="text-left">Access</th>
                            <th scope="col" className="text-left">From</th>
                            <th scope="col" className="text-left">Request</th>
                            <th scope="col" className="text-left">URI</th>
                            <th scope="col" className="text-left">Query</th>
                            <th scope="col">Method</th>
                            <th scope="col">Response</th>
                            <th scope="col" className="text-left">Error</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.accessLogEntries.map(it => {
                            return (
                                <tr key={it.id} id="{it.id}" className="no-gutters pb-0 pt-0 table-sm smallfont">
                                    <td className="text-left">{it.remoteuser}</td>
                                    <td className="text-left">{moment(it.ts).format("Y-MM-DD_HH:mm")}</td>
                                    <td>{it.fromhost}</td>
                                    <td className="text-left">{it.request}</td>
                                    <td className="text-left">{it.path}</td>
                                    <td className="text-left">{it.query}</td>
                                    <td>{it.method}</td>
                                    <td>{it.response}</td>
                                    <td className="text-left">{it.errormsg}</td>
                                </tr>)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

