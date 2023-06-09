import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import notification from '../../assets/notification.png'
import addPost from '../../assets/add_post.png'
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
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";
import { useNavigate } from 'react-router-dom';
import remove_image from '../../assets/cancel.png';
import { ColorRing } from 'react-loader-spinner';
import socket from '../../SOCKET_CONNECTION';
import LikeUser from '../post/LikeUser'
import SearchResult from '../search_result/SearchResult';
import collaborators_announcements from '../../assets/notif.mp3';
import { Engagespot } from '@engagespot/react-component';

function Navbar() {

  const { user } = useContext(AuthContext);

  //const [notifications, setNotifications] = useState([]);
  //const [adminNotifications, setAdminNotifications] = useState([]);

  //useEffect(() => {
  //  const getNotifications = async () => {
  //    try {
  //      const res = await axios.get("/notifications/getNotifications/" + user._id);
  //      setNotifications(res.data); 
  //    } 
  //    catch (error) {
  //      console.log(error);
  //    }
  //  };
  //  getNotifications();
  //}, []);

  //useEffect(() => {
  //  socket.on("document:shared", data => {
  //    setNotifications((prev) => [...prev, data]);
  //  })
  //}, []);

  //const receiveNotification = ({senderFullName, document_id, receiverId, link, accessRight, type}, notification) => {
  //  return (
  //    <>
  //      {type === "shareDoc" && 
  //        <MenuItem>
  //          <p>{senderFullName} sent you a collaboration request. Do you: </p>
  //          <div className={styles.collab_request}>
  //            <Link to={link}>
  //              <button onClick={() => acceptCollabRequest(document_id, receiverId, accessRight)}>Accept</button>
  //            </Link>
  //            <button>Refuse</button>
  //          </div>
  //        </MenuItem>
  //      }
  //    </>
  //  )
  //};

  //useEffect(() => {
  //  socket.on("notification:receive", data => {
  //    setAdminNotifications((prev) => [...prev, data]);
  //  })
  //}, []);

  //const receiveAdminNotification = ({senderFullName, postId, type}) => {
  //  return (
  //    <>
  //    {type === "report-post" && 
  //      <MenuItem>
  //        <p>{senderFullName} reported a post: {postId} </p>
  //      </MenuItem>
  //    }
  //    </>
  //  )
  //};

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

  const [anchorNotification, setAnchorNotification] = useState(null);
  const openNotification = Boolean(anchorNotification);
  const handleClickNotification = (event) => {
    setAnchorNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorNotification(null);
  };

  const userPostContent = useRef();
  const [newPostImageUrl, setNewPostImageUrl] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [newPostVideoUrl, setNewPostVideoUrl] = useState("");
  const [postVideo, setPostVideo] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [postImageCancelled, setPostImageCancelled] = useState(false);
  const uploadTaskRefImage = useRef();
  const uploadTaskRefVideo = useRef();

  const postImageUpload = (event) => {
    const newPostImage = event.target.files[0];
    setPostImage(newPostImage);
    const storageRef = ref(storage, newPostImage.name);
    const uploadTask = uploadBytesResumable(storageRef, newPostImage);
    uploadTaskRefImage.current = uploadTask;
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
    setPostVideo(newPostVideo);
    const storageRef = ref(storage, newPostVideo.name);
    const uploadTask = uploadBytesResumable(storageRef, newPostVideo);
    uploadTaskRefVideo.current = uploadTask;
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

  const removepostImage = () => {
    setPostImage(null);
    uploadTaskRefImage.current.cancel();
    setPostImageCancelled(true);
  }

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
  
  const navigate = useNavigate();
  const clearStorage = () => {
    localStorage.removeItem('user');
    navigate('/login', {replace: true});
    navigate(0);
  };

  const acceptCollabRequest = async (document_id, receiverId, accessRight) => {
    console.log("it worked!");
    try {
      await axios.put("/documents/" + document_id + "/update?receiverId=" + receiverId);
      await axios.put("/access_rights/" + receiverId + "/addAccessRight/" + document_id, {
        accessright: accessRight,
      });
    }
    catch(error) {
      console.log(error);
    }
    //const audio = document.createElement('audio'); // create new audio element
    //audio.src = collaborators_announcements; // set audio source URL
    //document.body.appendChild(audio); // append audio element to the document
    //audio.addEventListener('canplaythrough', () => {
    //  
    //});
    socket.emit(`user:announce-${document_id}`);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchUser = (event) => {
    setSearchQuery(event.target.value);
  }

  const searchUser = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get("/users/search?q=" + searchQuery);
      setSearchResults(res.data);  
    } 
    catch (error) {
      console.log(error);
    }
    openSearchResultsDialog();
  }

  const [dialogSearchResultsOpen, setSearchResultsDialogOpen] = useState(false);
  const openSearchResultsDialog = () => {
    setSearchResultsDialogOpen(true);
  };
  const closeSearchResultsDialog = () => {
    setSearchResultsDialogOpen(false);
  };

  const NotificationHeading = ({ heading }) => {
    return (
      <p>{heading}</p>
    );
  }

  const NotificationActionButtons = ({link}) => {
    return (
      <div className={styles.notifActionBtns}>
        <Link to={link}>Accept</Link>
        <Link>Refuse</Link>
      </div>
    )
  }

  const Notification = ({notification}) => {
    return (
      <>
        <NotificationHeading heading={notification.heading} />
        <NotificationActionButtons link={notification.data?.link} />
      </>
    )
  };

  return (
    <div className={styles.container}>
        <div className={styles.addition}></div>
        <div className={styles.nav}>
            <p className={styles.logo}><span>Wr1</span>ven</p>
            <div className={styles.navGroup}>
              <form method='post' onSubmit={searchUser}>
                <div className={styles.search}>
                    {user.role === "User" ? <input type="text" value={searchQuery} placeholder='Search for people' onChange={handleSearchUser} /> : <input type="text" value={searchQuery} placeholder='Search for users' onChange={handleSearchUser} />}
                    <img src={search} alt="search icon" width="24" height="24" />
                </div>
              </form>
              <Dialog open={dialogSearchResultsOpen} onClose={closeSearchResultsDialog} className={styles.dialog}>
                <DialogTitle>Search Results For "{searchQuery}"</DialogTitle>
                <Divider />
                <DialogContent>
                  {searchResults.map((searchResult) => {
                    return <SearchResult key={searchResult._id} searchResult={searchResult} searchQuery={searchQuery} />
                  })}
                </DialogContent>
              </Dialog>
              <Engagespot apiKey="392669pd2q63zp1n10mrub" userId={user._id} theme={{
                colors: {
                  brandingPrimary: "var(--primary-color)",
                },
                notificationButton: {
                  iconFill: "var(--primary-color)",
                  iconSize: "42px",
                },
              }} renderNotificationBody={(notification) => {
                if (notification.data?.type === "shareDoc") {
                  return <Notification notification={notification} />
                }
              }} />
                {user.role === "User" && <img src={addPost} alt="adding a post icon" width="40" height="40" className={styles.images} onClick={openAddPostDialog} />}
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
                          {postImage && percentage > 0  && !postImageCancelled && 
                          <div className={styles.progressCircle}>
                            <ColorRing
                              visible={true}
                              height="80"
                              width="80"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={['var(--primary-color)', '#915445', '#9D6354', '#A97265', '#B68376']}
                            />
                            <span className={styles.progressValue}>{Math.round(percentage)} %</span>
                          </div>
                          }
                          {postVideo && percentage > 0 && <p>Upload Progress is: {percentage} </p>}
                        </div>
                      </div>
                      {postImage && 
                        <div className={styles.postImageHolder}>
                          <img src={URL.createObjectURL(postImage)} alt="post media holder" className={styles.postImage} />
                          <img src={remove_image} alt="remove icon" width={17} height={17} className={styles.removepostImage} onClick={removepostImage} />
                        </div>
                      }
                    </DialogContent>
                    <DialogActions>
                      <button className={styles.addPostBtn} type='submit' disabled={(percentage > 0 && percentage !== 100 && !postImageCancelled) && (!postImageCancelled)}>Add</button>
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
                  <MenuItem onClick={clearStorage}>
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