/**
 * @prettier
 */
import React from 'react';

import './styles.scss';
import Icon from '../icon';

const Button = (props) => {
  return (
    <button className="btn-root">
      {props.iconName && (
        <div className="icon">
          <Icon
            iconWidth={props.iconWidth || null}
            iconHeight={props.iconHeight || null}
            name={props.iconName}
            color="white"
          />
        </div>
      )}
      <span>{props.title}</span>
    </button>
  );
};

export default Button;
