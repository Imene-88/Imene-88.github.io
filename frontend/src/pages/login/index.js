import React, { useContext, useRef } from 'react'
import styles from '../registration/register.module.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import typewriter from '../../assets/typewriter.png';
import { loginAPICall } from '../../API_CALLS';
import { AuthContext } from '../../context/AuthContext';

function Login() {

  const userEmail = useRef();
  const userPassword = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const userLogin = (e) => {
    e.preventDefault();
    loginAPICall(
      { email: userEmail.current.value, password: userPassword.current.value },
      dispatch
    );
  };

  console.log(user);

  return (
    <div className={styles.container}>
        <img src={logo} alt="Logo of website" width="170" height="89" />
        <div className={styles.subContainer}>
            <h2 className={styles.loginPart}>Sign In</h2>
            <form method='post' className={styles.login} onSubmit={userLogin}>
                <div className={styles.inputBox}>
                    <input type='email' required placeholder='Email' ref={userEmail} />
                </div>
                <div className={styles.inputBox}>
                    <input type='password' required placeholder='Password' ref={userPassword} />
                </div>
                {isFetching ? "Loading..." : <input type="submit" value='Sign in' />}
                

                <p>Do not have an account? <Link to='/register'>Sign Up</Link></p>
            </form>
        </div>
        <img src={typewriter} alt="typewriter" width="350" height="350" />
    </div>
  )
}

export default Login