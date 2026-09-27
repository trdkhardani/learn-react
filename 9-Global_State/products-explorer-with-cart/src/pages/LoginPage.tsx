import { useEffect, useRef, useState } from 'react';
import type { Login } from '../types/user';
import { useUserStore } from '../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [loginFormField, setLoginFormField] = useState<Login>({
    email: "",
    password: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false);


  const inputRef = useRef(null);

  const login = useUserStore((state) => state.login);
  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();

  const onEmailFieldChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormField((state) => ({...state, email: ev.target.value}));
    setIsSubmitted(false);
    // setAreCredentialsCorrect(true)
  }

  const onPasswordFieldChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormField((state) => ({...state, password: ev.target.value}));
    setIsSubmitted(false);
    // setAreCredentialsCorrect(true)
  }

  console.log('user value (on render outside jsx html)');
  console.log(user);

  const handleLogin = (ev: React.SubmitEvent<HTMLFormElement>) => {
    ev.preventDefault();

    login({
      email: loginFormField.email,
      password: loginFormField.password,
    })

    setIsSubmitted(true);

    console.log('user value (when submitted)');
    console.log(user);
  }

  useEffect(() => {
    if ((user && isSubmitted) || user) {
      navigate('/', { replace: true });
      return;
    }
  }, [user, isSubmitted, navigate])

  return (
    <>
      <h1>Login</h1>
      <form id='login-form' onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input ref={inputRef} value={loginFormField.email} onChange={onEmailFieldChange} type="text" name="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input value={loginFormField.password} onChange={onPasswordFieldChange} type="password" name="password" id="password" />
        <br />
        <button type='submit'>Login</button>
      </form>
      {console.log('user value (on render inside jsx html)')}
      {console.log(user)}
      {/* {(user && isSubmitted) && navigate('/', { replace: true })} */}
      {(!user && isSubmitted) && <p>Invalid Username or Password</p>}
    </>
  );
}

export default LoginPage;
