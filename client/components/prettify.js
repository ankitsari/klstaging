import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Select } from 'antd';
var Filter = require('../helper/filter');
const Option = Select.Option;

class Prettify extends React.Component {

    constructor() {
        super();
        this.state={data:[]}
    }

    componentDidMount() {
        axios.get(BaseUrl.base_url+ "/api/v1/KnowledgeBlocks/getAllTopKnowledgeBlocks/").then((response)=>{
            this.setState({ 
                data: response.data.knowledgeBlocks
            });
            console.log('////////////////////////////////////////////////////////////');
           this.filterFun(this);
           console.log('////////////////////////////////////////////////////////////');
        })
    } 

    filterFun(props){
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log({before:this.state.data});
        var filterDetail = {
                for:"knowledgeblock",
                scenario:"knowledgeblock",
                category:'Beginner'
            }
        Filter.filterObject(filterDetail, this.state.data, function(err,result){
            console.log({after:result,isTrue:true});
            props.setState({ 
                data: result
            });
        });
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    }

    render() {
        return (
            <div>
                {this.state.data.map((obj)=>{
                   return(<p>{obj.knowledgeBlock_Name}</p>);
                })}
            </div>
            );
    }
}
 
export default Prettify;



/*
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Select } from 'antd';
var Filter = require('../helper/filter');
const Option = Select.Option;

class Prettify extends React.Component {

    constructor() {
        super();
        this.state={data:[],dataVideo:[],
                      dataArticle:[]}
    }

    componentDidMount() {
        axios.get("http://www.knowledgelocker.com/api/v1/KnowledgeBlocks/Name/jquery/Videos_Articles").then((response)=>{
            if (response.data.length) {
                if (response.data[0].length) {
                    this.setState({ 
                        dataVideo: response.data[0]
                    });
                }
                if (response.data[1].length) {
                    this.setState({ 
                        dataArticle: response.data[1]
                    });
                }
            }
            console.log('////////////////////////////////////////////////////////////');
           this.filterFun(this);
           console.log('////////////////////////////////////////////////////////////');
        })
    } 

    filterFun(props){
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        console.log({before:this.state.data});
        var filterDetail = {
                for:"knowledgeblock",
                scenario:"videoArticle",
                category:'Beginner'
            }
        var arrOfObj = {video: this.state.dataVideo,
                        article: this.state.dataArticle}
        Filter.filterObject(filterDetail, arrOfObj, function(err,result){
            console.log({after:result,isTrue:true});
            props.setState({ 
                dataVideo: result.video,
                dataArticle: result.article,
            });
        });
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    }
    render() {
        return (
            <div>
                {this.state.dataVideo.map((obj)=>{
                   return(<p>{obj.public_WebVideo_Resource_Title}</p>);
                })}
                {this.state.dataArticle.map((obj)=>{
                   return(<p>{obj.public_WebArticle_Resource_Title}</p>);
                })}
            </div>
            );
    }
}
 
export default Prettify;*/