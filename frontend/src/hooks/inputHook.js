import { useReducer } from 'react';

export const  useInput = (initialValue, initialIsValid, validate) => {
  const [inputState, dispatch] = useReducer(inputReducer, {value: initialValue, isValid: initialIsValid});

  const handleChange = (value) => {
    dispatch({
      type: "CHANGE",
      value: value,
      validate: validate,
    })
  }

  return {inputState, handleChange}
}

const inputReducer = (inputState, action) => {
  switch(action.type){
    case "CHANGE":
      return {value: action.value, isValid: action.validate(action.value)};
    default:
      return inputState;
  }
}