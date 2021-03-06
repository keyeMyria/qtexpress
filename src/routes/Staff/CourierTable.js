import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Input, Select, Popconfirm, message, Form, Modal} from 'antd';
import { updateCourier, resetCourierPsw } from '../../services/api'

const Option = Select.Option
const WriteInput = ({getFieldDecorator, value, text}) => (
  <div>
    {getFieldDecorator(text, {
      initialValue: value,
      rules: [{required: true}]
    })(
      <Input />
    )}
  </div>
)

const SelectInput = ({getFieldDecorator, value, text, selectArr, width}) => (
  <div>
    {getFieldDecorator(text, {
      initialValue: value,
      //rules: [{required: true}]
    })(
      <Select style={{width: width||100}} >
        {selectArr.map( (item, i)=> (
          <Option key={i} value={item.id} >{item.category_name}</Option>
        ) )}
      </Select>
    )}
  </div>
)

@Form.create()
@connect(state => ({
  data: state.courier.data,
  loading: state.courier.loading,
  // total: state.courier.total,
  admin_id: state.admin_login.admin_id,
  roleId: state.admin_login.roleId,
}))
export default class FrontDesk_table extends  PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      selectWriteKey: undefined,
      data: [],
    }
  }

  componentDidMount () {

  }

  handleWrite = (index) => {
    this.setState({
      selectWriteKey: index
    })
  }

  renderWriteInput = ( getFieldDecorator, value, text ) => {
    return <WriteInput getFieldDecorator={getFieldDecorator} value={value} text={text} ></WriteInput>
  }

  renderSlectInput = ( getFieldDecorator, value, text, selectArr, width ) => {
    return <SelectInput getFieldDecorator={getFieldDecorator} value={value} text={text} selectArr={selectArr} width={width} ></SelectInput>
  }

  //表格渲染翻译id
  idToName = ( id, arr, text ) => {
    var name = null
    for ( var i=0; i<arr.length; i++ ) {
      if ( arr[i].id === id ) {
        name = arr[i][text]
      }
    }
    return name
  }

  handleSave = (val, index) => {
    // console.log('ok')
    this.props.form.validateFields( (err,values)=>{
      if (err) {
        Modal.error({
          title: '输入的信息不能为空！'
        })
        return
      }
      updateCourier({
        adminId: parseInt(this.props.admin_id),  // 管理员id
        id: val.id,  // 需要修改状态的快递员的id
        roleId: parseInt(this.props.roleId), //当前管理员的权限id
        // isActive: values.is_active
        ...values
      })
        .then( res=>{
          let next_data = [...this.state.data]
          next_data[index].isActive = values.isActive
          next_data[index].username = values.username
          next_data[index].tel = values.tel
          if (res.status==='OK') {
            message.success('修改成功',1)
            this.setState({
              selectWriteKey: null,
              data: next_data
            })
          } else {
            message.error('修改失败，请重新尝试',1)
            this.setState({
              selectWriteKey: null,
            })
          }
        } )
        .catch( res=>{
          message.error('修改出错',1)
          this.setState({
            selectWriteKey: null,
          })
        } )
    } )
  }

  componentWillReceiveProps ( nextProps ) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data
      })
    }
  }

  gotoDetails = (val) => {
    this.props.history.push(`/admin/cont/goods/goodsDetails/${val.id}`)
  }

  resetPsw=id=>{
    resetCourierPsw({
      id
    })
      .then(res=>{
          if (res.status==="OK") {
            message.success('重置成功', 1)
          } else {
            message.error('重置失败', 1)
          }
        })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        width:50
      },
      {
        title: '快递员账户',
        dataIndex: 'account',
        width: 150
      },
      {
        title: '姓名',
        dataIndex: 'username',
        width:150,
        render: (val, text, index) => (
          <div>
            {this.state.selectWriteKey===index?this.renderWriteInput(getFieldDecorator,val,'username'): val}
          </div>
        )
      },
      {
        title: '联系电话 ',
        dataIndex: 'tel',
        width: 150,
        render: (val, text, index) => (
          <div>
            {this.state.selectWriteKey===index?this.renderWriteInput(getFieldDecorator,val,'tel'): val}
          </div>
        )
      },
      {
        title: '状态',
        dataIndex: 'isActive',
        render: (val, text, index) => (
          <div>
            {this.state.selectWriteKey===index?this.renderSlectInput(getFieldDecorator,val,'isActive', [{id: 0, category_name: '禁用'},{id:1,category_name: '启用'}], 100): this.idToName(val, [{id: 0, category_name: '禁用'},{id:1,category_name: '启用'}], 'category_name')}
          </div>
        )
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        // width:80,
        render: val => <span>{new Date(val).toLocaleDateString()}</span>
      },
      {
        title: '操作',
        width: 150,
        render: (val, text, index) => (
          <div>
            {this.state.selectWriteKey===index?
              <div>
                <Popconfirm title='确定保存修改信息？' onConfirm={ () => { this.handleSave(val, index) } } ><a>保存</a></Popconfirm>
                <a style={{marginLeft: '5px'}} onClick={ () => { this.setState({ selectWriteKey: null }) } } >取消</a></div>:
              <div>
                <a onClick={ () => {this.handleWrite(index)} } >修改</a>
                <Popconfirm title="确定重置密码？" onConfirm={ ()=>{ this.resetPsw(val.id) } } >
                  <a style={{marginLeft: '5px'}} >重置密码</a>
                </Popconfirm>
              </div>
            }
          </div>
        )
      }
    ]
    var self = this
    const rowSelection = {
      onChange (selectedRowKeys, selectedRows) {
        self.setState({
          selectedRowKeys: selectedRowKeys
        })
        self.props.onSelectRow(selectedRows, selectedRowKeys)
      },
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
      selectedRowKeys: this.state.selectedRowKeys
    };

    return <div>
      <Table
        columns={columns}
        dataSource={this.state.data}
        rowKey={record => record.id }
        pagination={
          {
            // total: this.props.total,
            total: 200,
            defaultCurrent: 1,
            showQuickJumper: true,
            current: this.props.pageNo,
            onChange: this.props.onChange,
            pageSize: 10,
          }
        }
        size='small'
        loading={this.props.loading}
        //rowSelection={rowSelection}
      />
    </div>
  }
}
