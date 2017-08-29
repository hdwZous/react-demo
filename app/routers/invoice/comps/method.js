let getInvoiceType = {
    normal: '007',
    special: '004',
    elec: '026'
};
module.exports = {
    getInfo: (invoiceInfo) => {
        let infoList = [];
        if (invoiceInfo.cstatus === '7') {
            infoList.push({
                title: '单位名称：',
                content: invoiceInfo.cinsuredNme
            });
            infoList.push({
                title: '纳税人识别号：',
                content: invoiceInfo.cbuyDeptCde
            });
            infoList.push({
                title: '价税合计（小写）：',
                content: '¥' + (+invoiceInfo.nprice).toFixed(2)
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
        } else if (invoiceInfo.cstatus === '1' || invoiceInfo.cstatus === '2' || invoiceInfo.cstatus === '3' || invoiceInfo.cstatus === '4' || invoiceInfo.cstatus === '5' || invoiceInfo.cstatus === '6' || invoiceInfo.cstatus === '8' || invoiceInfo.cstatus === '99') {
            console.log(1);
            if (invoiceInfo.cinvoiceType === '007' || invoiceInfo.cinvoiceType === '004') {
                infoList.push({
                    title: '单位名称：',
                    content: invoiceInfo.cinsuredNme
                });
                infoList.push({
                    title: '纳税人识别号：',
                    content: invoiceInfo.cbuyDeptCde
                });
                infoList.push({
                    title: '价税合计（小写）：',
                    content: '¥' + (+invoiceInfo.nprice).toFixed(2)
                });
                infoList.push({
                    title: '收件人姓名：',
                    content: invoiceInfo.cappNme
                });
                infoList.push({
                    title: '收件人地址：',
                    content: invoiceInfo.cpostAddress
                });
                infoList.push({
                    title: '手机号：',
                    content: invoiceInfo.cmobile
                });
            } else if (invoiceInfo.cinvoiceType === '026') {
                infoList.push({
                    title: '单位名称：',
                    content: invoiceInfo.cinsuredNme
                });
                infoList.push({
                    title: '纳税人识别号：',
                    content: invoiceInfo.cbuyDeptCde
                });
                infoList.push({
                    title: '价税合计（小写）：',
                    content: '¥' + (+invoiceInfo.nprice).toFixed(2)
                });
                infoList.push({
                    title: '手机号：',
                    content: invoiceInfo.cmobile
                });
                infoList.push({
                    title: '邮箱：',
                    content: invoiceInfo.cemail
                });
            } else {
                infoList.push({
                    title: '单位名称：',
                    content: invoiceInfo.cinsuredNme
                });
                infoList.push({
                    title: '纳税人识别号：',
                    content: invoiceInfo.cbuyDeptCde
                });
                infoList.push({
                    title: '价税合计（小写）：',
                    content: '¥' + (+invoiceInfo.nprice).toFixed(2)
                });
                infoList.push({
                    title: '手机号：',
                    content: invoiceInfo.cmobile
                });
            }
        } else if (invoiceInfo.cstatus === '9') {
            infoList.push({
                title: '单位名称：',
                content: invoiceInfo.cinsuredNme
            });
            infoList.push({
                title: '纳税人识别号：',
                content: invoiceInfo.cbuyDeptCde
            });
            infoList.push({
                title: '价税合计（小写）：',
                content: '¥' + (+invoiceInfo.nprice).toFixed(2)
            });
            infoList.push({
                title: '快递单号：',
                content: invoiceInfo.cpostNo
            });
            infoList.push({
                title: '收件人姓名：',
                content: invoiceInfo.cappNme
            });
            infoList.push({
                title: '收件人地址：',
                content: invoiceInfo.cpostAddress
            });
            infoList.push({
                title: '手机号：',
                content: invoiceInfo.cmobile
            });
        }
        return infoList;
    },
    getMessage: {
        '1': '尊敬的安心客户，我们已收到您的发票申请，工作人员将会在24小时内尽快审核，审核通过后会以短信或邮件方式通知您，祝您生活安心！',
        '2': '尊敬的安心客户，您的发票申请已通过审核，现已可以直接打印或查看，感谢您购买安心产品，祝您生活安心！',
        '3': '尊敬的安心客户，您的发票申请已通过审核，工作人员会在两个工作日内将发票快递给您，请近期查收，感谢您购买安心产品，祝您生活安心！',
    },
    checkMessageStaus: (status) => {
        if (status === '7') {
            return 2
        } else if (status === '9') {
            return 3
        } else {
            return 1
        }
    },

    getFormatData: (invoiceInfo, data, flag) => {
        let formatData = {
            cplyNo: invoiceInfo.cplyNo,
            cinsuredNme: (!data.CompanyName || data.CompanyName === "undefined") ? invoiceInfo.cinsuredNme : data.CompanyName,
            ccertfCls: invoiceInfo.ccertfCls,
            ccertfCde: invoiceInfo.ccertfCde,
            cappNo: invoiceInfo.cappNo,
            nprm: invoiceInfo.nprm,
            ctrate: invoiceInfo.ctrate,
            nvat: invoiceInfo.nvat,
            nprice: invoiceInfo.nprice,
            cappNme: (!data.Username || data.Username === "undefined") ? invoiceInfo.cappNme : data.Username,//普票必传
            cemail: (!data.Email || data.Email === "undefined") ? invoiceInfo.cemail : data.Email,//非必传
            cmobile: (!data.MobileNumber || data.MobileNumber === "undefined") ? invoiceInfo.cmobile : data.MobileNumber,
            cpostAddress: (!data.UserLoaction || data.UserLoaction === "undefined") ? invoiceInfo.cpostAddress : data.UserLoaction,//邮寄地址
            cinvoiceType: getInvoiceType[flag],//发票类型//
            cinvoiceBS: invoiceInfo.cinvoiceBS,
            cbuyDeptCde: (!data.CompanyCode || data.CompanyCode === "undefined") ? invoiceInfo.cbuyDeptCde : data.CompanyCode,
            cchannel: invoiceInfo.cchannel,
            NInvoicePrice: invoiceInfo.NInvoicePrice,//待查看
            CBuyDeptCnm: invoiceInfo.CBuyDeptCnm,
            BankNameAndAccount: (!data.BankNameAndAccount || data.BankNameAndAccount === "undefined") ? '' : data.BankNameAndAccount,
            CprodCnm: invoiceInfo.CprodCnm,
            TPlyCrtTm: invoiceInfo.TPlyCrtTm,
            veri_code: (!data.MessageCode || data.MessageCode === "undefined") ? '' : data.MessageCode,//短信
            isWeatherPerson: invoiceInfo.isWeatherPerson,
            cstatus: invoiceInfo.cstatus,
            cpostNo: invoiceInfo.cpostNo,
            csheets: invoiceInfo.csheets,
            cbuyDeptAdr: (!data.AddAndPhoneNumber || data.AddAndPhoneNumber === 'undefined') ? invoiceInfo.cbuyDeptAdr : data.AddAndPhoneNumber,
        };
        return formatData
    }
}