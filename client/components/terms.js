import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
import Header from './header';
import Footer from './footer';
require('../styles/knowledgeblock.css');

class Terms extends React.Component {
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
					
					Please read these Terms and Conditions carefully before using the KnowledgeLocker website.
					<br/>



					<p> Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.

					By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.

					</p>

					<b> Purchases </b> 
					<br/>

<p>
					If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, 
					your name and email address.					
</p>


                    <b>	Subscriptions</b>

					<p> Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring ...

					The Subscriptions section is for SaaS businesses. For the full disclosure section, create your own Terms and Conditions.

					

					Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). 
					You are responsible for the content that you post on the site. The content should not be offensive to anyone, irrespective of
					race, religion, occupation, gender and political viewpoints.
					The site admins reserve the right to take down any content that deem not in standards with the above principles.


					</p>
					

					<b> Refunds </b> 
					<br/>
                    <p>
					We take the satisfaction of our customers very seriously.  You can email our support team at 
					team@KnowledgeLocker.com for any clarifications or complaints regarding the digital products you 
					have purchased on this site. 
					For eBook and Online eVideos, we do not have a general refund policy.
					However, if you felt that there was misrepresentation in the way the product description was written
					and how the book or video lesson was delivered, we will take full responsibility for this and work with you
					to correct this and provide you the best customer experience. We retain full discretion in offering you
					a discount on the said material based on evaluating your observations.

					For subscription service products, you are entitled to contact our team at team@knowledgelocker.com and 
					cancel the subscription anytime if you are not satisfied with the offerings.

					</p>
					
					<br/>

					<b> Links To Other Web Sites </b>
					<br/>


<p>
					Our Service may contain links to third-party web sites or services that are not owned or controlled by KnowledgeLocker.

					KnowledgeLocker has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that My Company (change this) shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
</p>

					
					<b> Changes </b>
					<br/>

					We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 (change this) days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

					<b> Contact Us </b>

					If you have any questions about these Terms, please contact us at team@KnowledgeLocker.compliance

				</div>
			<Footer />
			</div>
	   )
   }
}

export default Terms;