import { stringify } from 'qs';
import request from '../utils/request';

// 获取验证码
export async function getCode(params) {
  return request(`/getAuthCode?${stringify(params)}`)
}

/*
* 公共API
* */
// 根据两点之间的距离和货物重量核算订单预计价格
export async function getExpectedPrice(params) {
  // return request('/order/expectedPrice', {
  //   method: 'POST',
  //   body: params
  // })
  return request(`/order/expectedPrice?${stringify(params)}`)
}
// 验证快递员账户是否重复
export async function courierIsRepeat(parmas) {
  return request(`/dealer/getCourierByAccount?${stringify(parmas)}`)
}
// 获取订单类型列表
export async function getOrderType(params) {
  // return request(`/ceshi/order/getOrderTypes`)
  return request(`/order/getOrderTypes`)
}
// 获取省级列表
export async function getProvince(params) {
  return request(`/dealer/getAllProvinces`)
}
// 参数 code  省的code  后台接应此参数后首先确定该省有无经销商，若没有，则只能添加当前的，若有返回该省所有市
export async function getProvinceDealers(parmas) {
  return request(`/dealer/getProvinceDealers?${stringify(parmas)}`)
}
// 参数 code
export async function getCityDealers(params) {
  return request(`/dealer/getCityDealers?${stringify(params)}`)
}
// 参数 code
export async function getdistrictDealers(params) {
  return request(`/dealer/getDistrictDealers?${stringify(params)}`)
}
// 参数 code  获取区县下面的街道级地址列表
export async function getStreetDealers(params) {
  return request(`/dealer`)
}

// 管理员，客户， 快递员取消订单
export async function cancelOrder(params) {
  return request('/order/addCancel', {
    method: 'POST',
    body:params
  })
}
// 查询所有配送中的订单



/*
*   管理员端API  经销商API也大部分适用， 可能做一点身份字段识别
* */
// 超级管理员的登录
export async function adminLogin(params) {
  return request('/admin/login', {
    method: 'POST',
    body: params
  })
}
//  管理员查看用户信息
export async function adminGetCus(params) {
  return request(`/admin/getCuss?${stringify(params)}`)
}
// 经销商登录
export async function dealerLogin(params) {
  return request('/dealer/login', {
    method: 'POST',
    body: params
  })
}
// 经销商修改密码
export async function dealerUpdatePsw(params) {
  return request('/dealer/modifyPwd', {
    method: 'POST',
    body: params
  })
}
// 经销商修改个人信息
export async function DealerUpdateInfo(params) {
  return request('/dealer/modifyInfo', {
    method: 'POST',
    body: params
  })
}
// 经销商查询
export async function getDealer(params) {
  return request(`/dealer/getDealers?${stringify(params)}`)
}
// 管理员修改经销商信息
export async function updateDealer(params) {
  return request('/admin/modifyInfo', {
    method: 'POST',
    body: params
  })
}
// 管理员添加经销商
export async function addDealer(params) {
  return request('/admin/addDealer', {
    method: 'POST',
    body: params
  })
}
// 管理员重置经销商密码
export async function resetDealerPsw(params) {
  return request('/admin/modifyDealerPwd', {
    method: 'POST',
    body: params
  })
}
// 管理员添加经销商时先验证账户是否重复
export async function dealerReapet(parmas) {
  return request(`/admin/getDealerByAccount?${stringify(parmas)}`)
}
// 经销商或者管理员查看平台快递员
export async function getCourier(params) {
  return request(`/dealer/getCouriers?${stringify(params)}`)
}
// 经销商或管理员更新快递员
export async function updateCourier(params) {
  return request('/dealer/updateCourier', {
    method: 'POST',
    body: params
  })
}
// 经销商或者管理员添加快递员
export async function addCourier(params) {
  return request('/dealer/addCourier', {
    method: 'POST',
    body: params
  })
}
// 经销商或管理员重置密码
export async function resetCourierPsw(parmas) {
  return request('/dealer/resetPwd', {
    method: 'POST',
    body: parmas
  })
}
// 经销商查看下级经销商信息, (管理是查看所有)
export async function getDealers(params) {
  return request(`/dealer/getDealers?${stringify(params)}`)
}
// 经销商获取未分配的订单
export async function getNoDisOrder(params) {
  return request(`/order/getDistributes?${stringify(params)}`)
}
// 获取未分配订单的个数 参数：admiId 经销商的id
export async function getNoDisOrderCount(params) {
  return request(`/order/getDistributesCount?${stringify(params)}`)
}
// 经销商获取快递员位置信息
export async function getCourierPos(parmas) {
  return request(`/dealer/getCourierPos`)
}
// 经销商分配订单
export async function dealerDistributeOrder(params) {
  return request('/order/addDistribute', {
    method: 'POST',
    body: params
  })
}
// 经销商查看所有配送中的订单
export async function dealerShpisOrder(params) {
  return request(`/order/getShips?${stringify(params)}`)
}
// 经销商查看以完成的订单
export async function dealerDoneOrder(params) {
  return request(`/order/getDones?${stringify(params)}`)
}
// 经销商查看以取消的订单
export async function dealerCancelOrder(params) {
  return request(`/order/getCancels?${stringify(params)}`)
}

/*
*   客户端API
* */
// 客户端登录请求
export async function clientLogin(params) {
  return request('/cus/login', {
    method: 'POST',
    body: params
  })
}
// 客户端注册账户
export async function clientReg(params) {
  return request('/cus/register', {
    method: 'POST',
    body: params
  })
}
//  用户修改密码
export async function clientUpdatePsw(params) {
  return request('/cus/modifyPwd', {
    method: 'POST',
    body: params
  })
}
// 用户获取消息列表
export async function getMsg(params) {
  return request('/getMes')
}
// 获取用户地址薄列表
export async function getAdressList(params) {
  return request(`/cus/getAddress?${stringify(params)}`)
}
// 客户添加地址薄
export async function addAddress(params) {
  return request('/cus/addAddress', {
    method: 'POST',
    body: params
  })
}
// 客户删除地址薄
export async function deleteAddress(params) {
  return request('/cus/delAddress', {
    method: 'POST',
    body: params
  })
}
// 客户修改地址薄
export async function updateAddress(params) {
  return request('/cus/updateAddress', {
    method: 'POST',
    body: params
  })
}
// 客户获取所有省列表
export async function cusGetAllProvince(params) {
  return request(`/cus/getAreaProvince`)
}
// 客户获取市区列表
export async function cusGetCity(params) {
  return request(`/cus/getAreaCity?${stringify(params)}`)
}
// 客户获取区现列表
export async function cusGetDistrict(params) {
  return request(`/cus/getAreaDistrict?${stringify(params)}`)
}
// 客户获取区县列表
export async function cusGetStreet(params) {
  return request(`/cus/getAreaStreet?${stringify(params)}`)
}

// 客户下单
export async function addOrder(params) {
  return request('/order/add', {
    method: 'POST',
    body: params
  })
}

/*
*   快递员端API
* */
// 快递员登录
export async function driverLogin(params) {
  return request('/courier/login', {
    method: 'POST',
    body: params
  })
}
// 快递员 上班不断发送位置
export async function sendPos(params) {
  // return request(`/courier/toWork?${stringify(params)}`)
  return request('/courier/toWork', {
    method: 'POST',
    body: params
  })
}
// 快递员下班请求
export async function offWork(parmas) {
  return request(`/courier/offWork?${stringify(parmas)}`)
}
// 快递员修改密码
export async function driverUpdatePsw(params) {
  return request('/courier/modifyPwd', {
    method: 'POST',
    body: params
  })
}
// 查出快递员已有的申请提现的账户
export async function getDriverMoneyAccount(params) {
  return request(`/courier/getCash?${stringify(params)}`)
}
// 快递员提现请求
export async function driverTixian(parmas) {
  return request('/courier/putRecord', {
    method: 'POST',
    body: parmas
  })
}
// 快递员添加提现账户请求
export async function addAccount(params) {
  return request('/courier/addCash', {
    method: 'POST',
    body: params
  })
}
// 快递员修改提现账户
export async function updateAccount(params) {
  return request('/courier/updateCash', {
    method: 'POST',
    body: params
  })
}
// 快递员获取未处理订单条数
export async function courierNoAccpetCount(params) {
  return request(`/order/getAcceptesCount?${stringify(params)}`)
}
// 快递员获取未处理订单列表
export async function getCourierNoAccpet(params) {
  return request(`/order/getAcceptes?${stringify(params)}`)
}
// 快递员确认处理订单
export async function courierAddAccpet(params) {
  return request(`/order/addAccepted`, {
    method: 'POST',
    body: params
  })
}
// 快递员查看待配送待订单（未确认的订单）
export async function courierNoConfirm(params) {
  return request(`/order/getCouShips?${stringify(params)}`)
}
// 快递员配送（确认订单，会携带一些订单参数 如 重量， 实际费用）
export async function courierConfirmOrder(params) {
  return request(`/order/addShipped`, {
    method: 'POST',
    body: params
  })
}
// 快递员获取用户还未付款的订单
export async function courierGetCusNoPay(params) {
  return request(`/order/getNoPay?${stringify(params)}`)
}
// 快递员获取配送中的订单
export async function courierDistribution(params) {
  return request(`/order/getNoDone?${stringify(params)}`)
}
// 快递员确认送达订单
export async function courierAddDone(params) {
  return request('/order/addDone', {
    method: 'POST',
    body: params
  })
}
// 快递员获取已经完成的订单 // 参数， couId pageNo pageSize
export async function courierGetDone(params) {
  return request(`/order/getCouDones?${stringify(params)}`)
}
