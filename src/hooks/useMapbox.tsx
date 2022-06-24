import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import { Delictivo } from "../interfaces/delictivo-interfaces";
mapboxgl.accessToken = 'pk.eyJ1IjoiYW1hcnRpbmV6NTciLCJhIjoiY2w0c3Bkcjd4MGI0YjNjazB6NmVvbWlhcSJ9.9YFU6ur6EoC3J8SCl5ZLxQ';

interface InitialPoint {
    longitude: number,
    latitude: number,
    zoom: number,
}

export const useMapbox = (initialPoint: InitialPoint) => {

    const mapDiv = useRef<any>();
    const setRef = useCallback((node: any) => {
        mapDiv.current = node
    }, []);

    const mapa = useRef<any>();
    // Referencia los marcadores
    const marcadores = useRef<any>({});
    const [coords, setCoords] = useState(initialPoint);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [initialPoint.longitude, initialPoint.latitude],
            zoom: initialPoint.zoom
        });

        mapa.current = map;
    }, [initialPoint]);

    useEffect(() => {
        mapa.current?.on('move', () => {
            const { lng, lat } = mapa.current.getCenter()
            setCoords({
                longitude: lng.toFixed(4),
                latitude: lat.toFixed(4),
                zoom: mapa.current.getZoom
            })
        })
    }, [])

    const addMarker = useCallback( (delictivo: Delictivo ) => {
    
        const description = `<p className="risk-map__marker-title">${delictivo.title}</p>`

        const marker: any = new mapboxgl.Marker();
        marker.id = delictivo.id;
        
        marker
            .setLngLat([ delictivo.longitude, delictivo.latitude ])
            .addTo( mapa.current )
            .setPopup(new mapboxgl.Popup().setHTML(description))

        // Asignamos al objeto de marcadores
        marcadores.current[ marker.id ] = marker;

    },[]);

    return { coords, setRef, addMarker }
}
