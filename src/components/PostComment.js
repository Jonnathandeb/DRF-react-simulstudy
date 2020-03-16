import React, {Component} from 'react'
import { getSession } from "../utils/cookie_manager";
import CommentTemplate from "./CommentTemplate"

import config from "../api_config.json";

export default class PostComment extends Component {
	state = {
		isLoading: true,
        subCommentData: null,
		width: window.innerWidth,
	}

	componentDidMount() {
        this.loadSubComments(this.props.data.comment_id)
    }
    
    loadSubComments(id) {
        fetch(`${config.url}/comment_data_for_comment/?comment_id=${id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({isLoading: false, subCommentData: data})
        })
    }

	render() {
        if (this.state.isLoading && !this.state.subCommentData) {
            return <div>Loading Comments ...</div>
		}

		return (
            <CommentTemplate data={this.props.data} isParent={true} subCommentData={this.state.subCommentData} />
		)
	}
}