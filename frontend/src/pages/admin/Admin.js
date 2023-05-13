import React, { useContext, useEffect } from 'react';
import Panels from '../../components/panels/Panels';
import RecentUsers from '../../components/recent_users/RecentUsers';
import styles from './Admin.module.css';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import socket from '../../SOCKET_CONNECTION';
import { AuthContext } from '../../context/AuthContext';
import RecentReports from '../../components/recent_reports/RecentReports';

function Admin() {

  const {user: loggedInUser} = useContext(AuthContext);

  useEffect(() => {
    socket.emit("connectedUser:add", loggedInUser._id);
  }, [loggedInUser._id]);

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
                  <RecentReports />
                </div>
            </div>
        </div>
      </div>      
    </>
  )
}

export default Admin