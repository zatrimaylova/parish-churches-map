/**
 * @prettier
 */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map from 'react-map-gl';

import Header from '../../components/header';
import Marker from '../../ui-kit/marker';
import './styles.scss';

import ChurchesListService from '../../services/churches';

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

const REACT_APP_MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoibWFyaWEwMDAwMSIsImEiOiJjbGUxNTdwMGgwanR2M29wNW52aGw5bDhwIn0.chHIxeasZgfo26KK70LjlA';

const mapStyles = {
  width: '100vw',
  height: '100vh',
};

const MainPage = () => {
  const [currentCity, setCurrentCity] = useState(useSelector((store) => store.city));

  const [viewPort, setViewPort] = useState({
    latitude: 39.4408671,
    longitude: -99.5510316,
    zoom: 10,
  });

  const getData = async (lat, long) => {
    try {
      const result = await ChurchesListService.getChurchesListData(lat, long);

      const listToStore = editChurchesList(result);

      dispatch({ type: 'ADD_CHURCHES_lIST', payload: listToStore });
    } catch {
      return Promise.reject();
    }
  };

  const editChurchesList = (list) => {
    const editedList = list.reduce((resultList, church) => {
      const churchData = {
        name: church.name,
        url: church.url,
        address: {
          providence: church.church_address_providence_name,
          detailedAddress: church.church_address_street_address,
          directions: church.directions,
        },
        latitude: church.latitude,
        longitude: church.longitude,
        id: church.id,
        phone: church.phone_number,
        pastorsName: church.pastors_name,
      };

      resultList.push(churchData);

      return resultList;
    }, []);

    return editedList;
  };

  const dispatch = useDispatch();
  console.log(viewPort);

  useEffect(() => {
    if (Number(currentCity)) {
      const city = OPTIONS.find((el) => el.id === Number(currentCity));
      getData(city.lat, city.long);
      dispatch({ type: 'CHANGE_CITY', payload: Number(currentCity) });
      setViewPort({
        latitude: city.lat,
        longitude: city.long,
        zoom: 10,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCity]);

  return (
    <div id="main-page">
      <Header currentCity={currentCity} setCurrentCity={setCurrentCity} citiesList={OPTIONS} />
      <Map
        // {...viewPort}
        mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={mapStyles}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // onViewportChange={(viewport) => {
        //   console.log(viewport);
        //   setViewPort(viewport);
        // }}
        initialViewState={viewPort}
      >
        Maaaaaaaaap
        <Marker />
      </Map>
    </div>
  );
};

export default MainPage;
