import React, {Component} from 'react'
import PostComment from "./PostComment"
import { Comment } from "semantic-ui-react";
import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";

export default class AllPostComment extends Component {
	state = {
		isLoading: true,
		data: [],
		width: window.innerWidth,
	}

	loadComments() {
        this.setState({ isLoading: true, })

        fetch(`${config.url}/comment_data_for_post/?post_id=${this.props.id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({isLoading: false, data: data})
        })
    }
    
	componentDidMount() {
		this.loadComments()
	}

	render() {
        let comments = [];

        if (!this.state.isLoading) {
            for (let i = 0; i < this.state.data.length; i++) {
				comments.push(<PostComment data={this.state.data[i]} />)
            }
        }

        return (
			<Comment.Group style={{marginLeft: "1.2%"}}>
				{comments}
			</Comment.Group>
        )
    }
}