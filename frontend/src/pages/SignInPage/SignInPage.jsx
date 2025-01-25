import vision_md_logo from '../../assets/vision_md_logo.svg';
import { useForm } from '../../hooks/formHook.js';
import TextInput from '../../components/Form/TextInput.jsx';

export default function SignInPage(){

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
      console.log(formState);
      console.log("failure");
    }else{
      console.log("send request");
    }
  }

  return (
    <div className="sign-in-page">
      <img src={vision_md_logo}></img>
      <form className="sign-in-page__form" onSubmit={handleSubmit}>
        <TextInput id="username" onInput={onInput} ></TextInput>
        <TextInput id="password" onInput={onInput}></TextInput>
        <button type="submit"></button>
      </form>
    </div>
  )
}