/**
 * @prettier
 */

import React from 'react';

import './styles.scss';

import Icon from '../../ui-kit/icon';
import Select from '../../ui-kit/select';

const Header = (props) => {
  //const [currentCity, setCurrentCity] = useState(0);

  return (
    <header id="header-root">
      <div className="logo">
        <div>
          <Icon name="church" width="44px" height="44px" color="#18333E" />
        </div>
        <div>
          <h1>PCM</h1>
        </div>
      </div>
      <div className="city">
        <Select
          value={props.currentCity}
          onChange={props.setCurrentCity}
          options={props.citiesList}
        />
      </div>
    </header>
  );
};

export default Header;
