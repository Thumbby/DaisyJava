import React, { Component } from 'react'
import HeaderNav from '../../components/comm/HeaderNav'
import TeamNav from '../../components/findTeammate/TeamNav'
import PublishPost from '../../components/findTeammate/PublishPost'
import Footer from '../../components/comm/Footer'
import { Divider } from 'antd';
import PostList from '../../components/findTeammate/ViewPost'
import FloatHelper from '../../components/comm/FloatHelper'
import '../../style/findTeam/findTeam.css'

export default class FindTeam extends Component {
    constructor(props){//接收比赛页面传递的比赛数据
        super(props)        
        if(!this.props.match.params.compID){
            window.alert('连接出错，点击确定返回主页')
            window.location.hash ='#/home'
        }
        this.state={
          matchId:this.props.match.params.compID
         }
         console.log(this.state.matchId)
      }
    render() {
        return (
            <>
                <div id='page'>
                <HeaderNav/>
                <br/><br/>
                <div id='TeamNav'>
                <TeamNav matchId={this.state.matchId}/>
                </div>
                <Divider/>
                <div id='page'>
                <Divider/>
                <div id='WebPage'>
                    <div id='PostList'>
                        <PostList matchId={this.state.matchId}/>
                    </div>
                    <br/>
                    <Divider/>
                    <div id='PublishPost'><PublishPost matchId={this.state.matchId}/></div>
                    <br/>
                    </div>
                    </div>
                <FloatHelper/>
                </div>
                <Footer/>
            </>
        )
    }
}
