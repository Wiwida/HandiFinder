import React from 'react';
import reactLogo from './react-logo.svg';
import store from '../../Store/Store';
import './styles.css';

const App = () => (
  <Provider store={store}>
    <div className="app">
      <img src={reactLogo} alt="react logo" />
      <h1>Composant : App</h1>
    </div>
  </Provider>
);

export default App;
