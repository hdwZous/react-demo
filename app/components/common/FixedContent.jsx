import React from 'react'

let FixedContent = React.createClass({

    setFontSize () {
        var ua = navigator.userAgent
        var dpr = window.devicePixelRatio || 1;
        var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
        var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
        var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
        var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
        if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
            dpr = 1
        }
        var scale = 1 / dpr + 1
        var designedWidth = 750 / scale
        let actualWidth = Math.min(450, $(window).width())
        document.documentElement.style.fontSize = actualWidth * 100 / designedWidth + 'px'
    },

    componentWillMount () {
        this.setFontSize()
    },

    componentDidMount () {
        window.addEventListener('resize', this.setFontSize)
    },

    componentWillUnmount () {
        window.removeEventListener('resize', this.setFontSize)
    },

    adjustWidth () {
        $(this.refs.content).css(this.getContentStyle())
    },

    render () {
        var {className, children, style} = this.props
        return (
            <div ref='content' className={className} style={{...style || {}}}>
                {children}
            </div>
        )
    }
})

export default FixedContent
