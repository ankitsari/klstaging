import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import DOMPurify from 'dompurify';
import Header from './header';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
          MyHtmlContent: '<div class="bg"> <div class="main_title">Upskill</div></div></div>'
        }
      }

    render() {
        return (
            <div>
                <Header/>
                
                <div dangerouslySetInnerHTML={{ __html: this.state.MyHtmlContent }} />
            </div>
        )
    }
}

export default Home;