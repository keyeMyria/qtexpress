import React, { PureComponent } from 'react'
import { NavBar, Icon, List, InputItem,
  WingBlank, Flex, Button, WhiteSpace,
  Toast
} from 'antd-mobile'
import { clientReg, getCode } from '../services/api'
import { createForm } from 'rc-form';

@createForm()
export default class Reg extends PureComponent {

  constructor(props){
    super(props)
    this.state = {
      loading: false,
      time: 60
    }
  }

  getAuthCode=()=>{
    let self = this
    if (this.state.sendAuthCode) {
      return
    }
    this.setTime()
    this.setState({
      sendAuthCode: true
    })
  }
  setTime=()=>{
    let self = this
    setTimeout( ()=>{
      self.countdown(this.state.time)
    }, 1000 )
  }
  // 倒计时
  countdown=(time)=>{
    time--
    this.setState({
      time: time
    })
    if (time<=0) {
      this.setState({
        sendAuthCode: false,
        time: 60
      })
    } else {
      this.setTime()
    }
  }
  submit = ()=>{
    if ( this.state.loading ) {
      return
    }
    const {tel, username, password, rePassword, authCode} = this.props.form.getFieldsValue()
    if ( !(username&&password&&rePassword&&authCode) ) {
      Toast.fail('请完善信息！', 0.8)
      return
    }
    if ( password.indexOf(' ')>-1 ) {
      Toast.fail('密码中不能含有空格',0.8)
      return
    }
    if ( password!==rePassword ) {
      Toast.fail('两次输入密码不一致，请检查密码',1)
      return
    }
    this.setState({
      loading: true
    })
    let phone = tel.replace(/\s+/g,"");
    clientReg({
      // tel: phone,  //电话号码
      account: phone,
      username, // 用户姓名
      password,
      authCode  //验证码
    })
      .then( res=> {
        console.log(res)
        this.setState({
          loading: false
        })
        if (res.status==="OK") {
          Toast.success('注册成功！', 1)
        } else if (res.status==="REPEAT") {
          Toast.fail('电话已经注册，请直接登录', 1)
        } else {
          Toast.fail('注册失败,重新尝试',1)
        }
      } )
      .catch( err=>{
        this.setState({
          laoding: false
        })
      } )
  }

  render () {
    const { getFieldProps } = this.props.form
    return <div>
      <NavBar
        // mode="light"
        icon={<Icon type='left' ></Icon>}
        onLeftClick={ () => { this.props.history.goBack() } }
      >注册</NavBar>
      <WingBlank>
        <div style={{marginTop: 30}} >
          <List>
            <InputItem
              {...getFieldProps('tel')}
              type="phone"
            >手机号码</InputItem>
            <InputItem
              {...getFieldProps('username')}
            >姓名</InputItem>
            <InputItem {...getFieldProps('password')} type='password' >
              密码
            </InputItem>
            <InputItem {...getFieldProps('rePassword')} type='password' >
              重复密码
            </InputItem>
            <Flex>
              <div style={{flex:4}} >
                <InputItem
                  {...getFieldProps('authCode')}
                  type='number'
                >验证码</InputItem>
              </div>
              <div style={{flex:2}} >
                <button
                  style={{border: 'none',
                    backgroundColor: this.state.sendAuthCode?'#ccc':'#108ee9',
                    height: 30, width: 85,borderRadius: '3px',
                    color: '#fff'}}
                  onClick={ this.getAuthCode } >
                  {
                    this.state.sendAuthCode?<span>{this.state.time}s 重发</span>:'发送'
                  }
                </button>
              </div>
            </Flex>
          </List>
          <WhiteSpace />
          <WingBlank>
            <Button onClick={this.submit} loading={this.state.loading} type='primary' >注册</Button>
          </WingBlank>
        </div>
      </WingBlank>
    </div>
  }
}
