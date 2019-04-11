import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './components/container/App';
import SigninContainer from './components/container/SigninContainer';

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();

// const Init = () => {
// return (
// <Router>
// <Switch>
// <Route exact path="/" component={App} />
// <Route path="/signin" Component={SigninContainer} />
// </Switch>
// </Router>
// );
// };
