import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import PostCard from "../components/PostCard";
import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";

export class FeedPage extends Component {
    state = { isLoading: true }

    loadPosts() {
        this.setState({ isLoading: true, })

        fetch(`${config.url}/posts_for_user/?user_id=${5}`,{
            headers: new Headers({
                'Authorization': 'Bearer ' + getSession().jwt,
            }),
        })
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