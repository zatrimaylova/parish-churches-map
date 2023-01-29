/**
 * @prettier
 */
import React from 'react';

const icons = {
  church: {
    renderIcon: ({ width, height, color }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        width={width}
        viewBox="0 0 512 512"
        fill={color}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M390.746,240.952H230.967v-16.96l-95.997-110.007V61.706h36.565V34.29h-36.565V0h-27.433v34.29H70.972v27.417   h36.566v52.295L11.541,223.993V512h83.427v-84.24c0-14.513,11.781-26.286,26.286-26.286c14.521,0,26.287,11.774,26.287,26.286V512   h67.001h16.425V373.291h19.816V512h139.963h109.713V366.665L390.746,240.952z M345.325,465.742h-39.631v-47.557h39.631V465.742z    M428.55,465.742h-39.631v-47.557h39.631V465.742z" />
      </svg>
    ),
  },
};

export default icons;
