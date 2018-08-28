import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';

require('../styles/footer.css');

class Footer extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return(

			<div className="knowledgelocker-footer">
				<div className="row footer-div">
					<div className="container">
						<div className="col-md-12 col-sm-12 col-xs-12 footer-main">
							<div className="col-md-4 col-sm-4 col-xs-12 mobile_view">
								<p className="footer-title">Knowledge<b>Locker</b></p>
								<p className="footer-paragraph">KnowledgeLocker helps you in journey to implment a Continuous Learning approach in life. Explore and keep in touch with the latest career paths, tools and technologies.</p>
							</div>
							<div className="col-md-4 col-sm-4 col-xs-12 mobile_view">
								<p className="footer-two-title">Get Updated!</p>
								<p className="footer-two-paragraph">We keep in touch with the latest trends in technology and engineering to help you in all your learning needs</p>
							</div>
							<div className="col-md-4 col-sm-4 col-xs-12 mobile_view">
								<p className="footer-two-title">Spread us!</p>
								<p className="footer-two-paragraph">Do you like What we are doing? Please tell about us to your friends!</p>
								<div className="icons icons_facebook"><i className="fa fa-facebook fo"></i></div>
								<div className="icons icons_twitter"><i className="fa fa-twitter fo"></i></div>
								<div className="icons icons_linkedin"><i className="fa fa-linkedin fo"></i></div>	
							</div>
						</div>
					</div>
				</div>
				<div className="row footer-div-copiright">
					<div className="container">
						<div className="col-md-6 col-sm-12 col-xs-12 copyright">
							<p>Copyright @ 2017 KnowledgeLocker All rights reserved.</p>
						</div>
						<div className="col-md-6 col-sm-12 col-xs-12 links">
							
							<div className="left-text terms">
								<Link to='/AboutUs' className='footer-links'>About Us</Link>
							</div>
							

							<div className="left-text terms">
								<Link to='/privacy' className='footer-links'>Privacy Policy</Link>
							</div>
							<div className="center-link terms"> 
								<Link to='/terms' className='footer-links'>Terms & Conditions</Link>
							</div>
							<div className="center-link terms"> 
								<Link to='/contact' className='footer-links'>Contact us</Link>
							</div>
							
						</div>
					</div>
				</div>
			</div>
		
		)
	}
}
export default Footer;