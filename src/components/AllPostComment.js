import React, {Component} from 'react'
import PostComment from "./PostComment"
import { Comment, Input } from "semantic-ui-react";
import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";

export default class AllPostComment extends Component {
	state = {
		isLoading: true,
		data: [],
        width: window.innerWidth,
        commentContent: null,
        submittedCommentContent: null
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

    handleCommentChange = (e, { value }) => {
        this.setState({commentContent: value})
    }

    handleCommentSubmit = () => {
        this.setState({submittedCommentContent: this.state.commentContent})

        let postData = {"content": this.state.commentContent, "post": `${config.url}/posts/${this.props.id}/`}

        fetch(`${config.url}/comments/`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
                'Content-type': 'application/json'
            }),
            method: 'POST',
			body: JSON.stringify(postData),
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
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
            <div style={{marginLeft: "1.2%"}}>
                <br />
                <Input action={{content: 'Comment', onClick: this.handleCommentSubmit}} placeholder='Write a Comment...' onChange={this.handleCommentChange} />
                <Comment.Group >
                    {comments}
                </Comment.Group>
            </div>
        )
    }
}