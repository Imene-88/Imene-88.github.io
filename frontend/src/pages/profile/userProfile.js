import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './profile.module.css'
import UserProfileComponent from '../../components/profile/UserProfileComponent'


function UserProfile() {
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <UserProfileComponent />
        </div>
      </div>
    </>
  )
}

export default UserProfile