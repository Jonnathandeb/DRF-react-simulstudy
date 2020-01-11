import React, { Component, createRef } from 'react';
import { Card } from 'semantic-ui-react';
import PostCard from "../components/PostCard"

export class FeedPage extends Component {
    state = { isLoading: true }
    contextRef = createRef()

    loadPosts() {
        this.setState({ isLoading: true, })

        fetch(`http://localhost:8000/posts_for_user/?user_id=${5}`)
        .then(res => res.json())
        .then((data) => {
            this.setState({isLoading: false, data: data})
        })
    }

    componentDidMount() {
        this.loadPosts()
    }

    render() {
        let posts = [];
        if (!this.state.isLoading) {
            for (let i = 0; i < this.state.data.length; i++) {
                posts.push(<PostCard url={this.state.data[i].url} />)
            }
        }

        return (
            <Card.Group itemsPerRow={1} stackable>
                {posts}
            </Card.Group>
        )
    }
}