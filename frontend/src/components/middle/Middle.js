import React, {useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import styles from '../../pages/main_page/main_page.module.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ProfilesSuggestions from '../profiles_suggestions/ProfilesSuggestions';

function Middle({fullname}) {
    const [feedPosts, setFeedPosts] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
      const getFeed = async () => {
        if (fullname) {
          const res = await axios.get("/users/userProfile/" + fullname);
          setFeedPosts(res.data); 
        } else {
          const res = await axios.get("posts/feed/" + user._id);
          setFeedPosts(res.data.sort((post_a, post_b) => {
            return post_b.createdAt.localeCompare(post_a.createdAt);
          }));
        } 
      };
      getFeed();
    }, [fullname, user._id]);


  return (
    <div className={styles.middle}>
      {!fullname && <ProfilesSuggestions />}
        {feedPosts.map((post) => {
          return <Post key={post._id} post={post} />
        })}
    </div>
  )
}

export default Middle