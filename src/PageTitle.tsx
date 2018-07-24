import * as React from 'react';

interface IPageTitleProps {
    title: string
}

export class PageTitle extends React.Component<IPageTitleProps, any> {
    constructor(props: IPageTitleProps) {
        super(props)
    }

    public render() {
        return (
            <div className="container-fluid row p-3" style={{verticalAlign : "middle"}}>
                <div className="col-12 text-center">
                    <span className="text-secondary display-4">{this.props.title}</span>
                </div>
                < hr/>
            </div>
        )
    }
}