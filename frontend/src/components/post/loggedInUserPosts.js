import React, { useState, useEffect, useContext } from 'react';
import like_btn from '../../assets/like.png';
import like_btn_filled from '../../assets/heart.png';
import comment_btn from '../../assets/comment.png';
import save_btn from '../../assets/save.png';
import save_btn_filled from '../../assets/save_filled.png';
import styles from './myposts.module.css';
import axios from 'axios';
import default_picture from '../../assets/default_user_profile_picture.png';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';

export default function LoggedInUserPosts({post}) {
    const {user: loggedInUser} = useContext(AuthContext);
    const [likeNbr, setLikeNbr] = useState(null);   
    useEffect(() => {
      const count = async () => {
        const res = await axios.get(`/posts/${post._id}/likesCount`); 
        setLikeNbr(res.data);
      };
      count();
    }, [post._id]); 

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
    const [likeBtn, setLikeBtn] = useState(like_btn);   
    const likePost = () => {
      if (!likeBtnCLicked && !liked) {
        try {
          axios.post("/likes/like_post/" + post._id, {userId: loggedInUser._id});
        }
        catch(error) {  
        }
        setLikeNbr(likeNbr + 1);
        setLikeBtnCLicked(!likeBtnCLicked);
        setLiked((prevLiked) => !prevLiked);
      } else {
        setLikeNbr(likeNbr - 1);
        setLikeBtnCLicked(!likeBtnCLicked);
        setLiked((prevLiked) => !prevLiked);
        try {
          axios.delete(`/likes/unlike_post/${post._id}`, {
            data: {
              userId: loggedInUser._id
            }
          });
        }
        catch(error) {}
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
    
    return (
      <div className={styles.post}>
          <div className={styles.postTop}>
              <div className={styles.left}>
                <img src={loggedInUser.profile_picture || default_picture} alt={"user profile"} width={44} height={44} />
                <p className={styles.username}>{loggedInUser.username}</p>
                <p className={styles.date}>{format(post.createdAt)}</p>
              </div>
          </div>
          <div className={styles.postMiddle}>
            <p>{post?.content}</p>
            {post.image && <img src={post.image} alt='post media' />}
          </div>
          <div className={styles.postBottom}>
              <div className={styles.react_to_post}>
                  <div className={styles.like}>
                    <img src={liked ? like_btn_filled : like_btn} alt="like icon" width={30} height={30} onClick={likePost} />
                    <span>{likeNbr}</span>
                  </div>
                  <div className={styles.comment}>
                    <img src={comment_btn} alt="Comment icon" width={30} height={30} />
                    <span>{post.comments}</span>
                  </div>
              </div>
              <div className={styles.save}>
                  <img src={saved ? save_btn_filled : save_btn} alt="save icon" width={30} height={30} onClick={savePost} />
              </div>
          </div>
      </div>
    )
}
