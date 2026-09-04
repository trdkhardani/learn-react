import { useState } from "react";
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import "./App.css";

/** Form Submission and Validation */
function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
  });

  const fakeRegisterRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5;

        if (success) {
          // setIsSubmitSuccess(true)
          resolve()
        }
        else {
          // setIsSubmitSuccess(false)
          reject(new Error('Server Error'))
        }
      }, 2000)
    })
  }

  const handleSubmit = async (ev) => {
    try {
      ev.preventDefault();

      const errors = {}

      if (form.username.trim() === "") {
        errors.username = "Username is required"
        // setError(prevError => ({...prevError, username: errors.username}));
      } else if (form.username.length < 3) {
        errors.username = "Username must be at least 3 characters"
        // setError(prevError => ({...prevError, username: errors.username}));
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (form.email.trim() === "") {
        errors.email = "Email is required"
      } else if (!emailRegex.test(form.email)) {
        errors.email = 'Please enter a valid email address'
      }

      if (form.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
        // setError(prevError => ({...prevError, password: errors.password}));
      }

      if (Object.keys(errors).length > 0) {
        setError(errors)
        return
      }

      setError({
        username: '',
        email: '',
        password: '',
      });

      setIsSubmitting(true)

      await fakeRegisterRequest()
      setIsSubmitSuccess(true)
      setSubmitError('')
      setIsSubmitSuccess(false)

      console.log(form);

      setForm({
        username: '',
        email: '',
        password: '',
      })
    } catch (err) {
      // setSubmitError(err.message)
      // console.error(submitError)
      console.error(err.message)
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={form.username}
          onChange={(ev) => setForm({...form, username: ev.target.value})}
          type="text"
          name="username"
          id="username"
        />
        {error.username && <p>{error.username}</p>}
        <br />
        <label htmlFor="email">Email</label>
        <input
          value={form.email}
          onChange={(ev) => setForm({...form, email: ev.target.value})}
          type="email"
          name="email"
          id="email"
        />
        {error.email && <p>{error.email}</p>}
        <br />
        <label htmlFor="password">Password</label>
        <input
          value={form.password}
          onChange={(ev) => setForm({...form, password: ev.target.value})}
          type="password"
          name="password"
          id="password"
        />
        {error.password && <p>{error.password}</p>}
        <br />
        <button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Registering...' : 'Register'}</button>
        { (isSubmitSuccess || submitError.length > 0) && <p>{ isSubmitSuccess ? 'Registration Successful!' : `Registration Failed: ${submitError}` }</p> }
      </form>
    </>
  );
}

/** Async Form UI */
// function App() {
//   const fakeRegisterRequest = () => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve();
//       }, 2000)
//     })
//   }

//   return (
//     <>
//     </>
//   )
// }

export default App;
