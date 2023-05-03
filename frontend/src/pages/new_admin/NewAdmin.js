import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './NewAdmin.module.css';
import NewAdminForm from '../../components/new_admin_form/NewAdminForm';

function NewAdmin() {
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.wrapper}>
            <p>Add New Admin</p>
            <NewAdminForm />
          </div>
        </div>
      </div>      
    </>
  )
}

export default NewAdmin