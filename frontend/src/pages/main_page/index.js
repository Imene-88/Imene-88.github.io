import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import styles from './main_page.module.css'
import Following from '../../components/following/Following'
import { Users } from '../../dummyData'
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
              <div className={styles.top}>
                <p>Following</p>
                <button>See more</button>
              </div>
              {Users.map((user) => {
                return <Following key={user.id} user={user} />
              })}
            </div>
          </div>
        </div>
      </div>      
    </>
  )
}

export default MainPage