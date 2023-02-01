/**
 * @prettier
 */
import React, { useState, useEffect } from 'react';

import Header from '../../components/header';

import ChurchesListService from '../../services/churches';

import './styles.scss';

const OPTIONS = [
  {
    label: 'Select city',
    key: 'Select city',
    lat: null,
    long: null,
    id: 0,
  },
  {
    label: 'New York',
    key: 'New York',
    lat: 40.73061,
    long: -73.935242,
    id: 1,
  },
  {
    label: 'Chicago',
    key: 'Chicago',
    lat: 41.881832,
    long: -87.623177,
    id: 2,
  },
  {
    label: 'Boston',
    key: 'Boston',
    lat: 42.361145,
    long: -71.057083,
    id: 3,
  },
  {
    label: 'Oakland',
    key: 'Oakland',
    lat: 37.804363,
    long: -122.271111,
    id: 4,
  },
];

const MainPage = () => {
  const [currentCity, setCurrentCity] = useState(0);

  const getData = async (lat, long) => {
    try {
      const result = await ChurchesListService.getChurchesListData(lat, long);

      console.log(result);
    } catch {
      return Promise.reject();
    }
  };

  useEffect(() => {
    if (currentCity) {
      const city = OPTIONS.find((el) => el.id === Number(currentCity));
      getData(city.lat, city.long);
    }
  }, [currentCity]);

  return (
    <div id="main-page">
      <Header currentCity={currentCity} setCurrentCity={setCurrentCity} citiesList={OPTIONS} />
    </div>
  );
};

export default MainPage;
