import React, { useState, useEffect, useContext } from 'react'
import styles from '../../pages/main_page/main_page.module.css'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Middle from '../middle/Middle';
import axios from 'axios';
import default_picture from '../../assets/default_user_profile_picture.png';
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';

function UserProfileComponent() {

  const { user: loggedInUser } = useContext(AuthContext);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fullname = useParams().fullname;
  const [user, setUser] = useState({});
  const [postsCount, setPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingsCount, setFollowingsCount] = useState(0);
  
  useEffect(() => { 
    const getUser = async () => {
      const res = await axios.get(`/users/user?fullname=${fullname}`); 
      const resPostsCount = await axios.get("/users/" + res.data._id + "/postsCount");
      setUser(res.data);
      setPostsCount(resPostsCount.data);
      setFollowersCount(res.data.followers.length);
      setFollowingsCount(res.data.following.length);
    };
    getUser();
  }, [fullname]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const followUser = async () => {
    try {
      await axios.put("/users/" + user._id + "/follow", {
        userId: loggedInUser._id,
      });  
    } 
    catch (error) {
      console.log(error);
    }
    setSnackbarOpen(true);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <img src={user.profile_picture || default_picture} alt="user profile" width={75} height={75} />
          <div className={styles.identity}>
            <p>{user.full_name}</p>
            <p>{user.username}</p>
            <p>{user.bio}</p>
          </div>
          {!loggedInUser.following.includes(user) && <button onClick={followUser}>Follow</button> }
          <Snackbar
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            open={snackbarOpen}
            autoHideDuration={5000}
            message="User followed successfully."
            onClose={closeSnackbar}
            className={styles.snackbar}
          />
        </div>
        <div className={styles.rightHeader}>
          <div className={styles.data}>
            <p>{postsCount}</p>
            <p>Posts</p>
          </div>
          <div className={styles.data}>
            <p>{followersCount}</p>
            <p>Followers</p>
          </div>
          <div className={styles.data}>
            <p>{followingsCount}</p>
            <p>Following</p>
          </div>
        </div>
      </div>
      <div className={styles.posts_save}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="Posts and saved posts">
            <Tab label="Posts" value="1" />
          </TabList>
          <TabPanel value="1">
            <div className={styles.posts}>
              <Middle fullname={fullname} />
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  )
}

export default UserProfileComponent