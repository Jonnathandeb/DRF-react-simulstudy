import React from 'react'
import { Button, Label } from 'semantic-ui-react'

class LikeAndDislike extends React.Component {
    loadPostLikes(id) {
        this.setState({ isLoading: true, })
    
        fetch(`${config.url}/likes_for_post/?post_id=${id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            this.setState((prevState) => {
                let dataArr = prevState.data;
                dataArr.like_count = data.length;
                return {isLoading: false, data: dataArr}
            })
        })
    }
    
    loadPostComments(id) {
        this.setState({ isLoading: true, })
    
        fetch(`${config.url}/comments_for_post/?post_id=${id}`,{
            headers: new Headers({
                'Authorization': 'Bearer  ' + getSession().jwt,
            }),
        })
        .then(res => res.json())
        .then((data) => {
            this.setState((prevState) => {
                let dataArr = prevState.data;
                dataArr.comment_count = data.length;
                return {isLoading: false, data: dataArr}
            })
        })
    }

    render() {
        return (
            <div>
                <Button as='div' labelPosition='right'>
                    <Button color={isLiked[1]}>
                        <Icon name='heart' />
                        {isLiked[0]}
                    </Button>
                    <Label as='a' basic color={isLiked[1]} pointing='left'>
                        {post.like_count}
                    </Label>
                </Button>
            </div>
        )
    }
}

export default LikeAndDislike;