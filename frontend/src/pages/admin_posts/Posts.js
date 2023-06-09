import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from '../users/Users.module.css';
import UsersPosts from '../../components/users_posts/UsersPosts';

function Posts() {
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.wrapper}>
            <p>Posts</p>
            <UsersPosts />
          </div>
        </div>
      </div>      
    </>
  )
}

export default Posts