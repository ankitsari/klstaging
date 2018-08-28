import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
import axios from 'axios';
import BaseUrl from '../config/properties';

require('../styles/ad.css');
//const adImage=require('https://s3.amazonaws.com/klockerimg/shape.png');

class Advertisement extends React.Component {
	constructor(props) {
	    super(props);
		this.state = {
			data:[]
		};
	}
	componentDidMount() {
		//console.log(this.props.careerpath)
       axios.get(BaseUrl.base_url+"/api/v1/recommended/sponsoredlinks").then((response)=>{
        	console.log(response.data.sponsoredContentList);
            this.setState({ 
            	data: response.data.sponsoredContentList
            });
        })
   }
	  renderResponse(obj,index) {
        return (
        	<div className="col-md-4 col-sm-4 col-xs-12" key={index}>
				<div className="col-md-12 col-sm-12 col-xs-12 no-padding shadow">
					<div className="col-md-4 col-sm-4 col-xs-3 no-padding img_div">
						<img src ="https://s3.amazonaws.com/klockerimg/group-13.png" />
					</div>
					<div className="col-md-8 col-sm-8 col-xs-9">
						<a href={obj.content_URL}><p className="ad_desc"><b>{obj.content_Title}</b></p></a>
						{/*<a href={obj.content_URL}><p className="ad_desc">{obj.content_Description}</p></a>*/}
					</div>
				</div>
			</div>
		)
	  }
		render () {
		return (
			<div>
				<div>
					{this.state.data.map((obj,index) => {
						return this.renderResponse(obj,index)
					})}
					
				</div>
			</div>
		)
	}
}

export default Advertisement;