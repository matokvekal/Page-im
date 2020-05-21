import React, { useState } from 'react';
import ConfigContextProvider from './context/ConfigContext';

import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrimarySearchAppBar from './components/layouts/PrimarySearchAppBar';
import Pageim from './components/Pageim';
import './App.css';


function App() {

  let currentDir = window.localStorage.getItem('AppDirection');
  if (currentDir == null || (currentDir !== 'rtl' && currentDir !== 'ltr'))
    currentDir = 'ltr'

  let screenView='table';
  const [AppDirection, setAppDirection] = useState(currentDir ? currentDir : 'ltr')
  const [screenType, setScreenType] = useState(screenView ? screenView : 'table')

  return (
    <div className={AppDirection}>
      <Router>
          <PrimarySearchAppBar setAppDirection={setAppDirection} AppDirection={AppDirection} setScreenType={setScreenType} screenType={screenType}/>
          <Route exact path='/UploadFile' component={UploadFile} />
          <ConfigContextProvider>
            <Route exact path='/Pageim'><Pageim screenType={screenType} /> </Route>
          </ConfigContextProvider>
      </Router>
    </div>
  );
}

export default App;
