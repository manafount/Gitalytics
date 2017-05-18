import React from 'react';
import { Provider } from 'react-redux';

// react router
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'

// react components
import App from './App';

const Root = ({ store }) => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App}/>
     </BrowserRouter>
    </Provider>
  );
};

export default Root;
