import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
import Header from './header';
import Footer from './footer';
import axios from "axios";
import BaseUrl from '../config/properties';

require('../styles/home.css');

const careerpathImage = 'https://s3.amazonaws.com/klockerimg/group-31.png';

class HomePage extends React.Component {
 constructor(props) {
     super(props);
	 this.state ={ data:[] };
   } 
   componentDidMount() {
		axios.get(BaseUrl.base_url+"/api/v1/KnowledgeBlocks/getKnowledgeBlocksForHomepageDisplay/").then((response)=>{
        	console.log(response.data);
			this.setState({ 
            	data: response.data,
            });
        });
   }
   componentDidUpdate() {
		ReactDOM.findDOMNode(this).scrollTop = 0
	}
	
	renderFirstThreeList(obj,i) {
		if(i<3) {
			return (
				<div className="top_links" key={i}>
					<Link to={obj.link} className="popular_courses">{obj.title}</Link>
				</div>
			)
		}
	}
	renderLastTwoList(obj,i){
		if(i>2) {
			return (
				<div className="top_links" key={i}>
					<Link to={obj.link} className="popular_courses">{obj.title}</Link>
				</div>
			)
		}
	}

 render() {
	 var background = {
	width:'100%',
	backgroundImage : "url(https://s3.amazonaws.com/klockerimg/group-40.png)",
	backgroundRepeat  : 'no-repeat',
	height :"226px",
	backgroundSize : '100% 100%'
	};
	var display ={
	    display:'none'
	};
        return (
          <div>
             <div className="main_div_home">
              <Header />
              <div className="container">
               <div className="col-md-12 col-sm-12 col-xs-12 title_content">
      
             </div>
              </div>
             </div>
     
    <div className="col-md-12 col-sm-12 col-xs-12 careerpath_listing">
     <div className ="container">
      <div className = "fill">
       
	   <div className="col-md-4 col-sm-4 col-xs-12">       
				<div className="careerpath_block">
					<div style= { background } >
						<div className ="overlay">
							<div className = "home-content">
								
								
							</div>
						</div>
					</div>
				</div>
			</div>

      </div>
     </div>
    </div>
    <div className="col-md-12 col-sm-12 col-xs-12 knowledgeblock_listing">
     <div className ="container">
      <div className = "fill">
       <div className="col-md-12 col-sm-12 col-xs-12 knowledgeblock_title">
        
        
       </div>
        
      </div>
     </div>
    </div>
	<Footer />
   </div>
        )
    }
}

export default HomePage;