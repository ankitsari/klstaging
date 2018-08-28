import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
class Main extends React.Component {
	render() {
         return (
            <div>
            	{React.cloneElement(this.props.children,this.props)}
            </div>
        )
    }
}

export default Main;