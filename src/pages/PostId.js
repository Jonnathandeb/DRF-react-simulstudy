import React, { Component } from 'react'
import PostFullScreen from "../components/PostFullScreen"

export class PostIdPage extends Component {
    render() {
        return (
            <PostFullScreen id={this.props.match.params.id} />
        );
    }
}