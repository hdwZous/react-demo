/**
 * Created by LQ on 2017/8/14.
 */
import React from 'react';
import {connect} from 'react-redux';
import styles from "./tab.scss";

const Component = React.createClass({
    componentDidMount () {
        this.props.init()
    },

    componentDidUpdate () {
    },

    render () {
        {/*��ʾtab�б�����text�жϸ���*/}
    let arr =['电子发票','普通发票','专用发票'];
    let {title} =this.props;
        return (
            <ul>
                {
                    arr.map(function(name){
                        return <li title={name}>{name}</li>
                    })
                }
            </ul>
        )
    }
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        init: () => {
        },
        tabLight: (text) => {

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)