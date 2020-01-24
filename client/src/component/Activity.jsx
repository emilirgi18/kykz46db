import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class Activity extends Component{

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
            <div className="px-1 py-1 border-top border-bottom rounded-lg border-dark my-1">
                <div className="row">
                    <div className="col-3 d-flex align-self-center">
                        <button className="btn btn-danger btn-sm" onClick={this.props.deleteThis}>Delete</button>
                    </div>
                    <div className="col-4  d-flex align-self-center">
                        <div className="row">
                            <div className="col">{this.state.date}</div>
                            <div className="col">[{this.props.activities.type}]</div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="row pr-3">
                            <p className="font-weight-bolder">{this.props.activities.text}</p>
                        </div>
                        <div className="row pr-3">
                            <p className="font-weight-lighter">{this.props.activities.members}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}