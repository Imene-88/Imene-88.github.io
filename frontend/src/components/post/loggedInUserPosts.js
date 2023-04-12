import React, { useState, useEffect, useContext } from 'react';
import like_btn from '../../assets/like.png';
import like_btn_filled from '../../assets/heart.png';
import comment_btn from '../../assets/comment.png';
import save_btn from '../../assets/save.png';
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

    const [likeBtnCLicked, setLikeBtnCLicked] = useState(false);
    const [likeBtn, setLikeBtn] = useState(like_btn);   
    const likePost = () => {
      if (!likeBtnCLicked) {
        try {
          axios.post("/likes/like_post/" + post._id, {userId: loggedInUser._id});
        }
        catch(error) {  
        }
        setLikeNbr(likeNbr + 1);
        setLikeBtnCLicked(!likeBtnCLicked);
        setLikeBtn(like_btn_filled);
      } else {
        setLikeNbr(likeNbr - 1);
        setLikeBtnCLicked(!likeBtnCLicked);
        setLikeBtn(like_btn);
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
                    <img src={likeBtn} alt="like icon" width={30} height={30} onClick={likePost} />
                    <span>{likeNbr}</span>
                  </div>
                  <div className={styles.comment}>
                    <img src={comment_btn} alt="Comment icon" width={30} height={30} />
                    <span>{post.comments}</span>
                  </div>
              </div>
              <div className={styles.save}>
                  <img src={save_btn} alt="save icon" width={30} height={30} />
              </div>
          </div>
      </div>
    )
}
