/* eslint prefer-promise-reject-errors: ["error", {"allowEmptyReject": true}] */
let Promise = require('bluebird')
import * as actions from '../../redux/actions';
import {dispatch} from '../../redux/store'
export {default as Toast} from './Toast'
export {default as AlertPopup} from './AlertPopup'
export {default as DownLoadPopup} from './DownLoadPopup'
export {default as CustomPopup} from './CustomPopup'
export {default as FullAlertPopup} from './FullAlertPopup'
export {default as Loading} from './Loading'

export function alert(opt, okTextParam = '确定', titleParam) {
    let {message, okText, title, isModal = true} = (typeof opt === 'object') ? opt : {
        message: opt,
        okText: okTextParam,
        title: titleParam
    }
    return new Promise(function (resolve, reject) {
        dispatch(actions.setVars('fuiAlert', {
            message,
            okText,
            cancelText: null,
            title,
            isModal,
            okClick: function () {
                dispatch(actions.setVars('fuiAlert', ''))
                resolve()
            }
        }))
    })
};

export function fullAlert(opt, okTextParam, titleParam) {
    let {message, okText, title, dangerousHtml} = (typeof opt === 'object') ? opt : {
        message: opt,
        okText: okTextParam,
        title: titleParam
    }
    return new Promise(function (resolve, reject) {
        dispatch(actions.setVars('fuiFullAlert', {
            message,
            okText,
            title,
            dangerousHtml,
            okClick: function () {
                dispatch(actions.setVars('fuiFullAlert', ''))
                resolve()
            }
        }))
    })
};

export function confirm(opt, okTextParam = '确定', cancelTextParam = '取消', titleParam) {
    let {message, okText, cancelText, title, isModal = true, dangerousHtml} = (typeof opt === 'object') ? opt : {
        message: opt,
        okText: okTextParam,
        cancelText: cancelTextParam,
        title: titleParam
    }
    return new Promise(function (resolve, reject) {
        dispatch(actions.setVars('fuiAlert', {
            message,
            dangerousHtml,
            okText,
            cancelText,
            title,
            isModal,
            okClick: function () {
                dispatch(actions.setVars('fuiAlert', ''))
                resolve()
            },
            cancelClick: () => {
                dispatch(actions.setVars('fuiAlert', ''))
                reject()
            }
        }))
    })
}

export function toast(toastValue, time = 2500) {
    dispatch(actions.setVars('fuiToast', {
        toastValue: toastValue,
        time: time
    }))
};

function getCookie(name) {
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length === 2) {
        return parts.pop().split(';').shift()
    }
}
export function downLoad(message = '使用客户端，享受更多服务！', okText = '下载', cancelText = '暂不下载') {
    return new Promise(function (resolve, reject) {
        dispatch(actions.setVars('fuiAlert', {
            message: message,
            okText,
            cancelText,
            okClick: function () {
                if (getCookie('channel')) {
                    location.href = 'https://update.fengjr.com/v1/update/app-h5/direct?channel=' + getCookie('channel')
                } else {
                    location.href = 'https://update.fengjr.com/v1/update/app-h5/direct'
                }
                dispatch(actions.setVars('fuiAlert', ''))
                resolve()
            },
            cancelClick: () => {
                dispatch(actions.setVars('fuiAlert', ''))
                reject()
            }
        }))
    })
};

export function loading(promise, loadingText) {
    dispatch(actions.setVars('fuiLoading', {
        isShow: true,
        loadingText: loadingText
    }))
    return promise.finally(() => {
        dispatch(actions.setVars('fuiLoading', null))
    })
};
