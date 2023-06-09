import React, { useEffect, useState } from 'react';
import styles from '../../pages/main_page/main_page.module.css';
import axios from 'axios';
import Post from '../post/Post';

function UsersPosts() {

    const [usersPosts, setUsersPosts] = useState([]);
    useEffect(() => {
        const getAllPosts = async () => {
            try {
                const res = await axios.get("/admin/allPosts");
                setUsersPosts(res.data.sort((post_a, post_b) => {
                    return post_b.createdAt.localeCompare(post_a.createdAt);
                  }));
            } 
            catch (error) {
                console.log(error);
            }
        };
        getAllPosts();
    }, []);

  return (
    <div className={styles.usersPosts}>
        {usersPosts.map((userPost) => {
            return <Post key={userPost._id} post={userPost} />
        })}
    </div>
  )
}

export default UsersPosts