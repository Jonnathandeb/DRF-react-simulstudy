import React, {Component} from 'react'

export default class ReadableTime extends Component {
    render () {
        let totalSeconds = this.props.seconds

        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        if (days) {
            return <span>About {days} days(s) ago</span>
        }
        else if (hours) {
            return <span>About {hours} hour(s) ago</span>
        }
        else if (minutes) {
            return <span>About {minutes} minute(s) ago</span>
        }
        else {
            return <span>About {seconds} second(s) ago</span>
        }
    }
}