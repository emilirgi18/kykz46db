import React, { Component } from 'react';
//import Axios from "axios";
import DatePicker0 from 'react-datepicker';
import DatePicker2 from 'react-datepicker';

//import { Activities } from '../api/activities.js';


// NewActivity component - To insert new Activity to DB
export default class Filter extends Component {

    constructor(props) {
        super(props);

        this.onChangeRanged = this.onChangeRanged.bind(this);
        this.onChangeOneWay = this.onChangeOneWay.bind(this);
        this.onChangeFromDate = this.onChangeFromDate.bind(this);
        this.onChangeToDate = this.onChangeToDate.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeMembers = this.onChangeMembers.bind(this);
        this.onChangeSort = this.onChangeSort.bind(this);
        this.onChangeBy = this.onChangeBy.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            range: 'false',
            activityType: '',
            text: '',
            members: '',
            fromDate: '',
            toDate: '',
            sort: 'date',
            by: '-1',
        }

    };

    onChangeBy(e) {
        this.setState( {
            by: e.target.value
        })
    }

    onChangeSort(e) {
        this.setState({
            sort: e.target.value
        })
    }

    onChangeRanged(e) {
        this.setState({
            range: e.target.value,
        })
    }

    onChangeOneWay(e) {
        this.setState({
            range: e.target.value
        })
    }

    onChangeFromDate(date) {
        this.setState({
            fromDate: date
        });
    }

    onChangeToDate(date) {
        this.setState({
            toDate: date
        });
    }

    onChangeType(e) {
        this.setState({
            activityType: e.target.value
        });
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    onChangeMembers(e) {
        this.setState({
            members: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        var time1=''
        var time2=''

        if (this.state.fromDate){
            var month1 = parseInt(this.state.fromDate.getMonth(),10)+1
            if(month1<10){month1="0"+month1}
            var day1 = parseInt(this.state.fromDate.getDate(),10)
            if(day1<10){day1="0"+day1}
            var year1 = this.state.fromDate.getFullYear()
            console.log(new Date(year1+'-'+month1+'-'+day1))
            time1 = new Date(year1+"-"+month1+"-"+day1+"T00:00:00Z")
        }

        if (this.state.toDate){
            var month2 = parseInt(this.state.toDate.getMonth(),10)+1
            if(month2<10){month2="0"+month2}
            var day2 = parseInt(this.state.toDate.getDate(),10)+1
            if(day2<10){day2="0"+day2}
            var year2 = this.state.toDate.getFullYear()
            time2 = new Date(year2+"-"+month2+"-"+day2+"T00:00:00Z")
        }

        var body = {
            d1: time1,
            d2: time2,
            type: this.state.activityType,
            text: this.state.text,
            members: this.state.members,
            sort: this.state.sort,
            by: this.state.by
        };

        this.props.onSubmit(body)

        console.log(body)
    }

	render() {
		return (
		    <div className="new-activity border border-dark p-2 m-2 rounded col container-fluid">
                <h3>Search Activities!</h3>
                <form className="form-check new-activity" autoComplete="off" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <small className="form-text text-muted">Leave it blank to get the latest 100 activities!</small>
                    </div>
                    <div className="form-inline">
                        <div className="form-group">
                            <input
                                name='i11'
                                type="radio"
                                value='false'
                                checked={this.state.range === 'false'}
                                onChange={this.onChangeOneWay}
                                placeholder="One-Day"
                            />
                            <label htmlFor="i11">One-Day</label>
                        </div>&nbsp; &nbsp;
                        <div className="form-group">
                            <input
                                name="i12"
                                type="radio"
                                value='true'
                                checked={this.state.range === 'true'}
                                onChange={this.onChangeRanged}
                                placeholder="From-To"
                            />
                            <label htmlFor="i12">From-To</label>
                        </div>
                    </div>
                     <div className="form-group">
                         {this.state.range === 'true'? (<div>From:<br/></div>) : (<div>Pick a date:<br /></div>)}
                         <DatePicker0
                             selected={this.state.fromDate}
                             onChange={this.onChangeFromDate}
                         />
                         <br/>
                     </div>
                    {this.state.range === 'true' ?
                        (<div>
                            To :<br />
                            <DatePicker2
                                selected={this.state.toDate}
                                onChange={this.onChangeToDate}
                            />
                            <br />
                        </div>) : null
                    }
                    <div className="form-check form-check-inline">
                        <input
                            name="i1"
                            className="form-check-input"
                            type="radio"
                            value="Birthday"
                            checked={this.state.activityType === 'Birthday'}
                            onChange={this.onChangeType}
                            placeholder="Birthday"
                        />
                        <label htmlFor="i1" className="form-check-label">Birthday</label>&nbsp;
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            name="i2"
                            className="form-check-input"
                            type="radio"
                            value="Event"
                            checked={this.state.activityType === 'Event'}
                            onChange={this.onChangeType}
                            placeholder="Event"
                        />
                        <label htmlFor="i2" className="form-check-label">Event</label>&nbsp;
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            name="i3"
                            className="form-check-input"
                            type="radio"
                            value="Magazines"
                            checked={this.state.activityType === 'Magazines'}
                            onChange={this.onChangeType}
                            placeholder="Magazines"
                        />
                        <label htmlFor="i3" className="form-check-label">Magazines</label>&nbsp;
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            name="i4"
                            className="form-check-input"
                            type="radio"
                            value="Newspaper"
                            checked={this.state.activityType === 'Newspaper'}
                            onChange={this.onChangeType}
                            placeholder="Newspaper"
                        />
                        <label htmlFor="i4" className="form-check-label">Newspaper</label>&nbsp;
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            name="i5"
                            className="form-check-input"
                            type="radio"
                            value="Radio"
                            checked={this.state.activityType === 'Radio'}
                            onChange={this.onChangeType}
                            placeholder="Radio"
                        />
                        <label htmlFor="i5" className="form-check-label">Radio</label>&nbsp;
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            name="i6"
                            className="form-check-input"
                            type="radio"
                            value="Showroom"
                            checked={this.state.activityType === 'Showroom'}
                            onChange={this.onChangeType}
                            placeholder="Showroom"
                        />
                        <label htmlFor="i6" className="form-check-label">Showroom</label>&nbsp;
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            name="i7"
                            className="form-check-input"
                            type="radio"
                            value="TV"
                            checked={this.state.activityType === 'TV'}
                            onChange={this.onChangeType}
                            placeholder="TV"
                        />
                        <label htmlFor="i7" className="form-check-label">TV</label><br/>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            ref="activities"
                            placeholder="What kind of activity?"
                            onChange={this.onChangeText}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            ref="members"
                            placeholder="Who is/are involved?"
                            onChange={this.onChangeMembers}
                        />
                    </div>
                    <div className="form-group">
                        <label>Sort by:</label>
                        <br />
                        <select className="custom-select-sm" onChange={this.onChangeSort}>
                            <option value="date">Date</option>
                            <option value="type">Type</option>
                        </select>
                        <select className="custom-select-sm" onChange={this.onChangeBy}>
                            <option value='-1'>Descending</option>
                            <option value="1">Ascending</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit"/>
                    </div>
                </form>
            </div>
		);
	}
}
