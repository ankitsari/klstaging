import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
import { Select } from 'antd';
import axios from 'axios';
import BaseUrl from '../config/properties';

require('../styles/dayinlife.css');

class MessageDIL extends React.Component {
	
	constructor(props) {
	    super(props);
		//console.log(this.props.careerpath);
		this.state = {
			data:[],
		};
	 }

	componentDidMount() {
		//console.log(this.props.careerpath)
       axios.get(BaseUrl.base_url+"/api/v1/CareerPaths/Name/"+this.props.careerpath+"/DayInTheLifeAccounts?start=1").then((response)=>{
        	console.log(response.data.dayInTheLifeAccountsList);
            this.setState({ 
            	data: response.data.dayInTheLifeAccountsList
            });
        })
   }
	renderResponse(obj,index) {
		var userId = obj.accountCreatedBy_UserId;
		var dp ='graph.facebook.com/'+userId+'/picture';
		return(
			<div className="col-md-6 col-sm-6 col-xs-12 resp_Secb" key={index}>
				<div className="resp_Seca">
					<div className="col-md-12 col-sm-12 col-xs-12">
						 <div className="img_respo">
						 {/*{obj.accountCreatedBy_UserId!=null ? <img className="image_shp" src = {dp} /> : <img className="image_shp" src ="http://54.82.248.231/knowledge-locker/client/images/shape.png" /> }*/}
							<img className="image_shp" src ="http://54.82.248.231/knowledge-locker/client/images/shape.png" />
						 </div>
						 <div className="imgtxt_respo">
							<span className="rep_wrap">{obj.accountCreatedBy_UserName}</span>
							<span className="rep_wrapb">{obj.accountEntryTimestamp}</span>
						 </div>
					</div>
					<div className="col-md-12 col-sm-12 col-xs-12">
						<p className="text_bloom">{obj.dayInTheLifeAccount_Description}</p>
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

export default MessageDIL;

