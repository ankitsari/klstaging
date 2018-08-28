import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
import Header from './header';
import Footer from './footer';
require('../styles/knowledgeblock.css');

class About extends React.Component {
	constructor(props) {
		super(props);
	} 
   render() {
	   return(
			<div>
				<div className="main_div">
					<Header />
				</div>
				<div className="container">

<br/>					
<br/>					
<br/>					
<br/>					

					<p>

					<b> About Us </b>

</p>

<p>

We, at KnowledgeLocker are dedicated to helping you adopt a Continuous Learning approach in life. <br/>
Explore and keep in touch with the latest career paths, tools and technologies.
We partner with industry leading professionals to ensure that the latest content is updated on the site
to help you keep in touch with today's Technological trends and grow your career.

</p>

<br/>					
<br/>					
<br/>					
<br/>					
<br/>					


				</div>
			<Footer />
			</div>
	   )
   }
}

export default About;