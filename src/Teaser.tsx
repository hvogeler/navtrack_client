import * as React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

interface ITeaserProps {
    image: string;
    title: string;
}

export class Teaser extends React.Component<ITeaserProps, any> {
    constructor(props: ITeaserProps) {
        super(props)
    }

    public render() {
        return (
            <div className="container-fluid">
                <div className="img-thumbnail">
                    <img src={this.props.image} className="img-fluid"/>
                    <div className="text-white text-center display-3 post-content">
                        {this.props.title}
                    </div>
                </div>
            </div>
        )
    }
}