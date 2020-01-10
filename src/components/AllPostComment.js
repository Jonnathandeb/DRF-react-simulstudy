import React, {Component} from 'react'
import PostComment from "./PostComment"
import { Comment } from "semantic-ui-react"

export default class AllPostComment extends Component {
	state = {
		isLoading: true,
		data: [],
		width: window.innerWidth,
	}

	loadComments() {
        this.setState({ isLoading: true, })

        fetch(`http://localhost:8000/comments_for_post/?post_id=${this.props.id}`)
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
				let commentId = this.state.data[i].url.slice(this.state.data[i].url.indexOf("/comments/") + 10, this.state.data[i].url.length - 1);
				comments.push(<PostComment id={commentId} />)
            }
        }

        return (
			<Comment.Group style={{marginLeft: "1.2%"}}>
				{comments}
			</Comment.Group>
        )
    }
}