import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
require('../styles/header.css');
import Properties from '../helper/constant';
import axios from "axios";
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

var isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
console.log({isLoggedIn111:isLoggedIn})
function FacebookTab (props){
		return(<Link onClick={props.handleClick} className="header-nav-item" id="facebook_login"><i className="fa fa-facebook" aria-hidden="true"></i>&nbsp;Login with Facebook</Link>)
}

function handleClick(e) {
  console.log('click', e);
}

function ProfileTab (props){
	console.log(props.userPic)
		//return(<Link className="header-nav-item" id="facebook_login"><i className="fa fa-facebook" aria-hidden="true"></i>&nbsp;{props.userName}</Link>)
		return(<li className="dropdown user_menu1">
				    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
				    {props.userName}
				    <img src={props.userPic} className="profile-image img-circle"/></a>
				    <ul className="dropdown-menu">
				        <li><Link to="/"><i className="fa fa-cog"></i> Account</Link></li>
				        <li className="divider"></li>
				        <li><Link  onClick={props.logout} ><i className="fa fa-sign-out"></i> Sign out</Link></li>
				    </ul>
				</li>)  
}

class Header extends React.Component { 
	constructor(props) {
		super(props);	
		this.state={userName : ''} 
		this.state={isLoggedIn : ''}
		this.state={userPic : ''} 
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
	          version    : 'v3.0'
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
	    console.log(this.state.userName,'userName');
	}

	handleClick() {
				FB.getLoginStatus(function(response) {
			     if (response.status == 'connected') {
			     	  let accessToken = response.authResponse.accessToken;
			          console.log('Welcome!');
			          FB.api('/me', {fields: 'id,name,email,picture'}, function(response) {
			          	console.log({fb:response})
					 	this.state={userName : "Welcome! "+response.name,isLoggedIn: true};
			          	localStorage.setItem('userData', JSON.stringify(response));
						axios.post(BaseUrl.base_url+ "/api/v1/login?accessToken="+accessToken+"&loginMode=facebook&userEmail="+response.email).then((klResponse)=>{
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
							FB.api('/me', {fields: 'id,name,email,picture'}, function(response) {
								this.state={userName : "Welcome! "+response.name,isLoggedIn: true};
								localStorage.setItem('userData', JSON.stringify(response));
								axios.post(BaseUrl.base_url+ "/api/v1/login?accessToken="+accessToken+"&loginMode=facebook&userEmail="+response.email).then((klResponse)=>{
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
	
	logout(){
		localStorage.setItem('authToken', '');
		localStorage.setItem('isLoggedIn', JSON.stringify(false));
		localStorage.setItem('userData', []);
		window.location.reload(); 
	}

	render() {
		//this.fun();
		console.log({test:this.state.isLoggedIn})
		return (
			<div className="row">
				<div className="col-md-12 header-main">
					<div className="col-md-3">
						<Link to="/" className="header-nav-item">Knowledge<b>Locker</b></Link>
					</div>
					<div className="col-md-9 ">
						<div className="header-nav">
							<Menu onClick={handleClick} mode="horizontal" className="menu_appart">
								<SubMenu key="sub1" title={<span><Link to="/explorecareerpath" className="header-nav-item career_app">Career Paths</Link></span>}>
								  <SubMenu key="sub2" title="Browse by">
									<Menu.Item key="1" className="sub_artc_wrapper">Option 3</Menu.Item>
									<Menu.Item key="2" className="sub_artc_wrapper">Option 4</Menu.Item>
								  </SubMenu>
								<SubMenu key="sub3" title="Software Engineering">
									<Menu.Item key="3" className="sub_artc_wrapper">Option 3</Menu.Item>
									<Menu.Item key="4" className="sub_artc_wrapper">Option 4</Menu.Item>
								  </SubMenu>
								<SubMenu key="sub4" title="Software Testing">
									<Menu.Item key="5" className="sub_artc_wrapper">Option 3</Menu.Item>
									<Menu.Item key="6" className="sub_artc_wrapper">Option 4</Menu.Item>
								  </SubMenu>
								</SubMenu>  
								<SubMenu key="sub5" title={<span><Link to="/knowledgeblock" className="header-nav-item career_app">Knowledge BLocks</Link></span>}> 
									  <Menu.Item key="7">Option 5</Menu.Item>
									  <Menu.Item key="8">Option 6</Menu.Item>
								  <SubMenu key="sub6" title="Submenu">
										<Menu.Item key="9">Option 7</Menu.Item>
										<Menu.Item key="10">Option 8</Menu.Item>
								  </SubMenu>
								</SubMenu> 
								<SubMenu key="sub7" title={<span className="header-nav-item career_app">About Us</span>}>
									  <Menu.Item key="11">Option 9</Menu.Item>
									  <Menu.Item key="12">Option 10</Menu.Item>
									  <Menu.Item key="13">Option 11</Menu.Item>
									  <Menu.Item key="14">Option 12</Menu.Item>
								</SubMenu>
								<SubMenu key="sub8" title={<span className="header-nav-item career_app">Contact Us</span>}>
									  <Menu.Item key="11">Option 13</Menu.Item>
									  <Menu.Item key="12">Option 14</Menu.Item>
									  <Menu.Item key="13">Option 15</Menu.Item>
									  <Menu.Item key="14">Option 16</Menu.Item>
								</SubMenu>
							</Menu>
							
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
			</div>
		);
	}
}

export default Header;