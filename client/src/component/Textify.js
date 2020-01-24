import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from "react";

export default class Textify extends Component{

    constructor(props) {
        super(props);

        this.state = ({
            date: '',
        })
    };

    componentDidMount() {

        //console.log(this.props.activities.date)

        var p = new Date(this.props.activities.date)
        var month = p.getMonth()+1
        if(month<10){month="0"+month}
        var day = p.getDate()
        if(day<10){day="0"+day}

        this.setState({
            date: '('+month+'/'+day+')',
        })
    }

    render(){
        return(
            <div>[{this.props.activities.type}] • {this.state.date} {this.props.activities.text} - {this.props.activities.members}</div>
        )
    }
}