import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './main_page.module.css';
import Following from '../../components/following/Following';
import Middle from '../../components/middle/Middle';
import { AuthContext } from '../../context/AuthContext';
import socket from '../../SOCKET_CONNECTION';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import info from '../../assets/info.png';
import InterestsListItem from '../../components/user_interest/InterestsListItem';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function MainPage() {

  const { user: loggedInUser} = useContext(AuthContext);
  
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