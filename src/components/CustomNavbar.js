import React, { Component, createRef } from 'react';
import { Menu, Input, Sticky, Button } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";
import ClassesDropdown from './ClassesDropdown';

export default class CustomNavbar extends Component {
	contextRef = createRef()

	render() {
		return (
			<Sticky context={this.contextRef}>
				<Menu stackable>
					<Menu.Item>
						<img src='/SS_logo.png' alt="Simulstudy Logo" />
					</Menu.Item>
					<Menu.Item
						exact
						as={NavLink}
						to="/"
						name='home'
					/>
					<ClassesDropdown id="5" active={true} />
					<Menu.Item
						as={NavLink}
						to="/profile"
						name='profile'
					/>
					<Menu.Item
						as={NavLink}
						to="/leaderboard"
						name='leaderboard'
					/>
					<Menu.Item>
						<Input className='icon' placeholder='Search...' action="search"/>
					</Menu.Item>
					<Menu.Item position="right">
						<Button as={NavLink} to="/post" circular color="blue">Post</Button>
					</Menu.Item>
				</Menu>
			</Sticky>
		)
	}
}