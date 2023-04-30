import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import default_picture from '../../assets/default_user_profile_picture.png';
import styles from '../../pages/main_page/main_page.module.css';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';
import three_dots from '../../assets/dots.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import edit from '../../assets/pencil.png';
import delete_comment from '../../assets/delete.png';

function Comment({comment}) {

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

  return (
    <div className={styles.userComment}>
        <img src={commentOwner.profile_picture ? commentOwner.profile_picture : default_picture} alt="comment owner media" width={30} height={30} />
        <div className={styles.commentText}>
            <div className={styles.commentTop}>
                <p>{commentOwner.username}</p>
                <p>{format(comment.createdAt)}</p>
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
                    <MenuItem>
                        <img src={edit} alt="update comment" width={25} height={25} />
                        <p>Edit</p>
                    </MenuItem>
                    <MenuItem>
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