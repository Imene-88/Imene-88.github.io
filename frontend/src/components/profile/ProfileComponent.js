import React, { useContext, useEffect, useState } from 'react'
import styles from '../../pages/profile/profile.module.css'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import LoggedInUserPosts from '../post/loggedInUserPosts';
import EditProfile from '../edit_profile/EditProfile';
import LoggedInUserSavedPosts from '../post/LoggedInUserSavedPosts';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import LikeUser from '../post/LikeUser';
import { Link } from 'react-router-dom';

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

  // For Tablist  
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [postsCount, setPostsCount] = useState(0);
  const followersCount = loggedInUser.followers.length;
  const followingsCount = loggedInUser.following.length;
  useEffect(() => {
    const getUserPostsCount = async () => {
      const res = await axios.get("/users/" + loggedInUser._id + "/postsCount");
      setPostsCount(res.data);
    }
    getUserPostsCount();
  }, [loggedInUser._id]);

  const [savedPosts, setSavedPosts] = useState([]);
  useEffect(() => {
    const getSavedPosts = async () => {
      try {
        const res = await axios.get("/posts/savedPosts/" + loggedInUser._id);
        setSavedPosts(res.data);
      } 
      catch (error) {
        console.log(error);
      }
    };
    getSavedPosts();
  }, [loggedInUser._id]);

  const [dialogFollowersOpen, setDialogFollowersOpen] = useState(false);
  const openFollowersDialog = () => {
    setDialogFollowersOpen(true);
  };
  const closeFollowersDialog = () => {
    setDialogFollowersOpen(false);
  };

  const [dialogFollowingsOpen, setDialogFollowingsOpen] = useState(false);
  const openFollowingsDialog = () => {
    setDialogFollowingsOpen(true);
  };
  const closeFollowingsDialog = () => {
    setDialogFollowingsOpen(false);
  };

  const [userPortfolio, setUserPortfolio] = useState({});
  useEffect(() => {
    const getPortfolio = async () => {
      try {
        const res = await axios.get("/portfolios/getPortfolio/" + loggedInUser._id);
        setUserPortfolio(res.data);
      } 
      catch (error) {
        console.log(error);
      }
    };
    getPortfolio();
  }, [loggedInUser._id]);
  
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <img src={loggedInUser.profile_picture ? loggedInUser.profile_picture : default_picture} alt="user profile" width={75} height={75} />
          <div className={styles.identity}>
            <div className={styles.fullname_edit}>
              <p>{loggedInUser.username}</p>
              <EditProfile />
            </div>
            <p>{loggedInUser.email}</p>
          </div>
        </div>
        {loggedInUser.role === "User" &&
          <div className={styles.rightHeader}>
            <div className={styles.data}>
              <p>{postsCount}</p>
              <p>Posts</p>
            </div>
            <div className={styles.data} onClick={openFollowersDialog}>
              <p>{followersCount}</p>
              <p>Followers</p>
            </div>
            <Dialog open={dialogFollowersOpen} onClose={closeFollowersDialog} className={styles.dialog}>
              <DialogTitle>Followers</DialogTitle>
              <Divider />  
              <DialogContent>
                {loggedInUser.followers.map((follower) => {
                  return <LikeUser key={follower._id} likeUser={follower._id} />
                })}
              </DialogContent>
            </Dialog>
            <div className={styles.data} onClick={openFollowingsDialog}>
              <p>{followingsCount}</p>
              <p>Following</p>
            </div>
            <Dialog open={dialogFollowingsOpen} onClose={closeFollowingsDialog} className={styles.dialog}>
              <DialogTitle>Following</DialogTitle>
              <Divider />  
              <DialogContent>
                {loggedInUser.following.map((following) => {
                  return <LikeUser key={following._id} likeUser={following._id} />
                })}
              </DialogContent>
            </Dialog>
          </div>
        }
      </div>
      {loggedInUser.role === "User" &&
        <div className={styles.posts_save}>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="Posts and saved posts">
              <Tab label="My posts" value="1" />
              <Tab label="Saved" value="2" />
              <Tab label="Portfolio" value="3" />
            </TabList>
            <TabPanel value="1">
              <div className={styles.posts}>
                {myPosts.map((post) => {
                  return <LoggedInUserPosts key={post._id} post={post} />
                })}
              </div>
            </TabPanel>
            <TabPanel value="2">
                <div className={styles.posts}>
                  {savedPosts.map((savedPost) => {
                    return <LoggedInUserSavedPosts key={savedPost._id} savedPost={savedPost} />
                  })}
                </div>
            </TabPanel>
            <TabPanel value="3">
                <div className={styles.posts}>
                  {userPortfolio._id ? 
                    <div>Portfolio</div> 
                  : 
                    <div>
                      <p className={styles.buildPortfolio}>Start building your portfolio, showcase your work, trust the process <br/> and most importantly, trust yourself, you are worth it more than you think.</p>
                      <Link to="/myPortfolio">Build Portfolio</Link>
                    </div>
                  }
                </div>
            </TabPanel>
          </TabContext>
        </div>
      }
    </div>
  )
}

export default ProfileComponent