/**
 * @prettier
 */

import React from 'react';

import Button from './ui-kit/button';
import Select from './ui-kit/select';

import './styles/reset.scss';
import './styles/styles.scss';

const App = () => {
  return (
    <div className="App">
      <Button title="title" iconName="church" />
      <Select value="" />
    </div>
  );
};

export default App;
