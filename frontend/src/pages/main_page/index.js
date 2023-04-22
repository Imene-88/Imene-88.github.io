import React, { useContext, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './main_page.module.css';
import Following from '../../components/following/Following';
import Middle from '../../components/middle/Middle';
import { AuthContext } from '../../context/AuthContext';
import socket from '../../SOCKET_CONNECTION';

function MainPage() {

  const { user: loggedInUser} = useContext(AuthContext);

  //useEffect(() => {
  //  socket.emit("connectedUser:add", loggedInUser._id);
  //  return () => {
  //    socket.disconnect();
  //  }
  //}, [socket, loggedInUser._id]);
  
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.wrapper}>
            <Middle />
            <div className={styles.right}>
              <Following />
            </div>
          </div>
        </div>
      </div>      
    </>
  )
}

export default MainPage