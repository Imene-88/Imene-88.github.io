import React, { useState, useEffect, useContext, useRef } from 'react';
import three_dots from '../../assets/dots.png';
import like_btn from '../../assets/like.png';
import like_btn_filled from '../../assets/heart.png';
import comment_btn from '../../assets/comment.png';
import save_btn from '../../assets/save.png';
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

export default function Post({post}) {
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
  const {user: loggedInUser} = useContext(AuthContext);

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

  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users/user?id=${post.owner_id}`); 
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

  return (
    <div className={styles.post}>
        <div className={styles.postTop}>
            <div className={styles.left}>
              <img src={user.profile_picture || default_picture} alt={"user profile"} width={44} height={44} />
              <Link to={`/userProfile/${user.full_name}`}>
                <p className={styles.username}>{user.username}</p>
              </Link>
              <p className={styles.date}>{format(post.createdAt)}</p>
            </div>
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
                    <input type="checkbox" name="hate_speech" />
                    <p>Hate speech or symbols</p>
                  </div>
                  <div className={styles.report_reason}>
                    <input type="checkbox" name="false_info" /> 
                    <p>False information</p>
                  </div>
                  <div className={styles.report_reason}>
                    <input type="checkbox" name="violation" />
                    <p>Intellectual property violation</p>
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
              <MenuItem onClick={openReportPostDialog}>
                <img src={report_user} alt="report user" width={25} height={25} />
                <p>Report user</p>
              </MenuItem>
              <Dialog open={dialogReportPostOpen} onClose={closeReportPostDialog} className={styles.dialog}>
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
