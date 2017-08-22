module.exports = {
    elec: [
        {
            title: '单位名称',
            icon: true,
            id: 'CompanyName',
            reg: new RegExp('^[\\S]+$'),
        },
        {
            title: '纳税人识别号',
            text: true,
            id: 'CompanyCode'
        },
        {

            title: '价税合计（小写）',
            color: '#f6f6f6',
            value: true,
            id: 'CompanyTotal',
            text: '1',
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
            reg: new RegExp('^[\\S]+$'),
        },
        {
            title: '短信验证码',
            icon: false,
            btn: true,
            id: 'MessageCode'
        },
        {
            title: '邮箱',
            icon: false,
            id: 'Email'
        },
    ],
    normal: [
        {
            title: '单位名称',
            icon: true,
            id: 'CompanyName'
        },
        {
            title: '纳税人识别号',
            icon: true,
            text: true,
            id: 'CompanyCode'
        },
        {

            title: '价税合计（小写）',
            color: '#f6f6f6',
            value: true,
            id: 'CompanyTotal',
            text: '1',
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
            id: 'Username'
        },
        {
            title: '收件人地址',
            icon: true,
            id: 'UserLoaction'
        },
        {
            title: '手机号',
            icon: true,
            id: 'MobileNumber'
        },
        {
            title: '短信验证码',
            icon: true,
            btn: true,
            id: 'MessageCode'
        },
        {
            title: '邮箱',
            icon: false,
            id: 'Email'
        },
    ],
    special: [
        {
            title: '单位名称',
            icon: true,
            id: 'CompanyName'
        },
        {
            title: '纳税人识别号',
            icon: true,
            text: true,
            id: 'CompanyCode'
        },
        {

            title: '价税合计（小写）',
            color: '#f6f6f6',
            value: true,
            id: 'CompanyTotal',
            text: '1',
        },
        {
            title: '地址、电话',
            icon: true,
            id: 'AddAndPhoneNumber'
        },
        {

            title: '开户行及账号',
            icon: true,
            id: 'BankNameAndAccount'
        },
        {
            title: '收件人姓名',
            icon: true,
            id: 'Username'
        },
        {
            title: '收件人地址',
            icon: true,
            id: 'UserLoaction'
        },
        {
            title: '手机号',
            icon: true,
            id: 'MobileNumber'
        },
        {
            title: '短信验证码',
            icon: true,
            btn: true,
            id: 'MessageCode'
        },
        {
            title: '邮箱',
            icon: false,
            id: 'Email'
        },
    ]
}