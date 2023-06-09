import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import axios from 'axios';
import { format } from 'timeago.js';
import styles from './myposts.module.css';
import like_btn from '../../assets/like.png';
import like_btn_filled from '../../assets/heart.png';
import comment_btn from '../../assets/comment.png';
import save_btn from '../../assets/save.png';
import save_btn_filled from '../../assets/save_filled.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Comment from './Comment';
import post_comment from '../../assets/post_comment.png';

function LoggedInUserSavedPosts({savedPost}) {

    const { user: loggedInUser } = useContext(AuthContext);

    const [post, setPost] = useState({});
    const [postOwner, setPostOwner] = useState({});
    useEffect(() => {
        const getPost = async () => {
            try {
                const res_post = await axios.get("/posts/" + savedPost.post_id);
                const res_pos_owner = await axios.get("/users/user?id=" + res_post.data.owner_id);
                setPost(res_post.data);
                setPostOwner(res_pos_owner.data);
            } catch (error) {
                console.log(error);
            }
        };
        getPost();
    }, [savedPost.post_id]);
    
    const [liked, setLiked] = useState(false);
    useEffect(() => {
      const getLike = async () => {
        try {
          const res = await axios.get("/likes/get_like/" + loggedInUser._id + "/" + savedPost.post_id);
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
    }, [loggedInUser._id, savedPost.post_id]);

    const [likeNbr, setLikeNbr] = useState(null);   
    useEffect(() => {
      const count = async () => {
        const res = await axios.get(`/posts/${savedPost.post_id}/likesCount`); 
        setLikeNbr(res.data);
      };
      count();
    }, [savedPost.post_id]); 

    const [likeBtnCLicked, setLikeBtnCLicked] = useState(false);
    const likePost = async () => {
      if (!likeBtnCLicked && !liked) {
        try {
          await axios.post("/likes/like_post/" + savedPost.post_id, {userId: loggedInUser._id});
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
          await axios.delete(`/likes/unlike_post/${savedPost.post_id}`, {
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

    const [commentNbr, setCommentNbr] = useState(null);
    useEffect(() => {
        const countComments = async () => {
          try {
            const res = await axios.get("/posts/commentsCount/" + savedPost.post_id); 
            setCommentNbr(res.data);
          } 
          catch (error) {
            console.log(error);
          }
        };
        countComments();
      }, [savedPost.post_id]);

    const [dialogCommentSectionOpen, setDialogCommentSectionOpen] = useState(false);
    const openCommentSectionDialog = () => {
      setDialogCommentSectionOpen(true);
    };
    const closeCommentSectionDialog = () => {
      setDialogCommentSectionOpen(false);
    };

    const commentContent = useRef();
    const [comments, setComments] = useState([]);
    useEffect(() => {
      const getPostComments = async () => {
        const res = await axios.get("/comments/" + savedPost.post_id);
        setComments(res.data);
      };
      getPostComments();
    }, [savedPost.post_id]);

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
          const res = await axios.post("/comments/" + loggedInUser._id + "/" + savedPost.post_id, {
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
    }, [loggedInUser._id, savedPost.post_id]);

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
          const res = await axios.get("/posts/" + loggedInUser._id + "/savedPost/" + savedPost.post_id);
          console.log(res.data)
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
    }, [loggedInUser._id ,savedPost.post_id]);

    const [saveBtnCLicked, setSaveBtnCLicked] = useState(false);
    const savePost = async () => {
        if (!saveBtnCLicked && !saved) {
          try {
            await axios.post("/posts/" + loggedInUser._id + "/save_post/" + savedPost.post_id);
          }
          catch(error) {
            console.log(error);
          }
          setSaveBtnCLicked(!saveBtnCLicked);
          setSaved((prevSaved) => !prevSaved);
        } else {
          try {
            await axios.delete("/posts/unsave_post/" + loggedInUser._id + "/" + savedPost.post_id);
          }
          catch(error) {
            console.log(error);
          }
          setSaveBtnCLicked(!saveBtnCLicked);
          setSaved((prevSaved) => !prevSaved);
        }
      };

  return (
    <div className={styles.post}>
        <div className={styles.postTop}>
            <div className={styles.left}>
              <img src={postOwner.profile_picture ? postOwner.profile_picture : default_picture} alt={"user profile"} width={44} height={44} />
              <p className={styles.username}>{postOwner.username}</p>
              <p className={styles.date}>{format(post.createdAt)}</p>
            </div>
        </div>
        <div className={styles.postMiddle}>
            <p>{post?.content}</p>
            {post.image && <img src={post.image} alt='post media' />}
            {post.video && <video src={post.video}></video>}
        </div>
        <div className={styles.postBottom}>
              <div className={styles.react_to_post}>
                  <div className={styles.like}>
                    <img src={liked ? like_btn_filled : like_btn} alt="like icon" width={30} height={30} onClick={likePost} />
                    {likeNbr > 0 && <span>{likeNbr}</span>}
                  </div>

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

              <div className={styles.save}>
                  <img src={saved ? save_btn_filled : save_btn} alt="save icon" width={30} height={30} onClick={savePost} />
              </div>

        </div>
    </div>
  )
}

export default LoggedInUserSavedPosts