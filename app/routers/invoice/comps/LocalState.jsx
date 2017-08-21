import React from 'react';
import styles from './LocalState.scss';
import inputInfo from '../img/inputInfo.png';
import DefaultAudit from '../img/default-audit.png';
import DefaultApproval from '../img/default-approval.png';
import DefaultLine from '../img/default-line.png';
import activeCheck from '../img/active-check.png';
import activeFinish from '../img/active-finish.png';
import ProgressLine from '../img/progress-line.png';

const Component = React.createClass({
    render () {
        let {flag} = this.props;
        return (
            <div className={styles.localstate}>
                <ul>
                    <li>
                        <img src={ProgressLine} className={styles.stateLine}/>
                        <img src={inputInfo}/>
                        <span className={styles.currentColor}>录入信息</span>
                    </li>
                    <li>
                        {
                            flag === 'set' && <img src={DefaultLine} className={styles.stateLine}/>
                        }
                        {
                            flag === 'wait' && <img src={ProgressLine} className={styles.stateLine}/>
                        }
                        {
                            flag === 'set' && <img src={DefaultAudit}/>
                        }
                        {
                            flag !== 'set' && <img src={activeCheck}/>
                        }
                        <span className={flag === 'set' ? '' : styles.currentColor}>审核信息</span>
                    </li>
                    <li>
                        {
                            flag === 'finish' && <img src={activeFinish}/>
                        }
                        {
                            flag !== 'finish' && <img src={DefaultApproval}/>
                        }
                        <span className={flag === 'finish' ? styles.currentColor : ''}>审核通过</span>
                    </li>
                </ul>
            </div>
        )
    }
})

export default Component