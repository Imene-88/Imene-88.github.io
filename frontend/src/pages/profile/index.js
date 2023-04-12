import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './profile.module.css'
import ProfileComponent from '../../components/profile/ProfileComponent'


function Profile() {
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <ProfileComponent />
        </div>
      </div>
    </>
  )
}

export default Profile