import React from 'react';
import styles from './LocalState.scss';
import inputInfo from '../img/inputInfo.png';
import DefaultAudit from '../img/default-audit.png';
import DefaultApproval from '../img/default-approval.png';
import DefaultLine from '../img/default-line.png';
import activeCheck from '../img/active-check.png';
import activeFinish from '../img/active-finish.png';
import ProgressLine from '../img/progress-line.png';
import activeOk from '../img/active-ok.png';

const Component = React.createClass({
    render () {
        let {flag} = this.props;
        return (
            <div className={styles.localstate}>
                <ul>
                    <li>
                        {
                            flag === 'set' && <img src={inputInfo}/>
                        }
                        {
                            flag !== 'set' && <img src={activeOk}/>
                        }
                        <img src={ProgressLine} className={styles.stateLine}/>
                        <span className={styles.currentColor}>录入信息</span>
                    </li>
                    <li>
                        {
                            flag === 'set' && <img src={DefaultLine} className={styles.stateLine}/>
                        }
                        {
                            flag !== 'set' && <img src={ProgressLine} className={styles.stateLine}/>
                        }
                        {
                            flag === 'set' && <img src={DefaultAudit}/>
                        }
                        {
                            flag === 'wait' && <img src={activeCheck}/>
                        }
                        {
                            flag === 'finish' && <img src={activeOk}/>
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