import { useState } from 'react';

import './SignInPage.css';
import vision_md_logo from '../../assets/vision_md_logo.svg';
import { useForm } from '../../hooks/formHook.js';
import TextInput from '../../components/Form/TextInput.jsx';
import BlockButton from '../../components/UiElements/BlockButton.jsx';

export default function SignInPage(){

  const [hadAttempt, setHadAttempt] = useState(false);

  const { formState, onInput } = useForm(
    {
      username: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      }
    },
    false,
  )

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formState.isValid){
      setHadAttempt(true);
      console.log(formState);
      console.log("failure");
    }else{
      console.log("send request");
    }
  }

  return (
    <main className="sign-in-page">
      <img src={vision_md_logo}></img>
      <form className="sign-in-page__form" onSubmit={handleSubmit}>
        <TextInput className="sign-in-page__input" id="username" placeholder="Username" onInput={onInput} hadAttempt={hadAttempt} ></TextInput>
        <TextInput className="sign-in-page__input" id="password" placeholder="Password" onInput={onInput} hadAttempt={hadAttempt}></TextInput>
        <BlockButton text="Sign In" color="white" type="submit" backgroundColor="#709BFF"></BlockButton>
        <p>Don&apos;t have an account yet? <strength style={{fontWeight: '800'}}>Sign Up</strength></p>
      </form>
    </main>
  )
}