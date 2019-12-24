import React from 'react';
import moment from 'moment'

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <h6 style={{ color: '#0B175F',fontWeight: 'bold', fontStyle: 'italic' }}> {this.state.date.toLocaleTimeString()} {moment.tz.guess()}</h6>
        );
    }
}

export default Clock;