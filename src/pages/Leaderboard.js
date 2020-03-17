import React, { Component } from 'react';
import { Menu, Grid, Segment } from 'semantic-ui-react'
import { getSession } from "../utils/cookie_manager";
import LeaderboardTable from "../components/LeaderboardTable"

import config from "../api_config.json";

export class LeaderboardPage extends Component {
	state = {
		isLoading: true,
		activeItem: 'All school',
		activeId: 0,
		classes: []
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name, activeId: e.target.id })

	loadClasses() {
		this.setState({ isLoading: true })

        fetch(`${config.url}/membership_user/`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
            }), 
        })
        .then(res => res.json())
        .then((classes) => {
            this.setState({isLoading: false, classes: classes})
		})
	}

	componentDidMount() {
		this.loadClasses()
	}

	render() {
		const { activeItem } = this.state

		let classItems = [<Menu.Item>Loading classes ...</Menu.Item>];

		if (!this.state.isLoading) {
			classItems = []
			for (let i = 0; i < this.state.classes.length; i++) {
				classItems.push(
					<Menu.Item
						id={this.state.classes[i].id}
						name={this.state.classes[i].name}
						active={activeItem === this.state.classes[i].name}
						onClick={this.handleItemClick}
					/>
				)
			}
		}

		return (
			<Grid>
				<Grid.Column width={3}>
				<Menu pointing secondary vertical>
					<Menu.Item
						id="0"
						name='All school'
						active={activeItem === 'All school'}
						onClick={this.handleItemClick}
					/>
					{classItems}
				</Menu>
				</Grid.Column>

				<Grid.Column width={13}>
					<LeaderboardTable id={this.state.activeId} />
				</Grid.Column>
			</Grid>
		)
	}
}