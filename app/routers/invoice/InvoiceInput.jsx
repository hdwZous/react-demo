/**
 * Created by LQ on 2017/8/15.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from './InvoiceInput.scss';
import InputIcon from './img/input-icon.png';


const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    render () {
        let aInput=[
            {
                title:'单位名称',
                icon:true
            },
            {
                title:'纳税人识别号',
                icon:true,
                text:true
            },
            {

                title:'价税合计（小写）',
                icon:true,
                color:'#f6f6f6',
                value:true
            },
            {

                title:'地址、电话',
                icon:false
            },
            {

                title:'开户行及账号',
                icon:false
            },
            {
                title:'手机号',
                icon:true
            },
            {
                title:'短信验证码',
                icon:false,
                btn:true
            },
            {
                title:'邮箱',
                icon:false
            },

        ]
        return (
            <div className={styles.invoiceInput}>
                {/*表单组件*/}
                {
                    aInput.map((item, key) => {
                        return  <div key={key} style={{backgroundColor:item.color ? item.color : '#fff'}}>
                                    {item.icon ? <img src={InputIcon}/>:''}
                                    <span>{item.title}</span>
                                    <input type="text" placeholder={item.text?item.title:'请输入'} value={item.value?'￥110.00':''} />
                                    {item.btn ? <a href="#">获取验证码</a>:''}
                               </div>

                    })
                }
                <div className={styles.submitBtn}><button>提交</button></div>
            </div>

        )
    }
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
