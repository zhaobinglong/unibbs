

import service from '../axios/axios'




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

// 获取信息列表
export const getList = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getList',
        method: 'post',
        data
    })
}


// 根据关键词检索地址列表
export const getAddressList = data => {
    return service({
        url: '/wechat.php?ctrl=bird&action=getAddressList',
        method: 'post',
        data
    })
}