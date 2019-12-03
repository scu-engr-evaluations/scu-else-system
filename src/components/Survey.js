import React, { Component } from "react";
import { Form, Table, Row, Col, Button, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

/*var types = ["RR", "RR", "RR", "RR", "TR", "TR", "RR", "RR", "RR", "RR","RR", "TR", "RR", "RR", "RR", "TR", "DR", "DR", "DR", "TR"];
var questionTexts = [
  "The labs helped me understand the lecture material. (An answer of 3 is neutral)",
  "The labs taught me new skills. (An answer of 3 is neutral)",
  "The labs taught me to think creatively. (An answer of 3 is neutral)",
  "I would be able to repeat the labs without help. (An answer of 3 is neutral)",
  "What was your favorite aspect of the lab?",
  "What about the lab would you like to see improved?",
  "The lab instructor was supportive. (An answer of 3 is neutral)",
  "The lab instructor was approachable. (An answer of 3 is neutral)",
  "The lab instructor was able to answer my questions. (An answer of 3 is neutral)",
  "The lab instructor helped me reach a clear understanding of key concepts. (An answer of 3 is neutral)",
  "The lab instructor fostered a mutually respectful learning environment. (An answer of 3 is neutral)",
  "What, if anything, could the lab instructor do to improve the experience?",
  "The amount of lab equipmentwas sufficient. (An answer of 3 is neutral)",
  "The available space was sufficient for the lab activities. (An answer of 3 is neutral)",
  "If lab equipment or setups were not functioning properly, adequate support was available to rectify the situation. (An answer of 3 is neutral",
  "What, if anything, could improve lab space and equipment?",
  "On average, the approximate number of hours completing a lab was:",
  "How many hours did you spend preparing for the lab?",
  "How many hours did you spend writing lab reports outside the designated lab period?",
  "What feedback would you give the lecture section instructor (not the lab TA) about the labs?",
];*/
var data=[];
var values=[];
function QuestionList(props) {
		let entries = [];
		entries=data.map(function(d,i){
			switch(d.questionType) {
				case 'RR':
          values[i]='1';
					return <RR key={i} index={i} id= {d.id} question={d.prompt}/>;
				case 'FR':
          values[i]='';
					return <TR key={i} index={i} id= {d.id} question={d.prompt}/>;
				case 'DR':
          values[i]='1';
					return <DR key={i} index={i} id= {d.id} question={d.prompt}/>;
				default:
					return null;
				};
		}
		);

  return (
    <ol>{entries}</ol>
  );
}
class Answer extends Component {
  constructor(props) {
    super(props)
    this.state = {
        id:'',
        type:'',
        prompt:'',
        value:'',
    }
  }
}
class Response extends Component{
  constructor(props) {
    super(props)
    this.state ={
      course:'',
      student:'',
      inputs:[],
    }
  }
}
class Survey extends Component {
	constructor(props) {
		super(props)
		this.state = {
        questions:[],
        course:'',
        student:'',
        answers:[],
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
  componentDidMount(props) {
    axios.get("https://scu-else-system.herokuapp.com/api/")
      .then(res => {
        data=res.data.map((entry)=>entry)
        this.setState({
					questions: data
				});
      })
  }
  handleFormSubmit  = (event) => {
		event.preventDefault();
		axios.post("https://scu-else-system.herokuapp.com/responses/", {
      //JSON.stringify(this.state)
		})
		.then(res => {
      data=res.data.map((entry)=>entry)
      console.log(res.data)
    })
		.catch(error => console.err(error));
	}
  handleSubmit = (event) => {
    event.preventDefault()
    let answers1=[]
    answers1=data.map(function(d,i){
      return <Answer key={i} id={d.id} type={d.questionType} prompt={d.prompt} value={values[i]}/>
    })
  this.state.answers=answers1
    console.log(JSON.stringify(this.state.answers))
    /*axios.put("http://127.0.0.1:8000/responses/", {
      answers:this.state.answers,
		})*/
    axios({
      method: 'put',
      url: 'https://scu-else-system.herokuapp.com/responses/',
      data: {
        answer: this.state.answers,
      }
    });
  }
  /*handleSubmit(event) {
    let answers1=[]
    answers1=data.map(function(d,i){
      return <Answer key={i} id={d.id} type={d.questionType} prompt={d.prompt} value={values[i]}/>
    })
  this.state.answers=answers1
  		fetch("survey",{
  			method: "POST",
  			body: JSON.stringify(this.state.answers),
  			headers:{
  				'Accept': 'application/json',
  				'Content-Type': 'application/json'
  			},
  		}).then(response =>{
  			response.json().then(data =>{
  				console.log ("Successful"+data);
  			})
      })
    }*/
	render() {
		return (
			<div className = "PageContainer">
				<h1 className = "PageHeader">
					TA Lab Survey
				</h1>
					<form className="container">
					<QuestionList/>

					<Button variant="red" onClick={this.handleSubmit}>Submit</Button>
					</form>
			</div>
		);
	}
}

class TR extends Component {
	constructor(props) {
			super(props);
			this.state = {index:"",id:"",question:"", value:""};
       this.handleChange = this.handleChange.bind(this);
		}
  handleChange(event) {
      this.setState({value: event.target.value});
      //console.log(this.props.index);
      values[this.props.index]=event.target.value;
      //console.log(values);
  }
	render(){
		return(
			<li>
				<label> {this.props.question}</label>
				<div style={group}>
					<textarea value={this.state.value} onChange={this.handleChange} rows="5" id="comment"></textarea>
				</div>
		</li>
	)
}
}
class DR extends Component {
	constructor(props) {
	    super(props);
	    this.state = {index:"",id:"",question:"", value: "1"};

	    this.handleChange = this.handleChange.bind(this);
	  }
	  handleChange(event,props) {
	    this.setState({value: event.target.value});
      //console.log(this.props.index);
      values[this.props.index]=event.target.value;
      //console.log(values);
	  }
	render(){
		return(
			<li>
				<label>{this.props.question}</label><br></br>
					<label>
	          Select:
	          <select value={this.state.value} onChange={this.handleChange}>
	            <option value="1">Less than 2</option>
	            <option value="2">2</option>
	            <option value="3">3</option>
	            <option value="4">More than 3</option>
	          </select>
	        </label>
			</li>
		);
	}
}

class RR extends Component {
	constructor(props) {
    super(props);
    this.state = {index:"",id:"", question: "", value: "1" };
  }
	handleOptionChange = changeEvent => {
	 this.setState({
		 selectedOption: changeEvent.target.value,
     value: changeEvent.target.value
	 });
   //console.log(this.props.index);
   values[this.props.index]=changeEvent.target.value;
   //console.log(values);
 };
render(){
		return(
			<li>
				<label>{this.props.question}</label>
				<div style={group}>
							<Row style={row}>
								<Col style={col}>Strongly Disagree</Col>
								<Col style={col}></Col>
								<Col style={col}>Neutral</Col>
								<Col style={col}></Col>
								<Col style={col}>Strongly Agree</Col>
							</Row>
						  <Row style={row}>
								<Col style={col}>
	                  <input
	                    type="radio"
	                    value="1"
	                    checked={this.state.selectedOption === "1"}
	                    onChange={this.handleOptionChange}
	                  />
	              </Col>
								<Col style={col}>
	                  <input
	                    type="radio"
	                    value="2"
	                    checked={this.state.selectedOption === "2"}
	                    onChange={this.handleOptionChange}
	                  />
	              </Col>
								<Col style={col}>
	                  <input
	                    type="radio"
	                    value="3"
	                    checked={this.state.selectedOption === "3"}
	                    onChange={this.handleOptionChange}
	                  />
	              </Col>
								<Col style={col}>
	                  <input
	                    type="radio"
	                    value="4"
	                    checked={this.state.selectedOption === "4"}
	                    onChange={this.handleOptionChange}
	                  />
	              </Col>
								<Col style={col}>
	                  <input
	                    type="radio"
	                    value="5"
	                    checked={this.state.selectedOption === "5"}
	                    onChange={this.handleOptionChange}
	                  />
	              </Col>
						  </Row>
				</div>
			</li>
		)
	}
}

var group = {
	margin: "2%",
	flexDirection: "column",
	alignItems: "center",
}

var spacing = {
	margin: "2%",
}

var col = {
	alignItems: "center",
	flexDirection: "column",
	textAlign: 'center',
}

var row = {
	alignItems: "center",
	flexDirection: "row",
	textAlign: 'center',
	justifyContent: 'space-around',
	margin: "2%",
}

export default Survey;
