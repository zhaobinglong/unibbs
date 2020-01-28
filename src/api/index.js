

import service from '../axios/axios'

// 通过手机号码获取销售信息
export const getSellerByPhone = query => {
  return service({
    url: '/wechat.php?ctrl=bird&action=sellerRegister',
    method: 'post',
    data: query
  })
}

export const getAllOrders = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getAllOrders',
        method: 'post',
        data
    })
}

export const getShareImg = data => {
    return service({
        url: 'wechat.php?ctrl=weixin&action=getShareImg',
        method: 'post',
        data
    })
}

// 销售注册
export const sellerRegister = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=sellerRegister',
        method: 'post',
        data
    })
}

// 销售注册
export const getSellerByCode = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getSellerByCode',
        method: 'post',
        data
    })
}

// 获取全部公司信息
export const getCompanys = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getCompanys',
        method: 'post',
        data
    })
}

export const sellerApply = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=sellerApply',
        method: 'post',
        data
    })
}

// 
export const createrOrder = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=createrOrder',
        method: 'post',
        data
    })
}

export const getOrders = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getOrders',
        method: 'post',
        data
    })
}

// 
export const checkOrder = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=checkOrder',
        method: 'post',
        data
    })
}

// login
export const login = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=login',
        method: 'post',
        data
    })
}

// 获取短信的签名秘钥
export const sendSMS = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=sendSMS',
        method: 'post',
        data
    })
}

// 用户发布
export const userPush = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=push',
        method: 'post',
        data
    })
}

// 用户提交线索
export const userClue = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=clue',
        method: 'post',
        data
    })
}

// 用户添加档案
export const userAddChild = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=addChild',
        method: 'post',
        data
    })
}

// 获取档案
export const getChild = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getChild',
        method: 'post',
        data
    })
}

// 获取走失列表
export const getList = data => {
    return service({
        url: '/wechat.php?ctrl=api&action=getList',
        method: 'post',
        data
    })
}

// 获取萧索列表
export const getClue = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getClue',
        method: 'post',
        data
    })
}

// 获取信息列表
export const getDetail = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getDetail',
        method: 'post',
        data
    })
}

// 用户登录
export const userLogin = data => {
    return service({
        url: '/wechat.php?ctrl=user&action=login',
        method: 'post',
        data
    })
}

// 获取分类信息
export const getTypeList = data => {
    return service({
        url: '/wechat.php?ctrl=api&action=getClassify',
        method: 'post',
        data
    })
}

// 编辑分类信息
export const editType = data => {
    return service({
        url: '/wechat.php?ctrl=api&action=editType',
        method: 'post',
        data
    })
}

// 编辑帖子状态
export const editStatus = data => {
    return service({
        url: '/wechat.php?ctrl=api&action=editStatus',
        method: 'post',
        data
    })
}


// 获取banner信息
export const getBanner = data => {
    return service({
        url: '/wechat.php?ctrl=api&action=getBanner',
        method: 'post',
        data
    })
}