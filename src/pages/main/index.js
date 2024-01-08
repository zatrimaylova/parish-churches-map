/**
 * @prettier
 */
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import Header from '../../components/header';
//import Marker from '../../ui-kit/marker';

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
  'pk.eyJ1IjoibWFyaWEwMDAwMSIsImEiOiJjbGVuODN1Ym0wNHQ1M3RwYWIwaG9wZ282In0.mNhGxXBnFDmEd0lvjm2LtQ';

const MarkerEl = (props) => {
  return useMemo(() => {
    return (
      <Marker longitude={props.longitude} anchor="center" latitude={props.latitude} key={props.id}>
        <div className="marker" />
      </Marker>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id, props.longitude, props.latitude]);
};
const MainPage = () => {
  const [currentCity, setCurrentCity] = useState(useSelector((store) => store.city));
  //const [page, setPage] = useState(1);
  //const [zoom, setZoom] = useState(12);

  const markersList = useSelector((store) => store.churchesList);

  const [viewPort, setViewPort] = useState({
    latitude: null,
    longitude: null,
  });

  const mapRef = React.useRef();
  //const intervalRef = useRef(14);

  const getData = async (lat, long, page = 1) => {
    try {
      const page1 = await ChurchesListService.getChurchesListData(lat, long, page);
      //const page2 = await ChurchesListService.getChurchesListData(lat, long, 2);
      //const page3 = await ChurchesListService.getChurchesListData(lat, long, 3);
      //const page4 = await ChurchesListService.getChurchesListData(lat, long, 4);

      const listToStore = editChurchesList([...page1]);

      dispatch({ type: 'ADD_CHURCHES_lIST', payload: listToStore });
      //CLEAR_CHURCHES
      //dispatch({ type: 'CLEAR_CHURCHES_LIST'});
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

  const dispatch = useDispatch(); // слушаем как изменяется зум и отправляем ещё один запрос, чтобы было больше точек издалека

  useEffect(() => {
    if (Number(currentCity)) {
      const city = OPTIONS.find((el) => el.id === Number(currentCity));
      dispatch({ type: 'CHANGE_CITY', payload: Number(currentCity) });
      //dispatch({ type: 'CLEAR_CHURCHES_LIST' });

      //getData(city.lat, city.long);
      //getData(city.lat, city.long, 2);
      setViewPort({
        latitude: city.lat,
        longitude: city.long,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [String(currentCity)]);

  useEffect(() => {
    //if (Number(currentCity)) {
    //const city = OPTIONS.find((el) => el.id === Number(currentCity));
    //dispatch({ type: 'CHANGE_CITY', payload: Number(currentCity) });
    //getData(city.lat, city.long);
    //getData(city.lat, city.long, 2);
    // setViewPort({
    //   latitude: city.lat,
    //   longitude: city.long,
    // });
    //}
    const city = OPTIONS.find((el) => el.id === Number(currentCity));

    if (!city.lat && !city.long) {
      return;
    }
    for (let i = 1; i <= 4; ++i) {
      getData(city.lat, city.long, i);
    }
    //getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(viewPort)]);

  const onDrag = (newView) => {
    setTimeout(() => {
      setViewPort({
        latitude: newView.viewState.latitude,
        longitude: newView.viewState.longitude,
      });
    }, [100]);
  };

  // const onZoom = (zoom) => {
  //   // console.log(
  //   //   Math.floor(intervalRef.current) > Math.floor(zoom),
  //   //   (Math.floor(intervalRef.current), Math.floor(zoom)),
  //   // );
  //   console.log(zoom.viewState.zoom);
  //   //setZoom(zoom.viewState.zoom);
  //   //setZoom(zoom);
  //   //zoom;
  //   //if (Math.floor(intervalRef.current) > Math.floor(zoom.viewState.zoom)) {
  //   //intervalRef.current = Math.floor(zoom);
  //   //setPage(page + 1);
  //   //getData(city.lat, city.long, page);
  //   //}
  //   setTimeout(() => {
  //     setZoom(zoom.viewState.zoom);
  //   }, [1000]);
  // };

  return (
    <div id="--main-page">
      <Header currentCity={currentCity} setCurrentCity={setCurrentCity} citiesList={OPTIONS} />
      <div className="map_container">
        <Map
          mapboxAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          {...viewPort}
          ref={mapRef}
          //initialViewState={{ zoom: zoom || 14 }}
          initialViewState={{ zoom: 12 }}
          onDrag={onDrag}
          width="100%"
          height="100%"
          //onZoom={onZoom}
        >
          {markersList?.length &&
            markersList.map((el) => {
              return (
                // <Marker longitude={el.longitude} latitude={el.latitude} anchor="center" key={el.id}>
                //   <div className="marker" />
                // </Marker>
                <MarkerEl
                  longitude={el.longitude}
                  latitude={el.latitude}
                  anchor="center"
                  id={`${el.id}${el.longitude}`}
                />
              );
            })}
        </Map>
      </div>
    </div>
  );
};

export default MainPage;
