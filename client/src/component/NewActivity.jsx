import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import Axios from 'axios';

//import ReactDOM from 'react-dom';
//import { Activities } from '../api/activities.js';

// Filter component - To filter activity with various variables
export default class NewActivity extends Component {

	constructor(props) {
		super(props);

		this.onChangeDate = this.onChangeDate.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeText = this.onChangeText.bind(this);
		this.onChangeMembers = this.onChangeMembers.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			date: new Date(),
			activityType: '',
			text: '',
			members: ''
		}

	};

	onChangeDate(date) {
		this.setState({
			date: date
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

		var month = parseInt(this.state.date.getMonth(),10)+1
		if(month<10){month="0"+month}
		var day = parseInt(this.state.date.getDate(),10)
		if(day<10){day="0"+day}
		var placeholder = this.state.date.getFullYear()+"-"+month+"-"+day+"T00:00:00Z";

		var payload = {
			date: placeholder,
			type: this.state.activityType,
			text: this.state.text,
			members: this.state.members,
		}

		//console.log(payload)
		//var data = data.push(payload)
		this.props.onSubmit(payload);
	}

	render()
	{
		return (
			<div className="border border-dark p-2 m-2 rounded">
				<h3>Add new Activity!</h3>
				<form className="form-check new-activity" autoComplete="off" onSubmit={this.onSubmit}>
					<div className="form-group">
						<small className="form-text text-muted">Please fill all the fields!</small>
					</div>
					<div className="form-group">
						<label htmlFor="datepick">Pick a date:</label>
						<br/>
						<DatePicker
							id="datepick"
							selected={this.state.date}
							onChange={this.onChangeDate}
						/>
					</div>
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
							placeholder="Type to add new activities"
							onChange={this.onChangeText}
						/>
					</div>
					<div className="form-group">
						<input
							type="text"
							ref="members"
							placeholder="Type to add members"
							onChange={this.onChangeMembers}
						/>
					</div>
					<div className="form-group">
						<input type="submit"/>
					</div>
				</form>
			</div>
		);
	}
}
