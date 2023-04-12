import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import notification from '../../assets/notification.png'
import addPost from '../../assets/add_post.png'
import img3 from '../../assets/img3.jpg'
import styles from './Navbar.module.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import imageIcon from '../../assets/image.png';
import videoIcon from '../../assets/video.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import profile from '../../assets/profile.png'
import settings from '../../assets/settings.png'
import dark_mode from '../../assets/dark_mode.png'
import log_out from '../../assets/log_out.png'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";

function Navbar() {

  const { user } = useContext(AuthContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const openAddPostDialog = () => {
    setDialogOpen(true);
  };
  const closeAddPostDialog = () => {
    setDialogOpen(false);
  };

  const [anchorProfile, setAnchorProfile] = useState(null);
  const openProfile = Boolean(anchorProfile);
  const handleClickProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorProfile(null);
  };

  const userPostContent = useRef();
  const [newPostImageUrl, setNewPostImageUrl] = useState("");
  const [newPostVideoUrl, setNewPostVideoUrl] = useState("");
  const [percentage, setPercentage] = useState(0);

  const postImageUpload = (event) => {
    const newPostImage = event.target.files[0];
    const storageRef = ref(storage, newPostImage.name);
    const uploadTask = uploadBytesResumable(storageRef, newPostImage);
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercentage(progress);
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default: 
          break;
      }
    }, 
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setNewPostImageUrl(downloadURL) ;
      });
    }
  );
  };

  const postVideoUpload = (event) => {
    const newPostVideo = event.target.files[0];
    const storageRef = ref(storage, newPostVideo.name);
    const uploadTask = uploadBytesResumable(storageRef, newPostVideo);
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercentage(progress);
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default: 
          break;
      }
    }, 
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setNewPostVideoUrl(downloadURL);
        console.log(downloadURL);
      });
    }
  );
  };

  const addNewPost = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/posts/create_post", {
        owner_id: user._id,
        content: userPostContent.current.value,
        image: newPostImageUrl,
        video: newPostVideoUrl,
      });
      window.location.reload();
    }
    catch(error) {

    }
  };

  return (
    <div className={styles.container}>
        <div className={styles.addition}></div>
        <div className={styles.nav}>
            <img src={logo} alt="Logo of website" width="170" height="89" />
            <div className={styles.navGroup}>
                <div className={styles.search}>
                    <input type="text" name='search' placeholder='Search for people' />
                    <img src={search} alt="search icon" width="24" height="24" />
                </div>
                <img src={notification} alt="notification icon" width="40" height="40" className={styles.images} />
                <img src={addPost} alt="adding a post icon" width="40" height="40" className={styles.images} onClick={openAddPostDialog} />
                <Dialog open={dialogOpen} onClose={closeAddPostDialog} className={styles.dialog}>
                  <DialogTitle>New Post</DialogTitle>
                  <Divider />
                  <form method='post' onSubmit={addNewPost}>
                    <DialogContent>
                      <textarea cols="69" rows="8" placeholder='Your ideas merit sharing ...' autoFocus className={styles.postContent} ref={userPostContent}></textarea>
                      <div className={styles.dialogIcons}>
                        <label id="newPostImage" className={styles.imageIcon}>
                          <img src={imageIcon} alt="uploadImage" width={35} height={35} />
                          <p>Image</p>
                          <input type="file" aria-labelledby="newPostImage" accept='.jpg, .jpeg, .png' onChange={postImageUpload} />
                        </label>
                        <label id='newPostVideo' className={styles.videoIcon}>
                          <img src={videoIcon} alt="upload video" width={35} height={35} />
                          <p>Video</p>
                          <input type="file" aria-labelledby="newPostVideo" accept='video/*' onChange={postVideoUpload} />
                        </label>
                        <div className={styles.progress}>
                          <p>Upload Progress is: {percentage} </p>
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <button className={styles.addPostBtn} type='submit' disabled={percentage > 0 && percentage !== 100}>Add</button>
                    </DialogActions>
                  </form>
                </Dialog>
                <button id='profile'
                    aria-controls={openProfile ? 'profile-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openProfile ? "true" : undefined}
                    onClick={handleClickProfile}>
                    <img src={user.profile_picture ? user.profile_picture : default_picture} alt="user profile" width="55" height="55" className={styles.images} />
                </button>
                <Menu id='profile-menu'
                  className={styles.profile_menu}
                  anchorEl={anchorProfile}
                  open={openProfile}
                  onClose={handleCloseProfile}
                  MenuListProps={{
                    'aria-labelledby': 'profile',
                  }}
                >
                  <MenuItem>
                    <img src={user.profile_picture ? user.profile_picture : default_picture} alt="User profile" width={55} height={55} />
                    <div className={styles.text}>
                      <p>{user.username}</p>
                      <p>{user.email}</p>
                    </div>
                  </MenuItem>
                  <Divider />
                  <MenuItem component={Link} to={"/main_page/profile"}>
                    <img src={profile} alt="profile icon" width={25} height={25} />
                    <p>Profile</p>
                  </MenuItem>
                  <MenuItem>
                    <img src={settings} alt="settings icon" width={25} height={25} />
                    <p>Settings</p>
                  </MenuItem>
                  <MenuItem>
                    <img src={dark_mode} alt="dark mode icon" width={25} height={25} />
                    <p>Dark mode</p>
                    <Switch className={styles.switch_dark} />
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <img src={log_out} alt="logout icon" width={25} height={25} />
                    <p>Log out</p>
                  </MenuItem>
                </Menu>
            </div>
        </div>
    </div>
  )
}

export default Navbar