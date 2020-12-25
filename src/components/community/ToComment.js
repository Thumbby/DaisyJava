//
// made by ykn
//
//这里整了一个评论框

import React from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { isLogined } from '../../utils/auth';
import Unlogined from './Unlogined';
import Axios from 'axios';
import CONSTURL from './config';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <Form>
    
    <Form.Item
       name='title'
       rules={[
        {
          required: true,
          message: '请输入评论内容!',
        },
      ]}
    >
      <TextArea rows={4} onChange={onChange} value={value} style={{width: '100%', resize: 'none'}} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </Form>
);

export default class ToComment extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
    ava:CONSTURL.UserAva1
  };

  componentDidMount(){
    if(isLogined()){
      Axios.get(JSON.parse(localStorage.userData).icon.toString()).then((res)=>{
        this.setState({ava:res.data})

        console.log(" ava  ",this.state.ava)
        Axios.get(this.state.ava).then((ress)=>{
          if(ress.data.length>0){
            this.setState({ava:ress.data})
          }
        }
        )
        .catch()
        
      })
    }
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    var isReply=this.props.isReply

    console.log(" is reply",isReply)

    this.props.createComment(this.state.value,isReply)

    this.setState({
      submitting: false,
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    var islog=isLogined()
    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        
        <Comment
          avatar={
            islog?
            <a href={'#/personal/account='+JSON.parse(localStorage.userData).account}>
              <Avatar src={this.state.ava}/>
            </a>
            :<Unlogined/>
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}


// {isLogined()
//   ?<Avatar src={localStorage.getItem('userData').Icon}/>
//   :<unLogined>}
