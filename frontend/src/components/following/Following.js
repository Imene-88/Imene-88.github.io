import React from 'react'
import styles from '../../pages/main_page/main_page.module.css'

export default function Following({user}) {
  return (
    <>
      <div className={styles.following}>
        <div className={styles.left}>
          <img src={user.profile_picture} alt='' width={44} height={44} />
          <div className={styles.text}>
            <p>{user.full_name}</p>
            <p>{user.username}</p>
          </div>
        </div>
        <button>Following</button>
      </div>
    </>
  )
}
