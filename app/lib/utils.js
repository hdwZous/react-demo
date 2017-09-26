
const util = {

    isVaildMobile:(mobile)=>{
        return /^1[3|4|5|7|8]\d{9}/ig.test(mobile);
    },
    isIdCard: (idCard)=> {
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(idCard);
    },
    isPassport:  (passport) =>{
        return /^((P\d{7})|(E\d{8})|(G\d{8}))$/.test(passport);
    },
    isVaildName:  (name)=>{
        return /^[\u4E00-\u9FA5]{2,20}$/.test(name);
    },
    isCertificate: (certificate)=> {
        return /^[a-zA-Z0-9]{7,21}$/.test(certificate);
    },
    isUppercaseNumber: (value) =>{
        return /^[A-Z0-9]{8,50}$/.test(value);
    },
    isValidISO:  (ISO) =>{
        return /^[a-zA-Z]{3}\d{12}$/.test(ISO);
    },
    isCarNumber: (carNumber) =>{
        return /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/.test(carNumber);
    },
    isVaildEmail: (email) =>{
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(email);
    },

    setStore: function (key, value) {
        window.localStorage.setItem(key, value);
    },
    getStore: function (key) {
        return window.localStorage.getItem(key);
    },
    removeStore: function (key) {
        window.localStorage.removeItem(key);
    },

}

export default util
