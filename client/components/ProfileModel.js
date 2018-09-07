import React from 'react';
import BaseUrl from '../config/properties';
import axios from "axios";
import {Modal, Row, Col, Button} from 'antd'

class ProfileModel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
            editModelShow: false,
            lastName: '',
            mobile: '',
            currentWork: '',
            fieldOfStudy: '',
            country: '',
            city: '',
            twitterHandle: '',
            githubURL: '',
            linkedInProfileURL: '',
            facebookURL: '',
            profilePicture: '',
            collegeOrUniversity:'',
            careerStage:'',
            currentCompany:''
        };
        this.handleOk = this.handleOk.bind(this);
    }

    onChange(e) {
        const file = e.target.files && e.target.files[0];

        if (file) {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    profilePicture: reader.result
                });
            }
            reader.readAsDataURL(file)
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    componentWillMount() {
        let userData = JSON.parse(localStorage.getItem("userData"));
        this.setState({
            userInfo: userData
        })

        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('authToken')
            }
        }
        axios.get(BaseUrl.base_url + "/api/v1/user/profile", config).then((response) => {
            this.setState({
                ...response.data
            })
        }).catch((error) => {
            this.setState({error: error.message})
        });
    }

    handleOk() {
        const {
            mobile, currentWork, fieldOfStudy, country, city, currentCompany, twitterHandle,
            githubURL, linkedInProfileURL, careerStage, facebookURL, collegeOrUniversity
        } = this.state;

        let EditUser = {
          city: city,
          country: country,
          mobile: mobile,
          careerStage: careerStage,
          mostRecentCollegeOrUniversity: collegeOrUniversity,
          mostRecentFieldOfStudy: fieldOfStudy,
          currentWorkTitle: currentWork,
          facebookURL: facebookURL,
          githubURL: githubURL,
          linkedInProfileURL: linkedInProfileURL,
          twitterHandle: twitterHandle,
          currentCompany: currentCompany,
        }

        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('authToken')
            }
        }
        axios.post(BaseUrl.base_url + '/api/v1/user/updateProfile', EditUser, config)
            .then((response) => {
                this.props.onSave(true);
                this.props.getData()
                localStorage.setItem('profile_firstTime_Added', 'true');
            }).catch((error) => {

        });
    }


    render() {
        const {
            lastName, mobile, currentWork,fieldOfStudy, collegeOrUniversity,
            country, city, currentCompany, twitterHandle, githubURL, linkedInProfileURL,
            careerStage, facebookURL, profilePicture, userInfo
        } = this.state;
        return (
            <div>
                <Row gutter={8}>
                    <Col span={4} className="text-center">
                        <img height={125} src={profilePicture ? profilePicture : userInfo.picture.data.url}
                             className="pro_img"/>
                        {/*<div style={{padding: 10}}>*/}
                            {/*<span className="btn-file">Edit Photo*/}
                                {/*<input type="file"*/}
                                       {/*onChange={(e) => this.onChange(e)}*/}
                                       {/*value={this.state.profilePicture}*/}
                                       {/*name="profilePicture"*/}
                                       {/*className="save-btn"/>*/}
                            {/*</span>*/}
                        {/*</div>*/}
                    </Col>
                    <Col span={20}>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>First Name:</label>
                                    <input type="text"
                                           value={userInfo.name}
                                           disabled
                                           className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Last Name:</label>
                                    <input type="text"
                                           onChange={(e) => this.onChange(e)}
                                           value={lastName}
                                           name="lastName"
                                           disabled
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Email Address:</label>
                                    <input type="email"
                                           value={userInfo.email}
                                           disabled
                                           className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Phone Number:</label>
                                    <input type="text"
                                           onChange={(e) => this.onChange(e)}
                                           value={mobile}
                                           name="mobile"
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group col-md-12">
                                <label>Current Work:</label>
                                <input type="text"
                                       onChange={(e) => this.onChange(e)}
                                       value={currentWork}
                                       name="currentWork"
                                       className="form-control"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label>College Or University:</label>
                                <input type="text"
                                       onChange={(e) => this.onChange(e)}
                                       value={collegeOrUniversity}
                                       name="collegeOrUniversity"
                                       className="form-control"/>
                            </div>

                            <div className="form-group col-md-12">
                                <label>Field Of Study:</label>
                                <input type="text"
                                       onChange={(e) => this.onChange(e)}
                                       value={fieldOfStudy}
                                       name="fieldOfStudy"
                                       className="form-control"/>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Career Stage:</label>
                                    <input type="email"
                                           value={careerStage}
                                           onChange={(e) => this.onChange(e)}
                                           name="careerStage"
                                           className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Current Company:</label>
                                    <input type="text"
                                           onChange={(e) => this.onChange(e)}
                                           value={currentCompany}
                                           name="currentCompany"
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Country/Region:</label>
                                    <select name="country"
                                            className="form-control"
                                            value={country}
                                            onChange={(e) => this.onChange(e)}>
                                        <option value=""></option>
                                        <option value="India">India</option>
                                        <option value="Japan">Japan</option>
                                        <option value="UK">Uk</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>City/Disrict:</label>
                                    <select name="city"
                                            className="form-control"
                                            onChange={(e) => this.onChange(e)}
                                            value={city}>
                                        <option value=""></option>
                                        <option value="Surat">Surat</option>
                                        <option value="Rajkot">Rajkot</option>
                                        <option value="Tokyocity">Tokyocity</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Facebook:</label>
                                    <input type="text"
                                           onChange={(e) => this.onChange(e)}
                                           value={facebookURL}
                                           name="facebookURL"
                                           className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Twitter:</label>
                                    <input type="text"
                                           onChange={(e) => this.onChange(e)}
                                           value={twitterHandle}
                                           name="twitterHandle"
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Linkedin:</label>
                                    <input type="text"
                                           onChange={(e) => this.onChange(e)}
                                           value={linkedInProfileURL}
                                           name="linkedInProfileURL"
                                           className="form-control"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Github:</label>
                                    <input type="text"
                                           onChange={(e) => this.onChange(e)}
                                           value={githubURL}
                                           name="githubURL"
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-row col-md-12 save-btn">
                                <Button type="primary" className="center btnSaveProfile"
                                        onClick={this.handleOk}>Save</Button>
                            </div>

                        </form>
                    </Col>
                </Row>
                <p className="text-danger">{this.state.error}</p>
            </div>
        )
    }
}

export default ProfileModel;
