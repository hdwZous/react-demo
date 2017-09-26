import React from "react";

import {browserHistory} from 'react-router';
import browserEnv from "../../lib/browserEnv";
let styles = require('./Header.scss');
import arrowdown from "./img/home_arrow_down.png";

export default class Header extends React.Component {

    back() {
        if (this.props.backFn) {
            this.props.backFn();
        } else {
            if (/\bbackToHome\b/.test(location.search)) {
                location.href = '/'
            } else {
                window.history.back();
            }
        }
    }

    getRightOpts(type) {
        if (type === 'hotline') {
            return {
                rightText: '',
                rightIcon: require('./img/hotline_yellow.png'),
                rightClick: function () {
                    location.href = "tel:95303";
                },
            }
        }

        if (type === 'cellphone') {
            return {
                rightText: '',
                rightIcon: require('./img/phone.png'),
                rightClick: function () {
                    location.href = "tel:95303";
                },
            }
        }
        return {};
    }

    getLeftOpts(type) {
        if (type === 'back') {
            return {
                leftText: '',
                leftIcon: '',
                leftClick: this.back.bind(this),
            }
        }
        if (type === 'hidden') {
            return {
                leftText: '',
                leftIcon: '',
                leftClick: function () {
                },
            }
        }
        if (type === 'city') {
            return {
                leftText: '',
                leftIcon: '',
                leftClick: function () {
                    location.href = "tel:95303";
                },
            }
        }
        return {};
    }

    render() {

        let {theme} = this.props;

        if (browserEnv.isInApp()) {
            return <div></div>
        } else {
            let {title, subTitle, subTitleClick, rightClick, rightIcon, rightText, rightType, leftClick, leftIcon, leftText, leftType} = this.props;
            rightText = rightText || this.getRightOpts(rightType).rightText || subTitle;
            rightClick = rightClick || this.getRightOpts(rightType).rightClick || subTitleClick || () => {};
            rightIcon = rightIcon || this.getRightOpts(rightType).rightIcon;
            leftType = leftType || 'back';
            leftText = leftText || this.getLeftOpts(leftType).leftText;
            leftIcon = leftIcon || this.getLeftOpts(leftType).leftIcon;
            leftClick = leftClick || this.getLeftOpts(leftType).leftClick || () => {};

            if (leftText && leftText.length > 4) {
                leftText = leftText.substr(0, 3) + '...';
            }

            if (rightText && rightText.length > 4) {
                rightText = rightText.substr(0, 3) + '...'
            }

            return (
                <div className={styles.this + ' ' + styles[theme]}>
                    <div className={styles.center}>
                        {title}
                    </div>
                    {
                        leftType !== 'hidden' && !leftIcon &&
                        <div className={`${!leftText ? styles.left : styles.leftText}`}
                             onClick={leftClick}>{leftText}
                            {leftType === 'city' && <img src={arrowdown} className={styles.arrowdown}/>}
                             </div>
                    }
                    {
                        leftIcon && <img src={leftIcon} className={styles.leftIcon} onClick={leftClick}/>
                    }
                    {
                        rightText && !rightIcon &&
                        <div className={styles.right} onClick={rightClick}>{rightText}</div>
                    }
                    {
                        rightIcon &&
                        <img src={rightIcon} className={styles.rightIcon} onClick={rightClick}/>
                    }
                </div>
            );
        }
    }
};

Header.propTypes = {
    title: React.PropTypes.string,
    backFn: React.PropTypes.func,
    theme: React.PropTypes.oneOf(['dark', 'white', 'danger', 'orange', 'red']),
};

Header.defaultProps = {
    theme: 'white',
    title: "安心保险"
};
