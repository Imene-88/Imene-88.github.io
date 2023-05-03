import React from 'react';
import styles from '../../pages/new_admin/NewAdmin.module.css';
import { Link } from 'react-router-dom';

function NewAdminForm() {
  return (
    <form method='post'>
        <div className={styles.inputBox}>
            <input type='text' placeholder='Full name' required /*ref={userFullname}*/ />
        </div>
        <div className={styles.inputBox}>
            <input type='text' placeholder='Username' required /*ref={userUsername}*/ />
        </div>
        <div className={styles.inputBox}>
            <select name="colors" id="colors" required /*ref={userColorBlindness}*/>
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
            <input type='email' placeholder='Email' required /*ref={userEmail}*/ />
        </div>
        <div className={styles.inputBox}>
            <input type='password' placeholder='Password' required /*ref={userPassword}*/ />
        </div>
        <div className={styles.inputBox}>
            <input type='hidden' value="Admin" />
        </div>
        <div className={styles.formActions}>
            <input type="submit" value='Add Admin' />
            <Link to={"/users"}>
                <button>Cancel</button>
            </Link>
        </div>
    </form>
  )
}

export default NewAdminForm