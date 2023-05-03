import React, { useEffect, useState } from 'react';
import styles from './Panels.module.css';
import users_filled from '../../assets/users_filled.png';
import posts_filled from '../../assets/posts_filled.png';
import likes_filled from '../../assets/likes.png';
import group_filled from '../../assets/group_filled.png';
import comments_filled from '../../assets/comments_filled.png';
import axios from 'axios';

function Panels() {

    const [totalDocumentsInCollections, setTotalDocumentsInCollections] = useState([]);

    useEffect(() => {
        const getTotalDocumentsInCollections = async () => {
            try {
                const res = await axios.get("/admin/totalDocumentsInCollections");
                setTotalDocumentsInCollections(res.data);
            } 
            catch (error) {
                console.log(error);
            }
        };
        getTotalDocumentsInCollections();
    }, []);

  return (
    <div className={styles.panels}>
        <div className={styles.panel}>
            <div className={styles.panelText}>
                <p>{totalDocumentsInCollections[0]}</p>
                <p>Users</p>
            </div>
            <img src={users_filled} alt="user icon" width={35} height={35} />
        </div>
        <div className={styles.panel}>
            <div className={styles.panelText}>
                <p>{totalDocumentsInCollections[1]}</p>
                <p>Posts</p>
            </div>
            <img src={posts_filled} alt="post icon" width={35} height={35} />
        </div>
        <div className={styles.panel}>
            <div className={styles.panelText}>
                <p>{totalDocumentsInCollections[3]}</p>
                <p>Likes</p>
            </div>
            <img src={likes_filled} alt="like icon" width={35} height={35} />
        </div>
        <div className={styles.panel}>
            <div className={styles.panelText}>
                <p>{totalDocumentsInCollections[4]}</p>
                <p>Comments</p>
            </div>
            <img src={comments_filled} alt="group icon" width={35} height={35} />
        </div>
        <div className={styles.panel}>
            <div className={styles.panelText}>
                <p>{totalDocumentsInCollections[2]}</p>
                <p>Open documents</p>
            </div>
            <img src={group_filled} alt="group icon" width={35} height={35} />
        </div>
    </div>
  )
}

export default Panels