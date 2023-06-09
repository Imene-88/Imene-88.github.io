import React from 'react';
import styles from './RecentUsers.module.css';
import { format } from 'timeago.js';
import default_picture from '../../assets/default_user_profile_picture.png';

function RecentUser({recentUser}) {
  return (
    <div className={styles.recentUser}>
        <div className={styles.userProfile}>
            <img src={recentUser.profile_picture ? recentUser.profile_picture : default_picture} alt="user profile" width={44} height={44} />
            <p>{recentUser.full_name}</p>
        </div>
        <p>Joined {format(recentUser.createdAt)}</p>
    </div>
  )
}

export default RecentUser