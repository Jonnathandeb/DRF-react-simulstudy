import React, {Component} from 'react'
import { Comment, Form, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ReadableTime from "./ReadableTime";
import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";

export default class CommentTemplate extends Component {
    state = {
        hideReply: true,
        subcommentContent: null,
        submittedSubcommentContent: null,
    }

    handleSubcommentContentChange = (e, { value }) => {
        this.setState({subcommentContent: value})
    }

    handleSubcommentSubmit = () => {
        this.setState({submittedSubcommentContent: this.state.subcommentContent})

        let postData = {"content": this.state.subcommentContent, "comment": `${config.url}/comments/${this.props.data.comment_id}/`}

        fetch(`${config.url}/subcomments/`,{
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

	render() {
        let subCommentGroup = null;
        let commentActions = null;

        if (this.props.isParent) {
            let subcomments = []
            
            for (let i = 0; i < this.props.subCommentData.length; i++) {
                subcomments.push(<CommentTemplate data={this.props.subCommentData[i]} />)
            }

            subCommentGroup = 
            (<Comment.Group>
                {subcomments}
            </Comment.Group>)

            commentActions =
            (
                <div>
                    <Comment.Actions>
                        <a onClick={() => {this.setState((prevState) => {return {hideReply: !prevState.hideReply}})}}>Reply</a>
                    </Comment.Actions>
                    <Form reply hidden={this.state.hideReply}>
                        <Form.TextArea onChange={this.handleSubcommentContentChange} />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={this.handleSubcommentSubmit} />
                    </Form>
                </div>
            )
        }

		return (
            <Comment key={this.props.data.comment_id}>
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${this.props.data.comment_user_id}`}>{this.props.data.comment_user_username}</Comment.Author>
                <Comment.Metadata>
                    <ReadableTime seconds={this.props.data.comment_post_time} />
                </Comment.Metadata>
                <Comment.Text>{this.props.data.comment_content}</Comment.Text>
                {commentActions}
                </Comment.Content>
                {subCommentGroup}
            </Comment>
        )
	}
}