import { useState } from 'react';

export const useForm = ( initialState: any = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (newState = initialState ) => {
        setValues( newState );
    }

    const handleInputChange = (object: any) => {
        if (object?.target) {
            const {target} = object;
            return setValues({
                ...values,
                [ target.name ]: target.value
            });
        }
        setValues({
            ...values,
            [ object.name ]: object.value
        });
    }
    const handleSetValues = (setState: any = {}) => {
        setValues(setState)
    }

    return [ values, handleInputChange, reset, handleSetValues ];
}