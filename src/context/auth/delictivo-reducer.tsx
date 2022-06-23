import { Delictivo } from '../../interfaces/delictivo-interfaces';

export interface DelictivoState {
    delictivosReports: Delictivo[]; // son todos en general para reporte
    delictivos: Delictivo[]; // son los delictivos para el los usuarois superiores
    preventives: Delictivo[]; // son los delictivos para el publico
    errorMessage: string;
}

type DelictivoAction =
    | { type: 'loadDelictivoReports', payload: { delictivosReports: any } }
    | { type: 'addDelictivoReport', payload: { delictivoReport: Delictivo } }
    | { type: 'updateDelictivoReport', payload: { id: string, delictivoReport: any } }

    | { type: 'loadDelictivos', payload: { delictivos: any } }
    | { type: 'addDelictivo', payload: { delictivo: Delictivo } }
    | { type: 'updateDelictivo', payload: { id: string, delictivo: any } }

    | { type: 'loadPreventives', payload: { delictivos: any } }
    | { type: 'addPreventive', payload: { delictivo: Delictivo } }
    | { type: 'updatePreventive', payload: { id: string, delictivo: any } }

    | { type: 'removeError' }
    | { type: 'addError', payload: string }

export const delictivoReducer = (state: DelictivoState, action: DelictivoAction): DelictivoState => {
    switch (action.type) {
        case 'loadDelictivoReports':
            return {
                ...state,
                delictivosReports: action.payload.delictivosReports
            }

        case 'addDelictivoReport':
            // NOSE PORQUE SE EJECUTA DOS VECES
            // CON ESTO YA LO CONTROLAMOS
            if (!state.delictivosReports.find(prev => prev.title === action.payload.delictivoReport.title)) {
                state.delictivosReports.unshift(action.payload.delictivoReport)
            }
            return {
                ...state,
                delictivosReports: [...state.delictivosReports]
            }
        case 'updateDelictivoReport':
            return {
                ...state,
                delictivosReports: [...state.delictivosReports.map(delicitvo => delicitvo.id === action.payload.id
                    ? action.payload.delictivoReport
                    : delicitvo
                )]
            }

        case 'loadDelictivos':
            return {
                ...state,
                delictivos: action.payload.delictivos
            }

        case 'addDelictivo':
            state.delictivos.unshift(action.payload.delictivo)
            return {
                ...state,
                delictivos: [...state.delictivos]
            }
        case 'updateDelictivo':
            return {
                ...state,
                delictivos: [...state.delictivos.map(delicitvo => delicitvo.id === action.payload.id
                    ? action.payload.delictivo
                    : delicitvo
                )]
            }

        case 'loadPreventives':
            return {
                ...state,
                preventives: action.payload.delictivos
            }

        case 'addPreventive':
            // NOSE PORQUE SE EJECUTA DOS VECES
            // CON ESTO YA LO CONTROLAMOS
            if (!state.preventives.find(prev => prev.title === action.payload.delictivo.title)) {
                state.preventives.unshift(action.payload.delictivo)
            }
            return {
                ...state,
                preventives: [...state.preventives]
            }
        case 'updatePreventive':
            return {
                ...state,
                preventives: [...state.preventives.map(delicitvo => delicitvo.id === action.payload.id
                    ? action.payload.delictivo
                    : delicitvo
                )]
            }


        case 'addError':
            return {
                ...state,
                errorMessage: action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };
        default:
            return state
    }
}