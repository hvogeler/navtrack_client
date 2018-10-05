import * as React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

interface ITeaserProps {
    image: string;
    title: string;
}

export class Teaser extends React.Component<ITeaserProps, any> {
    // private styles = {
    //     backgroundColor: 'rgba(255,255,255,0.6)',
    //     height: '20px',
    // };

    constructor(props: ITeaserProps) {
        super(props)
    }

    public render() {
        return (
                <div className="img-thumbnail">
                    <img src={this.props.image} className="img-fluid"/>
                    <div className="text-secondary h-25 post-content small">
                        <h1>
                        {this.props.title}
                        </h1>
                    </div>
                </div>
        )
    }
}