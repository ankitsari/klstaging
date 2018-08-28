import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
require('../styles/header.css');
import SweetAlert from 'sweetalert-react';
import Properties from '../helper/constant';
import BaseUrl from '../config/properties';
import axios from "axios";
const logo='https://s3.amazonaws.com/klockerimg/KL-Logo.png';
var isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
console.log({isLoggedIn111:isLoggedIn})
function FacebookTab (props){
		return(<Link onClick={props.handleClick} className="header-nav-item" id="facebook_login"><i className="fa fa-facebook" aria-hidden="true"></i>&nbsp;Login with Facebook</Link>)
}

function ProfileTab (props){
	console.log(props.userPic)
		//return(<Link className="header-nav-item" id="facebook_login"><i className="fa fa-facebook" aria-hidden="true"></i>&nbsp;{props.userName}</Link>)
		return(<li className="dropdown user_menu">
				    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
				    {props.userName}
				    <img src={props.userPic} className="profile-image img-circle"/></a>
				    <ul className="dropdown-menu">
						{/* <li><Link to="/myKnowledgeLocker"><i className="fa fa-cog"></i> Account</Link></li>
				        <li className="divider"></li> */}
				        <li><Link  onClick={props.logout} ><i className="fa fa-sign-out"></i> Sign out</Link></li>
				    </ul>
				</li>)  
}

function MobileMenuTab (props) {
	console.log('fgggfgggf');
	return (
		<div className="col-md-12 drop_down_menu" >
			<ul className="menu_expand">
				<li className="mobile_tabs first_tab"><Link to="/explorecareerpath" className="header-nav-item-mobile">Career Paths</Link></li>
				<li className="mobile_tabs"><Link to="/knowledgeblock" className="header-nav-item-mobile">Knowledge Blocks</Link></li>
				<li className="mobile_tabs"><Link className="header-nav-item-mobile" onClick={props.showLocker}>MyKnowledgeLocker</Link></li>
					{isLoggedIn?<li className="dropdown user_menu"><a href="#" className="dropdown-toggle" data-toggle="dropdown">{props.userName}<img src={props.userPic} className="profile-image img-circle mobile_image"/></a><ul className="dropdown-menu"><li><Link className="mobile_sign" onClick={props.logout} ><i className="fa fa-sign-out"></i> Sign out</Link></li></ul></li>:<Link onClick={props.handleClick} className="header-nav-item" id="facebook_login_mobile"><i className="fa fa-facebook" aria-hidden="true"></i>&nbsp;Login with Facebook</Link>}
			</ul>
		</div>
		)
	}


class Header extends React.Component { 
	constructor(props) {
		super(props);	
		this.state={userName : ''} 
		this.state={isLoggedIn : ''}
		this.state={userPic : ''} 
		this.state={showMobileMenu : false}
		this.state={knowledgeLockerShow:false}
	}

	componentDidMount() {
		//this.state={isLoggedIn : false}
		this.setState({isLoggedIn : false,userName : 'Login with Facebook'});
	   	if (isLoggedIn == true)  {
			 let userData = JSON.parse(localStorage.getItem('userData'));
			 let userPic = userData.picture.data.url;
			 userData = userData.name;
			 this.setState({userName : userData,isLoggedIn: true,userPic : userPic});
		}
	    window.fbAsyncInit = function() {
	        FB.init({
	          appId      : Properties.Facebook_App_id,
	          cookie     : true,
	          xfbml      : true,
	          version    : 'v2.11'
	        });
	          
	        FB.AppEvents.logPageView();        
	    };

	    (function(d, s, id){
		       var js, fjs = d.getElementsByTagName(s)[0];
		       if (d.getElementById(id)) {return;}
		       js = d.createElement(s); js.id = id;
		       js.src = "https://connect.facebook.net/en_US/sdk.js";
		       fjs.parentNode.insertBefore(js, fjs);
	     }(document, 'script', 'facebook-jssdk'));
	    
	}

	
	handleClick() {
				FB.getLoginStatus(function(response) {
			     if (response.status == 'connected') {
			     	  let accessToken = response.authResponse.accessToken;
			          console.log('Welcome!');
			          FB.api('/me', {fields: 'id,name,email,picture.width(800).height(800),location'}, function(response) {
			          	console.log({fb:response})
					 	this.state={userName : "Welcome! "+response.name,isLoggedIn: true};
			          	localStorage.setItem('userData', JSON.stringify(response));
						axios.post(BaseUrl.base_url+"/api/v1/login?accessToken="+accessToken+"&loginMode=facebook&userEmail="+response.email).then((klResponse)=>{
							console.log({KL:klResponse.data.authToken})
							localStorage.setItem('authToken', klResponse.data.authToken);
							localStorage.setItem('isLoggedIn', JSON.stringify(true));
							window.location.reload(); 
						});
			          });
			        } else {
			        	console.log('Login!');
			            FB.login(function(response) {
			            	let accessToken = response.authResponse.accessToken;
							FB.api('/me', {fields: 'id,name,email,picture.width(800).height(800),location'}, function(response) {
								this.state={userName : "Welcome! "+response.name,isLoggedIn: true};
								localStorage.setItem('userData', JSON.stringify(response));
								axios.post(BaseUrl.base_url+"/api/v1/login?accessToken="+accessToken+"&loginMode=facebook&userEmail="+response.email).then((klResponse)=>{
								console.log({KL:klResponse.data.authToken});
								localStorage.setItem('authToken', klResponse.data.authToken);	
								localStorage.setItem('isLoggedIn', JSON.stringify(true));
								window.location.reload(); 
								});
							});
			            }, {scope: 'email'});
			        }
			  });
	}
		
	
	mobileMenu () {
		console.log('fggggggg');
		this.setState({showMobileMenu:!this.state.showMobileMenu});
		/*this.state={showMobileMenu : true}*/
	}
	
	NoMenu () {
		console.log('ddddddd');
		return (<div></div>)
	}
	
	knowledgeLockerShow () {
		if(this.state.isLoggedIn) {
			window.location.href = "/myKnowledgeLocker";
		}
		else {
			this.setState({ knowledgeLockerShow: true });
		}
	}
	
	logout(){
		localStorage.setItem('authToken', '');
		localStorage.setItem('isLoggedIn', JSON.stringify(false));
		localStorage.setItem('userData', []);
		window.location.href = "/"; 
	}

	render() {
		//this.fun();
		console.log({test:this.state.isLoggedIn})
		return (
			
			<div className="row">
				<SweetAlert
					show={this.state.knowledgeLockerShow}
					title="Wait"
					type="warning"
					text="You need to login in order to Access this feature!"
					onConfirm={() => this.setState({ knowledgeLockerShow: false })}
				/>
				<div className="col-md-12 col-sm-12 col-xs-hidden header-main">
					<div className="col-md-3 col-sm-3">
						<Link to="/" className="header-nav-item"><img src={logo}/></Link>
					</div>
					<div className="col-md-9 col-sm-9">
						<div className="header-nav">
							<Link className="header-nav-item" onClick={()=>this.knowledgeLockerShow()}>My Settings</Link>
							
							{this.state.isLoggedIn?<ProfileTab
													userPic={this.state.userPic}
													userName={this.state.userName}
													logout = {() => this.logout()}
													/>:
													<FacebookTab 
													handleClick={() => this.handleClick()}
													/>
							}
						</div>
					</div>
				</div>
				<div className="col-md-hidden col-sm-hidden col-xs-12 mobile_heading">
					<div className="col-md-4 col-xs-4 mobile_logo">
						<Link to="/" className="header-nav-item">Knowledge<b>Locker</b></Link>
					</div>
					<div className="col-md-8 col-xs-8 mobile_nav">
						<span id="menu_navigation"><Link  className="mobile_hamburger" onClick={() => this.mobileMenu()} >{this.state.showMobileMenu?<i className="fa fa-times" aria-hidden="true"></i>:<i className="fa fa-bars"></i>}</Link></span>
					</div>
					{this.state.showMobileMenu?<MobileMenuTab
													userPic={this.state.userPic}
													userName={this.state.userName}
													logout = {() => this.logout()}
													handleClick={() => this.handleClick()}
													showLocker={() => this.knowledgeLockerShow()}
													/>:this.NoMenu()
						
					}
				</div>
			</div>
		);
	}
}

export default Header;