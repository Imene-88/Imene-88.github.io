import React, { useContext, useRef } from 'react'
import styles from './register.module.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';
import onlineDocument from '../../assets/Online_document.png';
import { registerAPICall } from '../../API_CALLS'
import { AuthContext } from '../../context/AuthContext';

function Register() {
    const userFullname = useRef();
    const userUsername = useRef();
    const userColorBlindness = useRef();
    const userEmail = useRef();
    const userPassword = useRef();
    const {isFetching, error, dispatch} = useContext(AuthContext);

    const userRegister = (event) => {
        event.preventDefault();
        registerAPICall({
            full_name: userFullname.current.value, 
            username: userUsername.current.value, 
            type_of_color_blindness: userColorBlindness.current.value, 
            password: userPassword.current.value, 
            email: userEmail.current.value
        }, dispatch);
    };
  return (
    <div className={styles.container}>
        <img src={logo} alt="Logo of website" width="170" height="89" />
        <div className={styles.subContainer}>
            <h2>Sign Up</h2>
            <form method='post' onSubmit={userRegister}>
                <div className={styles.inputBox}>
                    <input type='text' placeholder='Full name' required ref={userFullname} />
                </div>
                <div className={styles.inputBox}>
                    <input type='text' placeholder='Username' required ref={userUsername} />
                </div>
                <div className={styles.inputBox}>
                    <select name="colors" id="colors" required ref={userColorBlindness}>
                        <option value="" id='first-option'>Type of color blindness</option>
                        <option value="deutranomaly">Deutranomaly</option>
                        <option value="protanomaly">Protanomaly</option>
                        <option value="protanopia">Protanopia</option>
                        <option value="deutranopia">Deutranopia</option>
                        <option value="tritanomaly">Tritanomaly</option>
                        <option value="tritanopia">Tritanopia</option>
                        <option value="monochromacy">Monochromacy</option>
                        <option value="none">None</option>
                    </select>
                </div>
                <div className={styles.inputBox}>
                    <input type='email' placeholder='Email' required ref={userEmail} />
                </div>
                <div className={styles.inputBox}>
                    <input type='password' placeholder='Password' required ref={userPassword} />
                </div>
                <input type="submit" value='Sign up' />
                <p>Already have an account? <Link to='/login'>Sign In</Link></p>
            </form>
        </div>
        <img src={onlineDocument} alt="online document" width="350" height="350" />
    </div>
  )
}

export default Register