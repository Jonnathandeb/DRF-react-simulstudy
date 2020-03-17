import React, { Component } from 'react';
import { Table, Label } from 'semantic-ui-react';

export default class LeaderboardTable extends Component {
    render() {
        let colors = {
            1: "yellow",
            2: "gray",
            3: "brown"
        }

        if (this.props.place <= 3) {
            return (
                <Table.Row>
                    <Table.Cell>
                    <Label ribbon color={colors[this.props.place]}>{this.props.place}</Label>
                    </Table.Cell>
                    <Table.Cell>{this.props.data.username}</Table.Cell>
                    <Table.Cell>{this.props.data.post_like_score - this.props.data.post_dislike_score}</Table.Cell>
                    <Table.Cell>{this.props.data.comment_like_score - this.props.data.comment_dislike_score}</Table.Cell>
                </Table.Row>
            )
        }
        else {
            return (
                <Table.Row>
                    <Table.Cell>{this.props.place}</Table.Cell>
                    <Table.Cell>{this.props.data.username}</Table.Cell>
                    <Table.Cell>{this.props.data.post_like_score - this.props.data.post_dislike_score}</Table.Cell>
                    <Table.Cell>{this.props.data.comment_like_score - this.props.data.comment_dislike_score}</Table.Cell>
                </Table.Row>
            )
        }
    }
}