import React, { useContext, useRef } from 'react';
import styles from '../../pages/new_admin/NewAdmin.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { registerAPICall } from '../../API_CALLS';

function NewAdminForm() {

    const navigate = useNavigate();

    const userFullname = useRef();
    const userUsername = useRef();
    const userColorBlindness = useRef();
    const userEmail = useRef();
    const userPassword = useRef();
    const userRole = useRef();
    const {isFetching, error, dispatch} = useContext(AuthContext);

    const adminRegister = (event) => {
        event.preventDefault();
        registerAPICall({
            full_name: userFullname.current.value, 
            username: userUsername.current.value, 
            type_of_color_blindness: userColorBlindness.current.value, 
            password: userPassword.current.value, 
            email: userEmail.current.value,
            role: userRole.current.value
        }, dispatch);
        navigate("/users", { replace: true });
    };

  return (
    <form method='post' onSubmit={adminRegister}>
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
        <div className={styles.inputBox}>
            <input type='hidden' value="Admin" ref={userRole} />
        </div>
        <div className={styles.formActions}>
            <Link to={"/users"}>
                <button className={styles.cancelBtn}>Cancel</button>
            </Link>
            <button type="submit" className={styles.addBtn}>Add Admin</button>
        </div>
    </form>
  )
}

export default NewAdminForm