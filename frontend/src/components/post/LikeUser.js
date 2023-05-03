import axios from 'axios';
import React, { useEffect, useState } from 'react';
import default_picture from '../../assets/default_user_profile_picture.png';
import styles from '../../pages/main_page/main_page.module.css';
import { Link } from 'react-router-dom';

function LikeUser({likeUser}) {

    const [resLikeUser, setResLikeUser] = useState({});
    useEffect(() => {
        const getLikeUser = async () => {
            try {
                const res = await axios.get("/users/user?id=" + likeUser);
                setResLikeUser(res.data);
            } 
            catch (error) {
                console.log(error);
            }
        };
        getLikeUser();
    }, [likeUser]);

  return (
    <div className={styles.likeUser}>
        <img src={resLikeUser.profile_picture ? resLikeUser.profile_picture : default_picture} alt="comment owner media" width={40} height={40} />
        <div className={styles.commentText}>
            <Link to={`/userProfile/${resLikeUser.full_name}`}>
                <p><b>{resLikeUser.full_name}</b></p>
            </Link>
            <p>{resLikeUser.username}</p>
        </div>
    </div>
  )
}

export default LikeUser