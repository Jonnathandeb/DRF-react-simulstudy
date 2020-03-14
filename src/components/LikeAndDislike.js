import React from 'react'
import { Button, Label, Icon } from 'semantic-ui-react'

import { getSession } from "../utils/cookie_manager";

import config from "../api_config.json";

class LikeAndDislike extends React.Component {
    state = {
        likeCount: 0,
        dislikeCount: 0,
        commentCount: 0,
        hasLiked: false,
        hasDisliked: false
    }

    loadPostLikes(id) {
        fetch(`${config.url}/likes_for_post/?post_id=${id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            if (data.detail) {
                console.log(data.detail)
            }
            else if (data.hasOwnProperty("likes") && data.hasOwnProperty("dislikes")) {
                this.setState({likeCount: data.likes, dislikeCount: data.dislikes})
            }
        })
    }

    loadUserLiked(id) {
        fetch(`${config.url}/user_liked/?post_id=${id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            if (data.detail) {
                console.log(data.detail)
            }
            else if (data.hasOwnProperty("has_liked") && data.hasOwnProperty("has_disliked")) {
                this.setState({hasLiked: data.has_liked, hasDisliked: data.has_disliked})
            }
        })
    }

    likePost(id, like_value) {
        let postData = {"value": like_value, "post": `${config.url}/posts/${id}/`};

        fetch(`${config.url}/postlikes/`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt, 
                'Content-Type': 'application/json',
            }), 
            method: 'post',
            body: JSON.stringify(postData),
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            if (res.success) {
                this.loadUserLiked(id)
                
                let likeCount = this.state.likeCount
                let dislikeCount = this.state.dislikeCount

                // if the user has not liked or disliked (new like)
                if (!this.state.hasLiked && !this.state.hasDisliked) {
                    likeCount += like_value === 1 ? 1 : 0;
                    dislikeCount += like_value === 2 ? 1 : 0;
                }
                // if the user liked the post
                else if (like_value === 1) {
                    likeCount++;
                    dislikeCount--;
                }
                // if the user disliked the post
                else if (like_value === 2) {
                    likeCount--;
                    dislikeCount++;
                }
                // if the user unliked or undisliked
                else if (like_value === 0) {
                    likeCount += this.state.hasLiked ? -1 : 0;
                    dislikeCount += this.state.hasDisliked ? -1 : 0;
                }

                this.setState({likeCount: likeCount, dislikeCount: dislikeCount})
            }
            else {
                // error liking / disliking
                console.log("there was an error processing the request")
            }
		})
    }

    componentDidMount() {
        let post_id = this.props.post_id

        if (!(post_id == null)) {
            this.loadPostLikes(post_id)
            this.loadUserLiked(post_id)
        }
    }

    render() {
        let likeColor = this.state.hasLiked ? "blue" : "gray";
        let likeText = this.state.hasLiked ? "Liked" : "Like";

        let dislikeColor = this.state.hasDisliked ? "blue" : "gray";
        let dislikeText = this.state.hasDisliked ? "Not Helpful" : "Not Helpful";

        return (
            <div>
                <Button as='div' labelPosition='right' onClick={() => {this.likePost(this.props.post_id, this.state.hasLiked ? 0 : 1)}}>
                    <Button>
                        <Icon name='thumbs up' color={likeColor} />
                        {likeText}
                    </Button>
                    <Label as='a' basic style={{"color": "lightred"}} pointing='left'>
                        {this.state.likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={() => {this.likePost(this.props.post_id, this.state.hasDisliked ? 0 : 2)}}>
                    <Button>
                        <Icon name='thumbs down' color={dislikeColor} />
                        {dislikeText}
                    </Button>
                    <Label as='a' basic pointing='left'>
                        {this.state.dislikeCount}
                    </Label>
                </Button>
            </div>
        )
    }
}

export default LikeAndDislike;