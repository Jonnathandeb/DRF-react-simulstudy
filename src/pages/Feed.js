import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import ClassesDropdown from '../components/ClassesDropdown';

export class FeedPage extends Component {
    state = { activeItem: 'Classes' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu stackable>
                <Menu.Item>
                    <img src='/SS_logo.png' alt="Simulstudy Logo" />
                </Menu.Item>
                <Menu.Item
                    as={Link}
                    to="/"
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <ClassesDropdown id="5" active={true} />
                <Menu.Item
                    as={Link}
                    to="/profile"
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={Link}
                    to="/leaderboard"
                    name='leaderboard'
                    active={activeItem === 'leaderboard'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item>
                    <Input className='icon' placeholder='Search...' action="search"/>
                </Menu.Item>
            </Menu>
        )
    }
}