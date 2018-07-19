import * as React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'

interface ITeaserProps {
    image: string
}

export class Teaser extends React.Component<ITeaserProps, any> {
    constructor(props: ITeaserProps) {
        super(props)
    }

    public render() {
        return (
            <div className="container-fluid">
                <img src={this.props.image} className="img-fluid"/>
            </div>
        )
    }
}