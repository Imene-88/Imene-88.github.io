import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '../../pages/main_page/main_page.module.css'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import default_picture from '../../assets/default_user_profile_picture.png';
import { Link } from 'react-router-dom';

export default function Following() {

  const { user: loggedInUser } = useContext(AuthContext);
  
  const [userFollowingsList, setUserFollowingsList] = useState([]);
  const seeMore = useRef();
  useEffect(() => {
    const getUserFollowings = async () => {
      try {
        const res = await axios.get("/users/" + loggedInUser._id + "/followings");
        setUserFollowingsList(res.data);
        if (res.data.length === 0) {
          seeMore.current.style.display = "none";
        }
      }
      catch(error) {}
    }
    getUserFollowings();
  }, [loggedInUser._id]);

  return (
    <>
    <div className={styles.top}>
      <p>Following</p>
      <Link to={"/main_page/profile"}>
        <button ref={seeMore}>See more</button>
      </Link>
    </div>
    {(userFollowingsList.length > 0) ? (
      userFollowingsList.map((followedUser) => {
        return (
          <div className={styles.following} key={followedUser._id}>
          <div className={styles.left}>
            <img src={followedUser.profile_picture || default_picture} alt='' width={44} height={44} />
            <div className={styles.text}>
              <Link to={"/userProfile/" + followedUser.full_name}>
                <p>{followedUser.full_name}</p>
              </Link>
              <p>{followedUser.username}</p>
            </div>
          </div>
          <button>Following</button>
        </div>
        )
      })
    ) : (
      <p className={styles.no_followings}>You are not following anyone at this moment.</p>
    )}
    </>
  )
}
