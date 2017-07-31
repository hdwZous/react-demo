import React from 'react';
import ReactDom from 'react-dom';
import {Router, browserHistory} from 'react-router';
let routes = require('../app/routes');

ReactDom.render((
    <Provider >
        <Router history={browserHistory} routes={routes} />
    </Provider>
), document.getElementById('content'))