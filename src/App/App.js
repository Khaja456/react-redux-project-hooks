import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alertActions } from '../ReduxActions';

import { Login } from '../Login';
import { Registration } from '../Registration';
import { Home } from '../Home';

import { history } from '../Utils';

function App() {
  const { alertResponse: { message, type } } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen(() => {
      dispatch(alertActions.clear());
    }, []);
  });

  return (
    <div className='jumbotron'>
      <div className='container'>
        <div className='col-md-8 offset-md-2'>
          {message &&
            <div className={`alert ${type}`}>{message}</div>
          }
          <Router history={history}>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Registration />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
