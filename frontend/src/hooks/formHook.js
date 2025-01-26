import { useReducer, useCallback } from 'react';  

const formReducer = (state, action) => {
  switch(action.type) {
    case "INPUT_CHANGE": {
      let isValid = true;
      for(const id in state.inputs){
        if(id === action.id){
          isValid = isValid && action.isValid;
        }else {
          isValid = isValid && state.inputs[id].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: {value: action.value, isValid: action.isValid},
        },
        isValid: isValid,
      }
    }
  }
}

export const useForm = (initialInputs, initialIsValid) => {

  const [formState, dispatch] = useReducer(formReducer, {initialInputs, initialIsValid});

  const onInput = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      id: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  return {formState, onInput}
}