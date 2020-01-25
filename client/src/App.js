import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NewActivity from "./component/NewActivity";
import Filter from './component/Filter';
import Activity from "./component/Activity";
import Textify from "./component/Textify"
import Axios from 'axios';
import { } from 'bootstrap'

//const db = require('mongoose');


export default class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      range : 'false',
      payload: {},
      showNewActivity: false,
      showFilter: false,
      showTextify: false,
      pData: [],

    };
  }

  componentDidMount() {
    var date = new Date()
    var datePlaceholder
    if(date){
      var month = parseInt(date.getMonth(),10)+1
      if(month<10){month="0"+month}
      var day = parseInt(date.getDate(),10)
      if(day<10){day="0"+day}
      datePlaceholder = date.getFullYear()+"-"+month+"-"+day;
    }
    var body = {
        d1: datePlaceholder,
        d2: '',
        sort: 'date',
        by: '-1'
    }
    this.handleFilter(body)
  }

  reset = () => {
    this.setState({
      showFilter: false,
      showNewActivity: false,
      showTextify: false,
    })
  }

  handleFilter = (payload) => {
    Axios.post(`http://kykz46db.herokuapp.com/api/get`, JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
        .then(response => {
          //console.log(response)
          //alert("Activities received!")
          if(response.data.length){
            this.setState({
              pData: response.data,
              showFilter: false,
            })
            //console.log(response.data)
          }
          else {alert("No Data Found!")}
          //this.props.data(response.data);
        })
        .catch(error => {
          //console.log(error.response)
          alert("Activity fail to receive!")
        });
    this.setState({
      showFilter: false,
    })
  }

  deleteThis = id => {
    if(window.confirm('Are you sure?')){
      this.setState({
        pData: this.state.pData.filter(activity => activity._id !== id)
      })
      //console.log(id)
      Axios.post('http://kykz46db.herokuapp.com/api/hapus', {
        _id: id,
      }, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        }
      })
    }

  }

  addThis = payload => {
    //console.log(payload)
    Axios.post('http://kykz46db.herokuapp.com/api/add', payload, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
        .then(response => {
          //console.log(response)
          alert("Activity added!")
        })
        .catch(error => {
          //console.log(error.response)
          alert("Activity fail to add!")
        });
    this.reset()
    this.componentDidMount()
  }

  NewActivityClicked = () => {
    if(this.state.showNewActivity){this.setState({
      showNewActivity: false,
    })}else{this.setState({
      showNewActivity: true,
      showFilter: false,
      showTextify: false,
    })}
  }

  FilterClicked = () => {
    this.state.showFilter ? this.setState({
      showFilter: false,
    }) : this.setState({
      showFilter: true,
    })
    this.setState ({
      showNewActivity: false,
      showTextify: false,
    })
  }

  textify = () => {
    this.state.showTextify ? this.setState({
      showTextify: false,
    }) : this.setState({
      showTextify: true,
    })
    this.setState ({
      showNewActivity: false,
      showFilter: false,
    })
  }


  render() {
    return (
        <div className="App container-md bg-gradient-light">
          <br/>
          <div className="row justify-content-center">
            <div className="col">
              <header className="App-header">
                <h1 className="text-center">Keyakizaka46 Activity Database</h1>
                <hr />
                <button
                    onClick={this.FilterClicked.bind(this)}
                    className="btn btn-primary btn-sm mx-2 mb-2"
                >Find Activity</button>
                <button
                    onClick={this.NewActivityClicked.bind(this)}
                    className="btn btn-secondary btn-sm mx-2 mb-2"
                >Add Activity
                </button>
                  <button type="button" className="btn btn-secondary btn-sm mx-2 mb-2" data-toggle="modal" data-target="#staticBackdrop">
                      About
                  </button>
                {this.state.pData.length? (
                    <button
                      onClick={this.textify.bind(this)}
                      className="btn btn-info btn-sm mx-2 mb-2"
                    >Textify</button>
                ) : null}
                {this.state.showNewActivity ? <NewActivity onSubmit={this.addThis} /> : null}
                {this.state.showFilter ? <Filter onRange={this.onRange} onSubmit={this.handleFilter}/> : null}
              </header>
              <br/>
              {this.state.showTextify?
                  (<div className="">
                    {this.state.pData.map(activities => (
                      <Textify key={activities._id} activities={activities} />
                    ))}
                  </div>)
                  : null
              }
              <div className="justify-content-center">{this.state.pData.map(activities => (
                <Activity key={activities._id} activities={activities} deleteThis={() => this.deleteThis(activities._id)}/>
                ))}
              </div>
            </div>
          </div>
          <div className="modal fade" id="staticBackdrop" data-backdrop="static" tabIndex="-1" role="dialog"
               aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">About this app</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  Hello There!
                  I am Irgi, also known as <a target="_blank" rel="noopener noreferrer" href="https://www.twitter.com/subjecteighteen">@subjecteighteen</a>.
                  This app is made to make easier for <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/shuukankeyaki">Shuukan Keyaki</a> Team to recap Keyaki's activities.
                  If you have any suggestions/anything to say, just mention me. Thanks!
                    <hr />
                    You can install this webapp in your phone like a native Android (and <b>maybe</b> iOS) app by clicking 'Add to Home Screen' as shown below.
                    <img src="webapp.jpg" alt="How to install webapp" className="img-fluid"></img>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
