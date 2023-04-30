import React from 'react';
import Panels from '../../components/panels/Panels';
import RecentUsers from '../../components/recent_users/RecentUsers';
import Reports from '../../components/reports/Reports';
import styles from './Admin.module.css';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

function Admin() {
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
            <div className={styles.wrapper}>
                <Panels />
                <div className={styles.wrapper2}>
                  <RecentUsers />
                  <div className={styles.right}>
                    <Reports />
                  </div>
                </div>
            </div>
        </div>
      </div>      
    </>
  )
}

export default Admin