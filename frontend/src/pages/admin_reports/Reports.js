import React from 'react';
import styles from '../admin_reports/Reports.module.css';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

function Reports() {
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.wrapper}>
            <p>Reports</p>
          </div>
        </div>
      </div>      
    </>
  )
}

export default Reports