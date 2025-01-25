import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './TextInput.css';
import { useInput } from '../../hooks/inputHook';

export default function TextInput(props) {

  const errorMessage = `field is required`;
  const [hasTouched, setHasTouched] = useState(false);

  const validate = (value) => {
    if(value.trim().length > 0 ){
      return true;
    }else{
      return false;
    }
  }

  const {inputState, handleChange} = useInput("", false, validate);

  const { onInput, id } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput( id , value, isValid);
  }, [onInput, id, value, isValid])

  const handleBlur = () => {
    setHasTouched(true);
  }

  return (
    <div className={`text-input ${props.className}`}>
      {!inputState.isValid && (hasTouched || props.hadAttempt) && <p>*{errorMessage}</p>}
      <input type={props.type} placeholder={props.placeholder} value={inputState.value} noValidate onChange={(e) => handleChange(e.target.value)} onBlur={handleBlur}></input>
    </div>
  )
}

TextInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hadAttempt: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
}