/**
 * @prettier
 */

import React, { useState, useEffect } from 'react';

import './styles.scss';

import Icon from '../icon';

// const OPTIONS = [
//   {
//     label: 'Select city',
//     key: 'Select city',
//     lat: null,
//     long: null,
//     id: 0,
//   },
//   {
//     label: 'New York',
//     key: 'New York',
//     lat: 40.73061,
//     long: -73.935242,
//     id: 1,
//   },
//   {
//     label: 'Chicago',
//     key: 'Chicago',
//     lat: 41.881832,
//     long: -87.623177,
//     id: 2,
//   },
//   {
//     label: 'Boston',
//     key: 'Boston',
//     lat: 42.361145,
//     long: -71.057083,
//     id: 3,
//   },
//   {
//     label: 'Oakland',
//     key: 'Oakland',
//     lat: 37.804363,
//     long: -122.271111,
//     id: 4,
//   },
// ];

const Select = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [actualArray, setActualArray] = useState([]);

  const handleChange = (event) => {
    props.onChange(event.target.value === 'null' ? null : event.target.value);
  };

  useEffect(() => {
    setActualArray(props.options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="select-root" disabled={props.disabled}>
      <select
        value={props.value || 0}
        disabled={props.disabled}
        onChange={handleChange}
        onFocus={() => setIsFocused(!isFocused)}
        onBlur={() => setIsFocused(!isFocused)}
      >
        {Array.isArray(actualArray) &&
          actualArray.length !== 0 &&
          actualArray.map((item) => (
            <option value={item.id} key={item.key}>
              {item.label}
            </option>
          ))}
      </select>
      <div className="icons">
        <div className="arrow">
          <Icon name="downArrow" width="20px" height="20px" color="#18333E" />
        </div>
      </div>
    </div>
  );
};

export default Select;
