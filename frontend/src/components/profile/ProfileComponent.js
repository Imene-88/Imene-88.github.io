import React, { useContext, useEffect, useState } from 'react'
import user_profile from '../../assets/img3.jpg'
import edit from '../../assets/edit.png'
import styles from '../../pages/profile/profile.module.css'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import LoggedInUserPosts from '../post/loggedInUserPosts';

function ProfileComponent() {

  const { user:loggedInUser } = useContext(AuthContext);

  const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const getLoggedInUserPosts = async () => {
            const res = await axios.get("/posts/myPosts/" + loggedInUser._id);
            setMyPosts(res.data);
        };
        getLoggedInUserPosts();
    }, [loggedInUser._id]);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <img src={loggedInUser.profile_picture ? loggedInUser.profile_picture : default_picture} alt="user profile" width={75} height={75} />
          <div className={styles.identity}>
            <div className={styles.fullname_edit}>
              <p>{loggedInUser.username}</p>
              <div className={styles.edit}>
                <img src={edit} alt="edit icon" width={15} height={15} />
                <p>Edit</p>
              </div>
            </div>
            <p>{loggedInUser.email}</p>
          </div>
        </div>
        <div className={styles.rightHeader}>
          <div className={styles.data}>
            <p>15.3K</p>
            <p>Posts</p>
          </div>
          <div className={styles.data}>
            <p>5.2M</p>
            <p>Followers</p>
          </div>
          <div className={styles.data}>
            <p>100</p>
            <p>Following</p>
          </div>
        </div>
      </div>
      <div className={styles.posts_save}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="Posts and saved posts">
            <Tab label="My posts" value="1" />
            <Tab label="Saved" value="2" />
          </TabList>
          <TabPanel value="1">
            <div className={styles.posts}>
              {myPosts.map((post) => {
                <LoggedInUserPosts key={post._id} post={post} />
              })}
            </div>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </div>
    </div>
  )
}

export default ProfileComponent