import React, { useState, useEffect } from 'react'
import styles from '../../pages/profile/profile.module.css'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Middle from '../middle/Middle';
import axios from 'axios';
import default_picture from '../../assets/default_user_profile_picture.png';
import { useParams } from 'react-router';

function UserProfileComponent() {

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [user, setUser] = useState({});
  const fullname = useParams().fullname;
  useEffect(() => { 
    const getUser = async () => {
      const res = await axios.get(`/users/user?fullname=${fullname}`); 
      setUser(res.data);
    };
    getUser();
  }, [fullname]);

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