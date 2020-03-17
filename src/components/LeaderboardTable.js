import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import { getSession } from "../utils/cookie_manager";
import LeaderboardRow from "../components/LeaderboardRow";

import config from "../api_config.json";

export default class LeaderboardTable extends Component {
    state = {
        classId: 0,
        data: []
    }
    
    loadSchoolLeaderboard = () => {
        fetch(`${config.url}/points_by_school/`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
            }), 
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({data: data.data})
		})
    }

    loadClassLeaderboard = (classId) => {
        fetch(`${config.url}/points_by_class/?class_id=${classId}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
            }), 
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({data: data.data})
		})
    }

    loadLeaderboard = (id) => {
        if (id === 0 || id === "0") {
            this.loadSchoolLeaderboard();
        }
        else {
            this.loadClassLeaderboard(id);
        }
    }

    componentDidMount() {
        this.loadLeaderboard(this.state.classId);
    }

    componentDidUpdate() {
        if (this.state.classId !== this.props.id) {
            this.setState({classId: this.props.id});
            this.loadLeaderboard(this.props.id);
        }
    }

    render() {
        let users = []
        console.log(this.state.data)
        for (let i = 0; i < this.state.data.length; i++) {
            users.push(<LeaderboardRow place={i + 1} data={this.state.data[i]} />);
        }
        console.log(users)

        return (
            <Table celled>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Place</Table.HeaderCell>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Comment Points</Table.HeaderCell>
                    <Table.HeaderCell>Post Points</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {users}
                </Table.Body>
            </Table>
        )
    }
}