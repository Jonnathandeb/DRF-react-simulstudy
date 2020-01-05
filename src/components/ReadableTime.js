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
            return <div>About {days} days(s) ago</div>
        }
        else if (hours) {
            return <div>About {hours} hour(s) ago</div>
        }
        else if (minutes) {
            return <div>About {minutes} minute(s) ago</div>
        }
        else {
            return <div>About {seconds} second(s) ago</div>
        }
    }
}