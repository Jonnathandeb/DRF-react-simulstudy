import React, {Component} from 'react'
import { Comment, Form, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ReadableTime from "./ReadableTime";

export default class CommentTemplate extends Component {
    state = {
        hideReply: true,
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
                        <Form.TextArea />
                        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
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