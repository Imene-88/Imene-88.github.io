import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import three_dots from '../../assets/dots.png';
import like_btn from '../../assets/like.png';
import like_btn_filled from '../../assets/heart.png';
import comment_btn from '../../assets/comment.png';
import save_btn from '../../assets/save.png';
import save_btn_filled from '../../assets/save_filled.png';
import styles from '../../pages/main_page/main_page.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import report_post from '../../assets/report_post.png';
import report_user from '../../assets/report_user.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import default_picture from '../../assets/default_user_profile_picture.png';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ReactPlayer from 'react-player';
import delete_post from '../../assets/delete.png';
import { ref, deleteObject } from "firebase/storage";
import { storage } from '../../Firebase'; 
import post_comment from '../../assets/post_comment.png';
import Comment from './Comment';
import LikeUser from './LikeUser';
import socket from '../../SOCKET_CONNECTION';
import social_share_btn from '../../assets/paper-plane.png';
import { PinterestShareButton, TwitterShareButton, TumblrShareButton } from 'react-share';
import pinterest from '../../assets/pinterest.png';
import twitter from '../../assets/twitter.png';
import tumblr from '../../assets/tumblr.png';
import default_post_image from '../../assets/default_post_image.jpg';

export default function Post({post}) {
  const {user: loggedInUser} = useContext(AuthContext);

  const [likeNbr, setLikeNbr] = useState(null);
  const [commentNbr, setCommentNbr] = useState(null);

  useEffect(() => {
    const count = async () => {
      const res = await axios.get(`/posts/${post._id}/likesCount`); 
      setLikeNbr(res.data);
    };
    count();
  }, [post._id]); 

  useEffect(() => {
    const countComments = async () => {
      try {
        const res = await axios.get(`/posts/commentsCount/${post._id}`); 
        setCommentNbr(res.data);
      } 
      catch (error) {
        console.log(error);
      }
    };
    countComments();
  });

  const [liked, setLiked] = useState(false);
  useEffect(() => {
    const getLike = async () => {
      try {
        const res = await axios.get("/likes/get_like/" + loggedInUser._id + "/" + post._id);
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
  }, []);
  
  const [likeBtnCLicked, setLikeBtnCLicked] = useState(false);
  const likePost = async () => {
    if (!likeBtnCLicked && !liked) {
      try {
        await axios.post("/likes/like_post/" + post._id, {userId: loggedInUser._id});
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
        await axios.delete(`/likes/unlike_post/${post._id}`, {
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

  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/users/user?id=" + post.owner_id); 
     setUser(res.data);
    };
    getUser();
  }, [post.owner_id]);

  const [anchorReport, setAnchorReport] = useState(null);
  const openReport = Boolean(anchorReport);
  const handleClickReport = (event) => {
    setAnchorReport(event.currentTarget);
  };
  const handleCloseReport = () => {
    setAnchorReport(null);
  };

  const [dialogReportPostOpen, setDialogReportPostOpen] = useState(false);
  const openReportPostDialog = () => {
    setDialogReportPostOpen(true);
  };
  const closeReportPostDialog = () => {
    setDialogReportPostOpen(false);
  };

  const [dialogReportUserOpen, setDialogReportUserOpen] = useState(false);
  const openReportUserDialog = () => {
    setDialogReportUserOpen(true);
  };
  const closeReportUserDialog = () => {
    setDialogReportUserOpen(false);
  };

  const [dialogCommentSectionOpen, setDialogCommentSectionOpen] = useState(false);
  const openCommentSectionDialog = () => {
    setDialogCommentSectionOpen(true);
  };
  const closeCommentSectionDialog = () => {
    setDialogCommentSectionOpen(false);
  };

  const deletePost = useCallback((postId, postImage, postVideo) => {
    const deleteUserPost = async () => {
      try {
        const postImageReference = ref(storage, postImage);
        const postVideoReference = ref(storage, postVideo);
        await axios.delete("/posts/" + postId);
        window.location.reload();
        if (postImageReference) {
          deleteObject(postImageReference);
        }
        if (postVideoReference) {
          deleteObject(postVideoReference);
        }
      } 
      catch (error) {
        console.log(error);
      }
    };
    deleteUserPost();
  });

  const commentContent = useRef();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getPostComments = async () => {
      const res = await axios.get("/comments/" + post._id);
      setComments(res.data);
    };
    getPostComments();
  }, [post._id]);

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
        const res = await axios.post("/comments/" + loggedInUser._id + "/" + post._id, {
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
  }, [loggedInUser._id, post._id]);

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
        const res = await axios.get("/posts/" + loggedInUser._id + "/savedPost/" + post._id);
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
  }, [loggedInUser._id, post._id]);

  const [saveBtnCLicked, setSaveBtnCLicked] = useState(false);
  const savePost = async () => {
      if (!saveBtnCLicked && !saved) {
        try {
          await axios.post("/posts/" + loggedInUser._id + "/save_post/" + post._id);
        }
        catch(error) {
          console.log(error);
        }
        setSaveBtnCLicked(!saveBtnCLicked);
        setSaved((prevSaved) => !prevSaved);
      } else {
        try {
          await axios.delete("/posts/unsave_post/" + loggedInUser._id + "/" + post._id);
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

    const [likeUsers, setLikeUsers] = useState([]);
    useEffect(() => {
      const getLikeUsers = async () => {
        try {
          const res = await axios.get("/admin/likeUsers/" + post._id);
          setLikeUsers(res.data);  
        } 
        catch (error) {
          console.log(error);
        }
      };
      getLikeUsers();
    }, [post._id]);

    const [admins, setAdmins] = useState([]);
    useEffect(() => {
      const getAllAdmins = async () => {
        const res = await axios.get("/admin/allAdmins");
        setAdmins(res.data);
      };
      getAllAdmins();
    }, []);

    const checkbox1Value = useRef();
    const checkbox2Value = useRef();
    const checkbox3Value = useRef();
    const checkbox4Value = useRef();
    const reportContent = useRef();
    const sendNotification = (type, postId) => {
      admins.map((admin) => {
        const addReport = async () => {
          try {
            const res = await axios.post("/reports/addReport/" + loggedInUser._id, {
              receiverId: admin._id,
              checkedAnswer: checkbox1Value.current.value || checkbox2Value.current.value || checkbox3Value.current.value || checkbox4Value.current.value,
              content: reportContent.current.value,
              postId: postId,
            });
            console.log(res.data); 
          } 
          catch (error) {
            console.log(error);
          }
        }
        addReport();
        socket.emit("notification:send", {
          senderId: loggedInUser._id,
          receiverId: admin._id,
          postId: postId,
          type
        });
      })
    }

    const social_share = useRef();
    const showSharePost = () => {
        social_share.current.style.display = 'flex';
    }
    
    const hideSharePost = () => {
      social_share.current.style.display = 'none';
    }

  return (
    <div className={styles.post}>
        <div className={styles.postTop}>
            <div className={styles.left}>
              <img src={user.profile_picture || default_picture} alt={"user profile"} width={44} height={44} />
              {user._id !== loggedInUser._id && 
                <Link to={`/userProfile/${user.full_name}`}>
                  <p className={styles.username}>{user.username}</p>
                </Link>
              }
              {user._id === loggedInUser._id && <p className={styles.username}>{user.username}</p>}
              <p className={styles.date}>{format(post.createdAt)}</p>
            </div>
            {loggedInUser.role !== "Admin" && 
              <button id='report'
                aria-controls={openReport ? 'report-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openReport ? "true" : undefined}
                onClick={handleClickReport}
              >
                <img src={three_dots} alt="three dots icon" width={30} height={30} className={styles.dots} />
              </button>
            }
            {post.owner_id !== loggedInUser._id && 
              <Menu id='report-menu'
                className={styles.report_menu}
                anchorEl={anchorReport}
                open={openReport}
                onClose={handleCloseReport}
                MenuListProps={{
                  'aria-labelledby': 'report',
                }}
              >
                <MenuItem onClick={openReportPostDialog}>
                  <img src={report_post} alt="report post" width={25} height={25} />
                  <p>Report post</p>
                </MenuItem>
                <Dialog open={dialogReportPostOpen} onClose={closeReportPostDialog} className={styles.dialog}>
                  <DialogTitle>Report Post</DialogTitle>
                  <Divider />
                  <DialogContent className={styles.report_post_contents}>
                    <p>Why are you reporting this post?</p>
                    <div className={styles.report_reason}>
                      <input type="checkbox" name="hate_speech" value="Hate Speech" ref={checkbox1Value} required />
                      <p>Hate speech or symbols</p>
                    </div>
                    <div className={styles.report_reason}>
                      <input type="checkbox" name="false_info" value="False Information" ref={checkbox2Value} required /> 
                      <p>False information</p>
                    </div>
                    <div className={styles.report_reason}>
                      <input type="checkbox" name="violation" value="Intellectual Property Violation" ref={checkbox3Value} required />
                      <p>Intellectual property violation</p>
                    </div>
                    <div className={styles.report_reason}>
                      <input type="checkbox" name="smth_else" value="Something Else" ref={checkbox4Value} required />
                      <p>Something else</p>
                    </div>
                    <textarea cols="69" rows="8" placeholder='Explain your answer.' required className={styles.reportContent} ref={reportContent}></textarea>
                  </DialogContent> 
                  <DialogActions>
                    <button className={styles.reportPostBtn} onClick={() => sendNotification("report-post", post._id)}>Report</button>
                  </DialogActions>
                </Dialog>
                <MenuItem onClick={openReportUserDialog}>
                  <img src={report_user} alt="report user" width={25} height={25} />
                  <p>Report user</p>
                </MenuItem>
                <Dialog open={dialogReportUserOpen} onClose={closeReportUserDialog} className={styles.dialog}>
                  <DialogTitle>Report User</DialogTitle>
                  <Divider />
                  <DialogContent className={styles.report_post_contents}>
                    <p>Why are you reporting this user?</p>
                    <div className={styles.report_reason}>
                      <input type="checkbox" name="pretend" />
                      <p>They are pretending to be someone else</p>
                    </div>
                    <div className={styles.report_reason}>
                      <input type="checkbox" name="plagiarism" /> 
                      <p>Plagiarism</p>
                    </div>
                    <div className={styles.report_reason}>
                      <input type="checkbox" name="deceased" />
                      <p>Deceased writer</p>
                    </div>
                    <div className={styles.report_reason}>
                      <input type="checkbox" name="smth_else" />
                      <p>Something else</p>
                    </div>
                    <textarea cols="69" rows="8" placeholder='Explain your answer.' className={styles.reportContent}></textarea>
                  </DialogContent>
                  <DialogActions>
                    <button className={styles.reportPostBtn}>Report</button>
                  </DialogActions>
                </Dialog>
              </Menu>
            }
            {post.owner_id === loggedInUser._id && 
              <Menu id='report-menu'
                className={styles.report_menu}
                anchorEl={anchorReport}
                open={openReport}
                onClose={handleCloseReport}
                MenuListProps={{
                  'aria-labelledby': 'report',
                }}
              >
                <MenuItem onClick={() => deletePost(post._id, post.image, post.video)}>
                  <img src={delete_post} alt="report post" width={25} height={25} />
                  <p>Delete post</p>
                </MenuItem>
              </Menu>
            }
        </div>
        <div className={styles.postMiddle}>
          <p>{post?.content}</p>
          {post.image && <img src={post.image} alt='post media' />}
          {post.video && 
            <ReactPlayer url={post.video} controls={true} playing={true} loop={true} muted={true} width="100%" className={styles.postVideo} />
          }
        </div>
        <div className={styles.postBottom}>
            <div className={styles.react_to_post}>
              {loggedInUser.role !== "Admin" && 
                <div className={styles.like}>
                  <img src={liked ? like_btn_filled : like_btn} alt="like icon" width={30} height={30} onClick={likePost} />
                  {likeNbr > 0 && <span>{likeNbr}</span>}
                </div>
              }
              {loggedInUser.role === "Admin" && 
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
            {loggedInUser.role !== "Admin" && 
              <div className={styles.save}>
                  <img src={saved ? save_btn_filled : save_btn} alt="save icon" width={28} height={28} onClick={savePost} />
                  <div className={styles.socialShare}>
                    <img src={social_share_btn} alt="save icon" width={28} height={28} onMouseEnter={showSharePost} />
                    <div className={styles.socialPlatforms} ref={social_share} onMouseLeave={hideSharePost}>
                      <PinterestShareButton url={`https://api.pinterest.com/v1/pins/${window.location.href}`} media={post.image ? post.image : default_post_image} description={encodeURIComponent(post.content)} >
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
        </div>
    </div>
  )
}
