import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import default_picture from '../../assets/default_user_profile_picture.png';
import styles from '../../pages/main_page/main_page.module.css';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';
import three_dots from '../../assets/dots.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import edit from '../../assets/pencil.png';
import delete_comment from '../../assets/delete.png';
import post_comment from '../../assets/post_comment.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

function Comment({comment, onDelete, onUpdate}) {

    const { user: loggedInUser } = useContext(AuthContext);

    const [commentOwner, setCommentOwner] = useState({});
    useEffect(() => {
        const getCommentOwner = async () => {
            const res = await axios.get("/users/user?id=" + comment.user_id);
            setCommentOwner(res.data);
        };
        getCommentOwner();
    }, [comment.user_id]);

    const [anchorCommentUD, setAnchorCommentUD] = useState(null);
    const openCommentUD = Boolean(anchorCommentUD);
    const handleClickCommentUD = (event) => {
        setAnchorCommentUD(event.currentTarget);
    };
    const handleCloseCommentUD = () => {
        setAnchorCommentUD(null);
    };

    const [timeDifference, setTimeDifference] = useState(null);
    useEffect(() => {
        const extractTimeDifference = (commentUDate) => {
            const commentUDate_datetime = new Date(commentUDate);
            const current_date = new Date();
            const time_difference = (current_date - commentUDate_datetime) / 1000;
            setTimeDifference(time_difference);
        };
        extractTimeDifference(comment.updatedAt);
    }, [comment.updatedAt]);
    
    const [dialogEditCommentOpen, setDialogEditCommentOpen] = useState(false);
    const openEditCommentDialog = () => {
        setDialogEditCommentOpen(true);
    };
    const closeEditCommentDialog = () => {
        setDialogEditCommentOpen(false);
    };

    const commentContent = useRef();
    const updateUserComment = () => {
        onUpdate(comment._id, commentContent.current.value);
        closeEditCommentDialog();
    };
    //const updateComment = async () => {
    //    try {
    //        await axios.put("/comments/" + comment._id, {
    //            content: commentContent.current.value,
    //        });
    //        closeEditCommentDialog();
    //    } 
    //    catch (error) {
    //        console.log(error);
    //    }
    //};

    const deleteUserComment = () => {
        onDelete(comment._id);
    }
    
  return (
    <div className={styles.userComment}>
        <img src={commentOwner.profile_picture ? commentOwner.profile_picture : default_picture} alt="comment owner media" width={30} height={30} />
        <div className={styles.commentText}>
            <div className={styles.commentTop}>
                <p>{commentOwner.username}</p>
                <p>{format(comment.updatedAt)}</p>
            </div>
            <p>{comment.content}</p>
        </div>
        {comment.user_id === loggedInUser._id && 
            <>
                <button id='commentUD'
                    aria-controls={openCommentUD ? 'commentUD-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openCommentUD ? "true" : undefined}
                    onClick={handleClickCommentUD}
                    className={styles.commentUDdots}
                >
                  <img src={three_dots} alt="three dots icon" width={25} height={25} />
                </button>
                <Menu id='commentUD-menu'
                    className={styles.commentUD_menu}
                    anchorEl={anchorCommentUD}
                    open={openCommentUD}
                    onClose={handleCloseCommentUD}
                    MenuListProps={{
                      'aria-labelledby': 'commentUD',
                    }}
                >
                    {timeDifference < 900 && 
                        <>
                            <MenuItem onClick={openEditCommentDialog}>
                                <img src={edit} alt="update comment" width={25} height={25} />
                                <p>Edit</p>
                            </MenuItem>
                            <Dialog open={dialogEditCommentOpen} onClose={closeEditCommentDialog} className={styles.editDialog}>
                                <DialogActions>
                                    <textarea type="text" rows={1} placeholder={comment.content} className={styles.writeComment} ref={commentContent}></textarea>
                                    <img src={post_comment} alt="post comment icon" width={20} height={20} className={styles.postComment} onClick={updateUserComment} />
                                </DialogActions>
                            </Dialog>
                        </>
                    }
                    <MenuItem onClick={deleteUserComment}>
                        <img src={delete_comment} alt="delete comment" width={18} height={18} />
                        <p>Delete</p>
                    </MenuItem>
                </Menu>
            </>            
        }
    </div>
  )
}

export default Comment