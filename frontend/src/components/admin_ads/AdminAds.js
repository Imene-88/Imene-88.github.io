import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import styles from '../../pages/ads/Ads.module.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import { format } from 'timeago.js';
import delete_post from '../../assets/delete.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import three_dots from '../../assets/dots.png';
import ReactPlayer from 'react-player';
import LikeUser from '../post/LikeUser';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import like_btn from '../../assets/like.png';
import like_btn_filled from '../../assets/heart.png';
import comment_btn from '../../assets/comment.png';
import save_btn from '../../assets/save.png';
import save_btn_filled from '../../assets/save_filled.png';
import post_comment from '../../assets/post_comment.png';
import Comment from '../post/Comment';
import social_share_btn from '../../assets/paper-plane.png';
import { PinterestShareButton, TwitterShareButton, TumblrShareButton } from 'react-share';
import pinterest from '../../assets/pinterest.png';
import twitter from '../../assets/twitter.png';
import tumblr from '../../assets/tumblr.png';
import default_post_image from '../../assets/default_post_image.jpg';
import { ref, deleteObject } from "firebase/storage";
import { storage } from '../../Firebase'; 

function AdminAds({ad}) {  
  const { user: loggedInUser} = useContext(AuthContext);

  const [likeNbr, setLikeNbr] = useState(null);
  const [commentNbr, setCommentNbr] = useState(null);

  useEffect(() => {
    const count = async () => {
      const res = await axios.get(`/posts/${ad._id}/likesCount`); 
      setLikeNbr(res.data);
    };
    count();
  }, [ad._id]); 

  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const getLike = async () => {
      try {
        const res = await axios.get("/likes/get_like/" + loggedInUser._id + "/" + ad._id);
        if (res.data.length > 0) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      } 
      catch (error) {
        console.log(error);
      }
    };
    getLike();
  }, [loggedInUser._id, ad._id]);
  
  const [likeBtnCLicked, setLikeBtnCLicked] = useState(false);
  const likePost = async () => {
    if (!likeBtnCLicked && !liked) {
      try {
        await axios.post("/likes/like_post/" + ad._id, {userId: loggedInUser._id});
      }
      catch(error) {
        console.log(error);
      }
      setLikeNbr(likeNbr + 1);
      setLikeBtnCLicked(!likeBtnCLicked);
      setLiked((prevLiked) => !prevLiked);
    } else {
      setLikeNbr(likeNbr - 1);
      setLikeBtnCLicked(!likeBtnCLicked);
      setLiked((prevLiked) => !prevLiked);
      try {
        await axios.delete(`/likes/unlike_post/${ad._id}`, {
          data: {
            userId: loggedInUser._id
          }
        });
      }
      catch(error) {
        console.log(error);
      }
    }
  };

  const [admin, setAdmin] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/users/user?id=" + ad.owner_id); 
      setAdmin(res.data);
    };
    getUser();
  }, [ad.owner_id]);

  const [anchorReport, setAnchorReport] = useState(null);
  const openReport = Boolean(anchorReport);
  const handleClickReport = (event) => {
    setAnchorReport(event.currentTarget);
  };
  const handleCloseReport = () => {
    setAnchorReport(null);
  };

  const [dialogCommentSectionOpen, setDialogCommentSectionOpen] = useState(false);
  const openCommentSectionDialog = () => {
    setDialogCommentSectionOpen(true);
  };
  const closeCommentSectionDialog = () => {
    setDialogCommentSectionOpen(false);
  };

  const deleteAd = useCallback((adId, adImage, adVideo) => {
    const adImageReference = ref(storage, adImage);
    const adVideoReference = ref(storage, adVideo);
    const deleteAdminAd = async () => {
      try {  
        await axios.delete("/ads/deleteAd/" + adId);
        window.location.reload();
        if (adImageReference) {
          deleteObject(adImageReference);
        }
        if (adVideoReference) {
          deleteObject(adVideoReference);
        }
      } 
      catch (error) {
        console.log(error);
      }
    };
    deleteAdminAd();
  });

  const commentContent = useRef();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getPostComments = async () => {
      const res = await axios.get("/comments/" + ad._id);
      setComments(res.data);
    };
    getPostComments();
  }, [ad._id]);

  const deleteComment = async (commentId) => {
    try {
        await axios.delete("/comments/" + commentId);
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId)); 
    } 
    catch (error) {
        console.log(error);
    }
  };

  const postComment = useCallback(() => {
    const addCommentToPost = async () => {
      try {
        const res = await axios.post("/comments/" + loggedInUser._id + "/" + ad._id, {
          content: commentContent.current.value,
        });
        setComments((prevComments) => [...prevComments, res.data]);
        commentContent.current.value = "";
      } 
      catch (error) {
        console.log(error);
      }
    };
    addCommentToPost();
  }, [loggedInUser._id, ad._id]);

  const updateComment = async (commentId, updatedCommentContent) => {
    try {
      const res = await axios.put("/comments/" + commentId, {
        content: updatedCommentContent,
      });  
      //setComments((prevComments) => [prevComments.filter((comment) => comment._id !== commentId), res.data]);
      setComments(prevComments => prevComments.map(comment =>
        comment._id === commentId ? res.data : comment
      ));
    } 
    catch (error) {
      console.log(error);
    }
  };

  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const getSavedPost = async () => {
      try {
        const res = await axios.get("/posts/" + loggedInUser._id + "/savedPost/" + ad._id);
        if (res.data.length > 0) {
          setSaved(true);
        } else {
          setSaved(false);
        }
      } 
      catch (error) {
        console.log(error);
      }
    };
    getSavedPost();
  }, [loggedInUser._id, ad._id]);

  const [saveBtnCLicked, setSaveBtnCLicked] = useState(false);
  const savePost = async () => {
      if (!saveBtnCLicked && !saved) {
        try {
          await axios.post("/posts/" + loggedInUser._id + "/save_post/" + ad._id);
        }
        catch(error) {
          console.log(error);
        }
        setSaveBtnCLicked(!saveBtnCLicked);
        setSaved((prevSaved) => !prevSaved);
      } else {
        try {
          await axios.delete("/posts/unsave_post/" + loggedInUser._id + "/" + ad._id);
        }
        catch(error) {
          console.log(error);
        }
        setSaveBtnCLicked(!saveBtnCLicked);
        setSaved((prevSaved) => !prevSaved);
      }
    };

  const [dialogLikedByOpen, setDialogLikedByOpen] = useState(false);
  const openLikedByDialog = () => {
    setDialogLikedByOpen(true);
  };
  const closeLikedByDialog = () => {
    setDialogLikedByOpen(false);
  };

  const [dialogSavedByOpen, setDialogSavedByOpen] = useState(false);
  const openSavedByDialog = () => {
    setDialogSavedByOpen(true);
  };
  const closeSavedByDialog = () => {
    setDialogSavedByOpen(false);
  };

    const [likeUsers, setLikeUsers] = useState([]);
    useEffect(() => {
      const getLikeUsers = async () => {
        try {
          const res = await axios.get("/admin/likeUsers/" + ad._id);
          setLikeUsers(res.data);  
        } 
        catch (error) {
          console.log(error);
        }
      };
      getLikeUsers();
    }, [ad._id]);

    const social_share = useRef();
    const showSharePost = () => {
        social_share.current.style.display = 'flex';
    }
    
    const hideSharePost = () => {
      social_share.current.style.display = 'none';
    }

  return (
    <div className={styles.ad}>
      <div className={styles.adTop}>
        <div className={styles.left}>
          <img src={admin.profile_picture || default_picture} alt={"admin profile"} width={44} height={44} />
          <p className={styles.username}>{admin.username}</p>
          <p className={styles.date}>{format(ad.createdAt)}</p>
        </div>
        {(ad.owner_id === loggedInUser._id || loggedInUser.role === "Super Admin") &&
          <>
            <button id='report'
                aria-controls={openReport ? 'report-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openReport ? "true" : undefined}
                onClick={handleClickReport}
            >
              <img src={three_dots} alt="three dots icon" width={30} height={30} className={styles.dots} />
            </button>
            <Menu id='report-menu'
                className={styles.report_menu}
                anchorEl={anchorReport}
                open={openReport}
                onClose={handleCloseReport}
                MenuListProps={{
                  'aria-labelledby': 'report',
                }}
            >
              <MenuItem onClick={() => deleteAd(ad._id, ad.image, ad.video)}>
                <img src={delete_post} alt="report post" width={25} height={25} />
                <p>Delete Ad</p>
              </MenuItem>
            </Menu>
          </>
        }
      </div>

      <div className={styles.adMiddle}>
        <p>{ad?.content}</p>
        {ad.image && <img src={ad.image} alt='post media' />}
        {ad.video && 
          <ReactPlayer url={ad.video} controls={true} playing={true} loop={true} muted={true} width="100%" className={styles.postVideo} />
        }
      </div>

      <div className={styles.adBottom}>
        <div className={styles.react_to_post}>
          {loggedInUser.role === "User" && 
            <div className={styles.like}>
              <img src={liked ? like_btn_filled : like_btn} alt="like icon" width={30} height={30} onClick={likePost} />
              {likeNbr > 0 && <span>{likeNbr}</span>}
            </div>
          }
          {(loggedInUser.role === "Admin" || loggedInUser.role === "Super Admin") && 
            <div className={styles.like}>
              <img src={like_btn} alt="like icon" width={30} height={30} onClick={openLikedByDialog} />
              <Dialog open={dialogLikedByOpen} onClose={closeLikedByDialog} className={styles.dialog}>
                <DialogTitle>Liked by</DialogTitle>
                <Divider />
                <DialogContent>
                  {likeUsers.map((likeUser) => {
                    return <LikeUser key={likeUser} likeUser={likeUser} />
                  })}
                </DialogContent>
              </Dialog>
              {likeNbr > 0 && <span>{likeNbr}</span>}
            </div>
          }
          <div className={styles.comment}>
            <img src={comment_btn} alt="Comment icon" width={30} height={30} onClick={openCommentSectionDialog} />
            <Dialog open={dialogCommentSectionOpen} onClose={closeCommentSectionDialog} className={styles.dialog}>
              <DialogTitle>Comments</DialogTitle>
              <DialogContent>
                {comments.map((comment) => {
                  return <Comment key={comment._id} comment={comment} onDelete={deleteComment} onUpdate={updateComment} />
                })}
              </DialogContent>
              <DialogActions>
                <textarea type="text" rows={1} placeholder='Your words have a powerful effect on people, choose them wisely.' className={styles.writeComment} ref={commentContent}></textarea>
                <img src={post_comment} alt="post comment icon" width={20} height={20} className={styles.postComment} onClick={postComment} />
              </DialogActions>
            </Dialog>
            {commentNbr > 0 && <span>{commentNbr}</span>}
          </div>
        </div>
        {loggedInUser.role === "User" && 
          <div className={styles.save}>
            <img src={saved ? save_btn_filled : save_btn} alt="save icon" width={28} height={28} onClick={savePost} />
            <div className={styles.socialShare}>
              <img src={social_share_btn} alt="save icon" width={28} height={28} onMouseEnter={showSharePost} />
              <div className={styles.socialPlatforms} ref={social_share} onMouseLeave={hideSharePost}>
                <PinterestShareButton url={`https://api.pinterest.com/v1/pins/${window.location.href}`} media={ad.image ? ad.image : default_post_image} description={encodeURIComponent(ad.content)} >
                  <img src={pinterest} alt="pinterest icon" width={24} height={24} />
                </PinterestShareButton>
                <TwitterShareButton>
                  <img src={twitter} alt="twitter icon" width={24} height={24} />
                </TwitterShareButton>
                <TumblrShareButton url={window.location.href}>
                  <img src={tumblr} alt="tumblr icon" width={24} height={24} />
                </TumblrShareButton>
              </div>
            </div>
          </div>
        }
        {loggedInUser.role !== "User" && 
          <div className={styles.save}>
            <img src={save_btn} alt="save icon" width={30} height={30} onClick={openSavedByDialog} />
            <Dialog open={dialogSavedByOpen} onClose={closeSavedByDialog} className={styles.dialog}>
              <DialogTitle>Saved by</DialogTitle>
              <Divider />
              <DialogContent>
                {likeUsers.map((likeUser) => {
                  return <LikeUser key={likeUser} likeUser={likeUser} />
                })}
              </DialogContent>
            </Dialog>
            {/*{likeNbr > 0 && <span>{likeNbr}</span>}*/}
          </div>
        }
      </div>
    </div>
  )
}

export default AdminAds