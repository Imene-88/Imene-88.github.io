import React, { useContext, useState, useEffect } from 'react';
import styles from '../../pages/open_collabs/open_collabs.module.css';
import open_document from '../../assets/doc.png';
import like_btn from '../../assets/like.png';
import like_btn_filled from '../../assets/heart.png';
import { format } from 'timeago.js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function OpenDocument({openDocument}) {

  const [likeNbr, setLikeNbr] = useState(null);
  const [likeBtnCLicked, setLikeBtnCLicked] = useState(false);
  const [likeBtn, setLikeBtn] = useState(like_btn);
  const {user: loggedInUser} = useContext(AuthContext);

  useEffect(() => {
    const count = async () => {
      const res = await axios.get(`/documents/${openDocument._id}/likesCount`); 
      setLikeNbr(res.data);
    };
    count();
  }, [openDocument._id]);

  const likeDocument = () => {
    if (!likeBtnCLicked) {
      try {
        axios.post("/likes/like_open_document/" + openDocument._id, {userId: loggedInUser._id});
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
        axios.delete(`/likes/unlike_open_document/${openDocument._id}`, {
          data: {
            userId: loggedInUser._id
          }
        });
      }
      catch(error) {}
    }
  };

  return (
    <div className={styles.open_document}>
    <div className={styles.top}>
      <div className={styles.left}>
        <img src={open_document} alt="icon of a document" width={38} height={38} />
        <div className={styles.text}>
          <p>{openDocument.title}</p>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {openDocument.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <button>Join</button>
      </div>
      <div className={styles.right}>
        <img src={likeBtn} alt="icon of heart" width={30} height={30} onClick={likeDocument} />
        <p>{likeNbr > 0 && likeNbr}</p>
      </div>
    </div>
    <div className={styles.bottom}>
      {openDocument.participants.length > 0 && <p>{openDocument.participants.length} participants</p> || <p>No participants yet. <i><b>Be the first one!</b></i></p>}
      <p>{format(openDocument.createdAt)}</p>
    </div>
  </div>

  )
}

export default OpenDocument