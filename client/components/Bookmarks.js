import React from 'react';
import { Modal, Button , Row, Col, Avatar, Icon, Tag} from 'antd'
import BaseUrl from '../config/properties';
import axios from "axios";

class Bookmarks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      bookmarkName: "",
      bookmarkURL: "",
      bookmarkTags: "",
      bookmarkNotes: ""
    };
  }

  onChange(e){
      this.setState({
        [e.target.name]:e.target.value
      })
  }

  showModal() {
      this.setState({
        visible: true
      })
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  handleOk() {
    const {bookmarkName, bookmarkURL, bookmarkTags, bookmarkNotes} = this.state;
    if (bookmarkName === '' || bookmarkURL === '' || bookmarkTags === '') {
      this.setState({
        error: "please fill out this field"
      })
    } else {
      let authToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: authToken
        },
      }
      const bookmark = {
        bookmarkName,
        bookmarkURL,
        bookmarkTags,
        bookmarkNotes,
      }
      axios.post(BaseUrl.base_url + '/api/v1/bookmark/addBookmarkForUser', bookmark, config)
        .then((response) => {
          this.props.getData()
          console.log(response.data.success);
          this.setState({
            visible: false
          })
        }).catch((error) => {
        this.setState({
          error: error.message
        })
      });
    }
  }

  onDelete(bookmarkURL){
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken')
      }
    }
    axios.get(BaseUrl.base_url+`/api/v1/bookmark/deleteBookmarkForUser?bookmarkURL=${bookmarkURL}`, config).then((response) => {
      this.setState({success: response.statusText})
      this.props.getData()
    }).catch((error) => {
      this.setState({error: error.message})
    });
  }

  onAction(data){
    this.setState({
      isDeleteShow: data
    })
  }

  render() {
    const { visible, bookmarkName, bookmarkURL, bookmarkTags, bookmarkNotes, isDeleteShow } = this.state;
    return (
      <div>
        <Row gutter={16} style={{marginTop: -50}}>
          <Col span={12}>
            <h2>My Bookmarks</h2>
            <span style={{color:"#000000"}}>You Have {this.props.bookmarksList.length} saved bookmarks</span>
          </Col>
          <Col span={12} className="text-right">
            <Button type="primary"
                    onClick={() => this.showModal()}
                    style={{backgroundColor: "#2dcc70", marginTop:20, borderColor: '#2dcc70'}}>
              Add Bookmark
            </Button>
            <Modal
              title="Add Bookmark"
              okText="Submit"
              cancelText="Cancel"
              visible={visible}
              onOk={() => this.handleOk()}
              onCancel={() => this.handleCancel()}>
              <div className="form-group">
                <label>Name:</label>
                <input type="text"
                       className="form-control"
                       onChange={(e) => this.onChange(e)}
                       name="bookmarkName"
                       value={bookmarkName}
                       required/>
              </div>
              <div className="form-group">
                <label>URL:</label>
                <input type="text"
                       value={bookmarkURL}
                       onChange={(e) => this.onChange(e)}
                       className="form-control"
                       name="bookmarkURL"
                       required/>
              </div>
              <div className="form-group">
                <label>Tags:</label>
                <input type="text"
                       value={bookmarkTags}
                       onChange={(e) => this.onChange(e)}
                       className="form-control"
                       name="bookmarkTags"
                       required/>
              </div>
              <div className="form-group">
                <label>Notes:</label>
                <input type="text"
                       value={bookmarkNotes}
                       onChange={(e) => this.onChange(e)}
                       className="form-control"
                       name="bookmarkNotes"
                       required/>
              </div>
              <p className="text-danger">{this.state.error}</p>
            </Modal>
          </Col>
        </Row>
        <div className="block_locker">
          <div className="col-md-12 col-sm-12 col-xs-12 block_image">
              {
                this.props.bookmarksList.length ? this.props.bookmarksList.map((item, i) => {
                  return (
                    <div key={i}>
                      <Row gutter={8}>
                        <Col span={3}>
                          <div>
                            { item.bookmark_Thumbnail_URL ? <Avatar shape="square" style={{ fontSize: 32 }} src={ff} />
                              : <Avatar shape="square" icon="picture" style={{ fontSize: 32 }} />}
                          </div>
                          {isDeleteShow === item.bookmarkURL &&
                            <span className="text-danger cursor" onClick={() => this.onDelete(item.bookmarkURL)}>DELETE</span>}
                          <Icon type="ellipsis" className="cursor" style={{ fontSize: 32 }} onClick={() => this.onAction(item.bookmarkURL)} />
                        </Col>
                        <Col span={21}>
                          <h4>{item.bookmarkName}</h4>
                          <p style={{color:"#000000"}} className="ant-anchor-link-title">{item.bookmarkURL}</p>
                          <p>{item.bookmarkedDate_Text}</p>
                          <p>{item.bookmark_Notes}</p>
                          {item.bookmark_Image_URL && <img width={450} src={item.bookmark_Image_URL}/>}
                          <div className="ad_desc">{item.bookmarkTags.split(",").map(Tags => <span style={{backgroundColor:"#dfecf5", marginRight:4}}>#{Tags}</span>)}</div>
                        </Col>
                      </Row>&nbsp;
                      <hr/>
                    </div>
                  )
                }):<div className="text-danger">{this.props.error}</div>
              }
          </div>
        </div>
      </div>
    );
  }

}



export default Bookmarks;