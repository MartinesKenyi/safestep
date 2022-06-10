import { Delictivo } from '../../interfaces/delictivo-interfaces';

export interface DelictivoState {
    delictivos: Delictivo[];
    errorMessage: string;
}

type DelictivoAction =
    | { type: 'loadDelictivo', payload: { delictivos: any } }
    | { type: 'addDelictivo', payload: { delictivo: Delictivo } }
    | { type: 'updateDelictivo', payload: { id: string, delictivo: any } }
    // | { type: 'updateDelictivo', payload: { delictivo: any } }
    | { type: 'removeError' }
    | { type: 'addError', payload: string }

export const delictivoReducer = (state: DelictivoState, action: DelictivoAction): DelictivoState => {
    switch (action.type) {
        case 'loadDelictivo':
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