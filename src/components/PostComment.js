import React, {Component} from 'react'
import { Comment, Dimmer, Loader } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import ReadableTime from "./ReadableTime"

export default class PostComment extends Component {
	state = {
		isLoading: true,
		data: [],
		width: window.innerWidth,
	}

	loadCommentData() {
        this.setState({ isLoading: true, })
        
        let url = this.props.subComment ? `http://localhost:8000/subcomments/${this.props.id}/` : `http://localhost:8000/comments/${this.props.id}/`;

        fetch(url)
		.then(res => res.json())
		.then((data) => {
			this.setState({isLoading: false, data: data})
            this.loadUserData(this.state.data.user)
            if (!this.props.subComment) {
                this.loadSubComments(`http://localhost:8000/comments_for_comment/?comment_id=${this.props.id}`)
            }
            else {
                //this.loadSubComments(`http://localhost:8000/comments_for_subcomment/?comment_id=${this.props.id}`)
                this.setState((prevState) => {
                    let dataArr = prevState.data;
                    dataArr.subcomments = [];
                    return {isLoading: false, data: dataArr};
                })
            }
		})
    }
    
    loadUserData(url) {
		this.setState({ isLoading: true, })

		fetch(url)
		.then(res => res.json())
		.then((data) => {
			this.setState((prevState) => {
				let dataArr = prevState.data;
                dataArr.username = data.username;
				return {isLoading: false, data: dataArr};
			})
		})
    }
    
    loadSubComments(url) {
        this.setState({ isLoading: true, })

		fetch(url)
		.then(res => res.json())
		.then((data) => {
			this.setState((prevState) => {
				let dataArr = prevState.data;
                dataArr.subcomments = data;
				return {isLoading: false, data: dataArr};
			})
		})
    }

	componentDidMount() {
		this.loadCommentData()
	}

	render() {
        let comment = {};
        let subcomments = [];
		let commentContent;
		if (!this.state.isLoading && this.state.data.subcomments) {
            commentContent = null;
            comment = this.state.data;
            comment.username_id = this.state.data.user.slice(this.state.data.user.indexOf("/users/") + 7);

            
            for (let i = 0; i < this.state.data.subcomments.length; i++) {
                let subcommentId = this.state.data.subcomments[i].url.slice(this.state.data.subcomments[i].url.indexOf("/subcomments/") + 13, this.state.data.subcomments[i].url.length - 1)
                subcomments.push(<PostComment id={subcommentId} subComment={true} />)
            }
		}
		else {
			commentContent = (
				<Dimmer active>
					<Loader />
				</Dimmer>
			)
		}

		return (
            <Comment>
                {commentContent}
                <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.username_id}`}>{comment.username}</Comment.Author>
                <Comment.Metadata>
                    <ReadableTime seconds={comment.time_from_now} />
                </Comment.Metadata>
                <Comment.Text>{this.state.data.content}</Comment.Text>
                <Comment.Actions>
                    <a>Reply</a>
                </Comment.Actions>
                </Comment.Content>

                <Comment.Group>
                    {subcomments}
                </Comment.Group>
            </Comment>
		)
	}
}