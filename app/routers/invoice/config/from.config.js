module.exports = {
    elec: [
        {
            title: '单位名称',
            icon: true,
            id: 'CompanyName',
            unEdit: true,
            bindData: 'cinsuredNme',
        },
        {
            title: '纳税人识别号',
            icon: true,
            text: true,
            id: 'CompanyCode',
            reg: new RegExp(/^[a-zA-Z0-9]{15,18}$/),
            unEdit: false,
        },
        {
            title: '价税合计（小写）',
            color: '#f6f6f6',
            value: true,
            id: 'CompanyTotal',
            text: '1',
            unEdit: true,
            bindData: 'nprice',
        },
        {

            title: '地址、电话',
            icon: false,
            id: 'AddAndPhoneNumber'
        },
        {

            title: '开户行及账号',
            icon: false,
            id: 'BankNameAndAccount'
        },
        {
            title: '手机号',
            icon: true,
            id: 'MobileNumber',
            reg: new RegExp(/^1\d{10}$/),
        },
        {
            title: '短信验证码',
            btn: true,
            icon: true,
            reg: new RegExp('^[\\S]+$'),
            id: 'MessageCode'
        },
        {
            title: '邮箱',
            id: 'Email',
            icon: true,
            reg: new RegExp('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$')
        },
    ],
    normal: [
        {
            title: '单位名称',
            icon: true,
            id: 'CompanyName',
            unEdit: true,
            bindData: 'cinsuredNme',
        },
        {
            title: '纳税人识别号',
            icon: true,
            text: true,
            id: 'CompanyCode',
            reg: new RegExp(/^[a-zA-Z0-9]{15,18}$/),
            unEdit: false,
        },
        {
            title: '价税合计（小写）',
            color: '#f6f6f6',
            value: true,
            id: 'CompanyTotal',
            text: '1',
            unEdit: true,
            bindData: 'nprice',
        },
        {

            title: '地址、电话',
            icon: false,
            id: 'AddAndPhoneNumber'
        },
        {

            title: '开户行及账号',
            icon: false,
            id: 'BankNameAndAccount'
        },
        {
            title: '收件人姓名',
            icon: true,
            id: 'Username',
            reg: new RegExp('^[\\S]+$'),
        },
        {
            title: '收件人地址',
            icon: true,
            id: 'UserLoaction',
            reg: new RegExp('^[\\S]+$'),
        },
        {
            title: '手机号',
            icon: true,
            id: 'MobileNumber',
            reg: new RegExp(/^1\d{10}$/),
        },
        {
            title: '短信验证码',
            btn: true,
            icon: true,
            reg: new RegExp('^[\\S]+$'),
            id: 'MessageCode'
        },
        {
            title: '邮箱',
            icon: false,
            id: 'Email',
            reg: new RegExp('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$'),
            callNull: true,
        },
    ],
    special: [
        {
            title: '单位名称',
            icon: true,
            id: 'CompanyName',
            unEdit: true,
            bindData: 'cinsuredNme',
        },
        {
            title: '纳税人识别号',
            icon: true,
            text: true,
            id: 'CompanyCode',
            reg: new RegExp(/^[a-zA-Z0-9]{15,18}$/),
            unEdit: false,
        },
        {
            title: '价税合计（小写）',
            color: '#f6f6f6',
            value: true,
            id: 'CompanyTotal',
            text: '1',
            unEdit: true,
            bindData: 'nprice',
        },
        {
            icon: true,
            title: '地址、电话',
            id: 'AddAndPhoneNumber',
            reg: new RegExp('^[\\S]+$'),
        },
        {
            icon: true,
            title: '开户行及账号',
            id: 'BankNameAndAccount',
            reg: new RegExp('^[\\S]+$'),
        },
        {
            title: '收件人姓名',
            icon: true,
            id: 'Username',
            reg: new RegExp('^[\\S]+$'),
        },
        {
            title: '收件人地址',
            icon: true,
            id: 'UserLoaction',
            reg: new RegExp('^[\\S]+$'),
        },
        {
            title: '手机号',
            icon: true,
            id: 'MobileNumber',
            reg: new RegExp(/^1\d{10}$/),
        },
        {
            title: '短信验证码',
            btn: true,
            icon: true,
            reg: new RegExp('^[\\S]+$'),
            id: 'MessageCode'
        },
        {
            title: '邮箱',
            icon: false,
            id: 'Email',
            callNull: true,
            reg: new RegExp('^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$')
        },
    ]
}