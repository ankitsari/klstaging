import React from 'react';
import {Row, Col, Icon, Modal} from 'antd'
import ProfileModel from './ProfileModel'
import axios from "axios";
import BaseUrl from "../config/properties";
import { Link } from 'react-router';

class MyAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo:[],
      editModelShow: false,
      userDetails:[]
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    this.setState({
      userInfo: userData
    })
    this.getData()
  }

  getData(){
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken')
      }
    }
    axios.get(BaseUrl.base_url + "/api/v1/user/profile", config).then((response) => {
      this.setState({
        userDetails: response.data
      })
    }).catch((error) => {
      this.setState({error: error.message})
    });
  }

  isEditModel(){
    this.setState({
      editModelShow: true
    })
  }

  handleCancel(isReFetch) {
    this.setState({
      editModelShow: false,
    });
    if (isReFetch) {
      this.props.getAccount();
    }
  }

  render() {
    const { userInfo, editModelShow, userDetails } = this.state;
    const isProfileSet = localStorage.getItem('profile_firstTime_Added')
    return (
      <div className="block_locker">
        <div className="col-md-12 col-sm-12 col-xs-12 block_image account-pg">
            <Row gutter={8}>
              <Col span={3}>
                  <img className="account-img" src={userInfo.picture && userInfo.picture.data && userInfo.picture.data.url} />
              </Col>
              <Col span={21}>
                  {isProfileSet ?
                      <div>
                          <div className="row" >
                            <div className="col-md-5  col-xs-3">
                              <h4>{userDetails && userDetails.firstName}
                                  {userDetails && userDetails.lastName}</h4>
                            </div>
                            <div className="col-md-3 col-xs-3">
                              <p>Preminm User</p>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-3">
                              <p>exp.on :07-10-2018</p>
                            </div>
                            <div className="col-md-1 col-sm-3 col-xs-3">
                              <Icon type="ellipsis"
                                    onClick={() => this.isEditModel()}
                                    className="cursor menu-icon"
                                    theme="outlined"/>
                            </div>
                          </div>
                        <div className="user-details">
                          <b>{userDetails && userDetails.currentWorkTitle}</b>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                                {userDetails && userDetails.mostRecentCollegeOrUniversity}
                          </div>
                          <div className="col-md-4">
                            <li>{userDetails && userDetails.city},
                                {userDetails && userDetails.country}</li>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <p>{userDetails && userDetails.email}</p>
                          </div>
                          <div className="col-md-4">
                            <li>{userDetails && userDetails.mobile}</li>
                          </div>
                        </div>

                        <div className="user-details">
                          <div className="icons">
                            <a href={userDetails && userDetails.facebookURL}>
                              <i className="fa fa-facebook-square fb-icon"/>
                            </a>
                          </div>
                          <div className="icons">
                            <a href={userDetails && userDetails.linkedInProfileURL}>
                              <i className="fa fa-linkedin-square li-icon"/>
                            </a>
                          </div>
                          <div className="icons">
                            <a href={userDetails && userDetails.behance}>
                              <i className="fa fa-behance-square be-icon"/>
                            </a>
                          </div>
                          <div className="icons">
                            <a href={userDetails && userDetails.twitterHandle}>
                              <i className="fa fa-twitter-square twit-icon"/>
                            </a>
                          </div>
                          <div className="icons">
                            <a href={userDetails && userDetails.githubURL}>
                              <i className="fa fa-github-square git-icon"/>
                            </a>
                          </div>
                        </div>

                         <Modal
                              title="Edit Profile"
                              okText="Save"
                              cancelText="Cancel"
                              width={800}
                              visible={editModelShow}
                              onCancel={this.handleCancel} footer={null}>
                              <ProfileModel getData={this.getData} userInfo={userInfo} onSave={this.handleCancel}/>
                          </Modal>
                      </div> :
                      <ProfileModel userInfo={userInfo} onSave={this.handleCancel}/>
                  }
              </Col>
            </Row>
          </div>
        </div>
    )
  }
}

export default MyAccount;
