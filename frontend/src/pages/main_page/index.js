import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './main_page.module.css'
import Following from '../../components/following/Following'
import Middle from '../../components/middle/Middle'

function MainPage() {
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