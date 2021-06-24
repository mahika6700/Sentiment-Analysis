import React, { Component } from 'react'

 class Try extends Component {

    constructor() {
        super();

        this.state = {
            mainStr: ''
        };
        this.eventHandler.bind = this.eventHandler.bind(this);
    }

    eventHandler = (e) => {
        this.setState({ mainStr: (this.mainStr += '\n' + e.type.toString())})
    };


    render() {
        return (
            <div onWheel={this.eventHandler}>
                PERFORM EVENTS HERE
                {this.state.mainStr}
            </div>
        );
    }
    }


export default Try
