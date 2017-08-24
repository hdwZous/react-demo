module.exports = {
    getInfo: (invoiceInfo) => {
        let infoList = [];
        if (invoiceInfo.cstatus === '7') {
            infoList.push({
                title: '单位名称：',
                content: invoiceInfo.cinsuredNme
            });
            infoList.push({
                title: '价税合计（小写）：',
                content: '¥' + (+invoiceInfo.nprice / 100).toFixed(2)
            });
            infoList.push({
                title: '发票号码：',
                content: invoiceInfo.CFphm
            });
            infoList.push({
                title: '发票代码：',
                content: invoiceInfo.CFpdm
            });
            infoList.push({
                title: '手机号：',
                content: invoiceInfo.cmobile
            });
            infoList.push({
                title: '邮箱：',
                content: invoiceInfo.cemail
            });
        } else if (invoiceInfo.cstatus === '8') {
            infoList.push({
                title: '单位名称：',
                content: invoiceInfo.cinsuredNme
            });
            infoList.push({
                title: '价税合计（小写）：',
                content: '¥' + (+invoiceInfo.nprice / 100).toFixed(2)
            });
            infoList.push({
                title: '手机号：',
                content: invoiceInfo.cmobile
            });
            infoList.push({
                title: '邮箱：',
                content: invoiceInfo.cemail
            });
        }
        return infoList;
    },
    getMessage: {
        '1': '您提交的信息正在审核中，请耐心等待......',
        '2': '可以直接打印电子发票了噢！',
        '3': '您的发票正在有机，请耐心等待......',
    },
    checkMessageStaus: (status) => {
        if (status === '7') {
            return 2
        } else if (status === '9') {
            return 3
        } else {
            return 1
        }
    }
}