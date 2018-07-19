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
                <div className="container-fluid p-3 ">
                    <h1 className="text-secondary display-4">{this.props.title}</h1>
                    <hr/>
                </div>
        )
    }
}