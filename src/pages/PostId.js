import React, { Component } from 'react'
import PostFullScreen from "../components/PostFullScreen"

export class PostIdPage extends Component {
    render() {
        return (
            <PostFullScreen url={`http://localhost:8000/posts/${this.props.match.params.id}/`} />
        );
    }
}