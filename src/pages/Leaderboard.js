import React, { Component } from 'react';
import { Menu, Grid, Segment } from 'semantic-ui-react'

export class LeaderboardPage extends Component {
	state = { activeItem: 'home' }

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Grid>
				<Grid.Column width={3}>
				<Menu pointing secondary vertical>
					<Menu.Item
						name='home'
						active={activeItem === ''}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='messages'
						active={activeItem === 'messages'}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name='friends'
						active={activeItem === 'friends'}
						onClick={this.handleItemClick}
					/>
				</Menu>
				</Grid.Column>

				<Grid.Column width={13}>
					
				</Grid.Column>
			</Grid>
		)
	}
}