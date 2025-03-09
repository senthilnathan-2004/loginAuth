/* eslint-disable react/prop-types */
import { ToastContainer } from 'react-toastify';


function Login({ name, setName, email, setEmail, pass, setPass, postLogin,button }) {
  return (
    <>
      <div className='container'>

        <h1 className='loginTitle'>Sign in</h1>
        <div className='loginItem'>
          <span className='fas fa-user'></span>
          <input type="text"
          className='loginInput'
           autoComplete='off'
            value={name}
            name='name'
            id='name'
            onChange={(e) => { setName(e.target.value); } }
            placeholder='username' />
        </div>

        <br />
        <div className='loginItem'>
          <span className='fas fa-envelope'></span>
          <input type="email"
            className='loginInput'
            value={email}
            autoComplete='off'
            name='email'
            onChange={(e) => { setEmail(e.target.value); } }
            id='email'
            placeholder='email' />
        </div>


        <br />

        <div className='loginItem'>
          <span className='fas fa-lock'></span>
          <input type="password"
            className='loginInput'
            name='password'
            value={pass}
            autoComplete='off'
            id='password'
            onChange={(e) => { setPass(e.target.value); } }
            placeholder=' password' />

        </div>

        <br />



        <br />
        <button onClick={postLogin} className='loginButton'>{button}</button>
        <ToastContainer />
      </div>


    </>
  );
}

export default Login