import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Test extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			name:"anil"
		};
	}
	changeName() {
		this.setState({
			name: "preethi"
		})
	}
	

	render() {
    	return (
			<h1>Hello, {this.changeName()}</h1>
			{this.state.name}
    	);
  }

}



export default Test;