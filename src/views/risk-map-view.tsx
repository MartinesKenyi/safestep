import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth/auth-context';
import { DelictivosContext } from '../context/auth/delictivo-context';
import { useMapbox } from '../hooks/useMapbox';

const classes = {
  main: 'risk-map',
  mapContainer: 'risk-map__map-container',
  wrapInfo: 'risk-map__wrap-info',
}

const initialPoint = {
  longitude: -77.0351,
  latitude: -12.0644,
  zoom: 13.5
}

export const RiskMapView = () => {
  
  const { user } = useContext(AuthContext);
  const { delictivos } = useContext(DelictivosContext);
  const {coords, setRef, addMarker} = useMapbox(initialPoint);

  useEffect(() => {
    delictivos.forEach(delictivo => {
      if (delictivo.latitude !== 0 && delictivo.longitude !==0 ) {
        addMarker(delictivo);
      }
    });
  }, [delictivos, addMarker])

  return (
    <div className={classes.main}>

      <div className={classes.wrapInfo}>
        <h4>Usuario: {user?.name}</h4>
        Ubicación: {coords.longitude} | {coords.latitude}
      </div>

      <div
        ref={setRef}
        className={classes.mapContainer}
      />

    </div>
  )
}
