import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
import Header from './header';
import Footer from './footer';
require('../styles/knowledgeblock.css');

class Contact extends React.Component {
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

					<b> Contact Us </b>

</p>

<p>

					If you have any questions about the Terms & Conditions or have a query about using this site, 
					please contact us at team@KnowledgeLocker.com
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

export default Contact;