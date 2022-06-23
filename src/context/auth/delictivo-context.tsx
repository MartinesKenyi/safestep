import React, { createContext, useEffect, useReducer } from 'react';

import { axiosConToken, fetchConToken } from '../../helpers/axios';
import { Delictivo, DelictivosResponse } from '../../interfaces/delictivo-interfaces';
import { delictivoReducer } from './delictivo-reducer';

type ProductsContextProps = {
    delictivosReports: Delictivo[]; // son todos en general para reporte
    delictivos: Delictivo[]; // son los delictivos para el los usuarois superiores
    preventives: Delictivo[]; // son los delictivos para el publico

    registerDelictivo: (tempUri: string | undefined, delictivo: Delictivo, type: string) => void;
    loadDelictivoById: (id: string) => Promise<Delictivo>;
    deleteDelictivo: (id: string) => Promise<Delictivo>;
    deleteImageDelectivo: (data: any, id: string) => Promise<void>; // TODO: cambiar ANY
    editDelictivo: (tempUri: string | undefined, delictivo: Delictivo, id: string, type: string) => void;
}

const delictivoInitialState = {
    delictivosReports: [], // son todos en general para reporte
    delictivos: [], // son los delictivos para el los usuarois superiores
    preventives: [], // son los delictivos para el publico
    errorMessage: '',
}

export const DelictivosContext = createContext({} as ProductsContextProps);

export const DelictivosProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(delictivoReducer, delictivoInitialState);

    useEffect(() => {
        loadDelictivosReports();
    }, [])

    useEffect(() => {
        loadDelictivos();
    }, [])

    useEffect(() => {
        loadPreventives();
    }, [])


    const loadDelictivosReports = async () => {
        const resp: DelictivosResponse = await axiosConToken('/delictivo/reports');
        if (resp.ok) {
            dispatch({
                type: 'loadDelictivoReports',
                payload: { delictivosReports: resp.delictivos }
            });
        } else {
            dispatch({
                type: 'addError',
                payload: JSON.stringify(resp)
            });
        }
    }
    const loadDelictivos = async () => {
        const resp: DelictivosResponse = await axiosConToken('/delictivo/privates');
        if (resp.ok) {
            dispatch({
                type: 'loadDelictivos',
                payload: { delictivos: resp.delictivos }
            });
        } else {
            dispatch({
                type: 'addError',
                payload: JSON.stringify(resp)
            });
        }
    }
    const loadPreventives = async () => {
        const resp: DelictivosResponse = await axiosConToken('/delictivo/publics');
        if (resp.ok) {
            dispatch({
                type: 'loadPreventives',
                payload: { delictivos: resp.delictivos }
            });
        } else {
            dispatch({
                type: 'addError',
                payload: JSON.stringify(resp)
            });
        }
    }


    const registerDelictivo = async (tempUri: any | undefined, delictivo: Delictivo | any, type: string) => {
        let formData = new FormData();

        if (tempUri) {
            formData.append("archive", tempUri);
        }
        Object.keys(delictivo).forEach(key => {
            formData.append(key, delictivo[key])
        });

        const resp = await fetchConToken('/delictivo', 'POST', formData);
        if (resp.ok) {
            if (type === 'preventive') {
                dispatch({
                    type: 'addPreventive',
                    payload: { delictivo: resp.delictivo }
                });
            } else if(type === 'delictivo') {
                dispatch({
                    type: 'addDelictivo',
                    payload: { delictivo: resp.delictivo }
                });
            }
            dispatch({
                type: 'addDelictivoReport',
                payload: { delictivoReport: resp.delictivo }
            });

            return resp
        } else {
            dispatch({
                type: 'addError',
                payload: JSON.stringify(resp)
            });
            return resp
        }
    }

    const editDelictivo = async (tempUri: any | undefined, delictivo: Delictivo | any, id: string, type: string) => {
        let formData = new FormData();

        if (tempUri) {
            formData.append("archive", tempUri);
        }
        Object.keys(delictivo).forEach(key => {
            formData.append(key, delictivo[key])
        });

        const resp = await fetchConToken(`/delictivo/${id}`, 'PUT', formData);
        if (resp.ok) {
            if (type === 'preventive') {
                dispatch({
                    type: 'updatePreventive',
                    payload: { id, delictivo: resp.delictivo }
                });
            } else if(type === 'delictivo') {
                dispatch({
                    type: 'updateDelictivo',
                    payload: { id, delictivo: resp.delictivo }
                });
            }
            return resp
        } else {
            dispatch({
                type: 'addError',
                payload: JSON.stringify(resp)
            });
            return resp
        }
    }

    const loadDelictivoById = async (id: string): Promise<Delictivo> => {
        const resp: Delictivo = await axiosConToken(`/delictivo/${id}`);
        return resp;
    };

    const deleteDelictivo = async (id: string) => {
        const resp: Delictivo = await axiosConToken(`/delictivo/${id}`, {}, 'DELETE');
        return resp;
    }

    // TODO: cambiar ANY
    const deleteImageDelectivo = async (data: any, id: string) => {
    }

    return (
        <DelictivosContext.Provider value={{
            ...state,
            registerDelictivo,
            loadDelictivoById,
            deleteDelictivo,
            deleteImageDelectivo,
            editDelictivo
        }}>
            {children}
        </DelictivosContext.Provider>
    )
}
