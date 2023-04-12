import React from 'react'
import styles from './open_collabs.module.css'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import open_document from '../../assets/doc.png'
import like_btn from '../../assets/like.png'

function OpenCollabs() {
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.open_documents}>
            <div className={styles.open_document}>
              <div className={styles.top}>
                <div className={styles.left}>
                  <img src={open_document} alt="icon of a document" width={38} height={38} />
                  <div className={styles.text}>
                    <p>The secret Life Of Plants</p>
                    <p>Description</p>
                  </div>
                  <button>Join</button>
                </div>
                <div className={styles.right}>
                  <img src={like_btn} alt="icon of heart" width={30} height={30} />
                </div>
              </div>
              <div className={styles.bottom}>
                <p>22 participants</p>
                <p>2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OpenCollabs