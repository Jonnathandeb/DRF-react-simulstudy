import React, { Component } from 'react';
import { Menu, Input, Card } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import ClassesDropdown from '../components/ClassesDropdown';
import PostCard from "../components/PostCard"

export class FeedPage extends Component {
    state = { isLoading: true }

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
            <div>
                <Menu stackable>
                    <Menu.Item>
                        <img src='/SS_logo.png' alt="Simulstudy Logo" />
                    </Menu.Item>
                    <Menu.Item
                        as={Link}
                        to="/"
                        name='home'
                    />
                    <ClassesDropdown id="5" active={true} />
                    <Menu.Item
                        as={Link}
                        to="/profile"
                        name='profile'
                    />
                    <Menu.Item
                        as={Link}
                        to="/leaderboard"
                        name='leaderboard'
                    />
                    <Menu.Item>
                        <Input className='icon' placeholder='Search...' action="search"/>
                    </Menu.Item>
                </Menu>
                <Card.Group>
                    {posts}
                </Card.Group>
            </div>
        )
    }
}