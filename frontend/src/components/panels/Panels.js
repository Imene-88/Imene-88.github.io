import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Panels.module.css';
import users_filled from '../../assets/users_filled.png';
import posts_filled from '../../assets/posts_filled.png';
import likes_filled from '../../assets/likes.png';
import group_filled from '../../assets/group_filled.png';
import doc_filled from '../../assets/doc_filled.png';
import comments_filled from '../../assets/comments_filled.png';
import axios from 'axios';
import ads from '../../assets/megaphone.png';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import imageIcon from '../../assets/image.png';
import videoIcon from '../../assets/video.png';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";
import { ColorRing } from 'react-loader-spinner';
import remove_image from '../../assets/cancel.png';
import { AuthContext } from '../../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { writersTypes } from '../../USER_INTERESTS_PAGE_DATA.js';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(type, writerType, theme) {
  return {
    fontWeight:
    writerType.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Panels() {

    const { user: loggedInUser } = useContext(AuthContext);

    const navigate = useNavigate();

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

    const [createAdDialogOpen, setCreateAdDialogOpen] = useState(false);

    const openCreateAdDialog = () => {
        setCreateAdDialogOpen(true);
    };

    const closeCreateAdDialog = () => {
        setCreateAdDialogOpen(false);
    };

  const adminAdContent = useRef();
  const [targetAudience, setTargetAudience] = useState([]);
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

      const theme = useTheme();
      const [writerType, setWriterType] = useState([]);

      const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setTargetAudience(event.target.value)
        setWriterType(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const addAdd = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/ads/createAd/" + loggedInUser._id, {
                content: adminAdContent.current.value,
                image: newPostImageUrl,
                video: newPostVideoUrl,
                audience: targetAudience,
            });    
        } 
        catch (error) {
            console.log(error);
        }
        navigate("/ads", { replace: true });
      }

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
        {/*<div className={styles.panel}>
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
        </div>*/}
        <div className={styles.panel}>
            <div className={styles.panelText}>
                <p>{totalDocumentsInCollections[3]}</p>
                <p>Private Documents</p>
            </div>
            <img src={doc_filled} alt="group icon" width={35} height={35} />
        </div>
        <div className={styles.panel}>
            <div className={styles.panelText}>
                <p>{totalDocumentsInCollections[2]}</p>
                <p>Open documents</p>
            </div>
            <img src={group_filled} alt="group icon" width={35} height={35} />
        </div>
        <div className={styles.panel}>
            <div className={styles.panelText}>
                <p>{totalDocumentsInCollections[6]}</p>
                <button onClick={openCreateAdDialog}>Create Ad</button>
                <Dialog open={createAdDialogOpen} onClose={closeCreateAdDialog} className={styles.dialog}>
                    <DialogTitle>Create Ad</DialogTitle>
                    <form method='post' onSubmit={addAdd}>
                        <DialogContent>
                            <textarea cols="69" rows="8" placeholder='What does the advertisement about?' autoFocus className={styles.postContent} ref={adminAdContent}></textarea>
                            {/*<select ref={targetAudience} className={styles.targetAudience}>
                                <option value="" id='first-option'>Target Audience</option>
                                <option value="freelance">Freelance writers</option>
                                <option value="novelists">Novelists</option>
                                <option value="screenwriters">Screenwriters</option>
                                <option value="playwrights">Playwrights</option>
                                <option value="bloggers">Bloggers</option>
                                <option value="academic">Academic writers</option>
                                <option value="technical">Technical writers</option>
                                <option value="copy">Copywriters</option>
                                <option value="journalists">Journalists</option>
                                <option value="non-fiction">Non-fiction writers</option>
                            </select>*/}
                            <Select
                              multiple
                              displayEmpty
                              value={writerType}
                              onChange={handleChange}
                              input={<OutlinedInput />}
                              renderValue={(selected) => {
                                if (selected.length === 0) {
                                  return "Target Audience";
                                }
                              
                                return selected.join(', ');
                              }}
                              MenuProps={MenuProps}
                              inputProps={{ 'aria-label': 'Without label' }}
                              sx={{ width: 553 }}
                            >
                              <MenuItem disabled value="">
                                Target Audience
                              </MenuItem>
                              {writersTypes.map((type) => (
                                <MenuItem
                                  key={type}
                                  value={type}
                                  style={getStyles(type, writerType, theme)}
                                >
                                  {type}
                                </MenuItem>
                              ))}
                            </Select>
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
            </div>
            <img src={ads} alt="ad icon" width={35} height={35} />
        </div>
    </div>
  )
}

export default Panels