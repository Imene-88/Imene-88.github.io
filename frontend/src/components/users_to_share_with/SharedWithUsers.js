import React, { useContext, useRef, useState } from 'react';
import styles from '../../pages/documents/add_doc.module.css';
import selected from '../../assets/check.png';
import default_picture from '../../assets/default_user_profile_picture.png';
import socket from '../../SOCKET_CONNECTION';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router';
import axios from 'axios';

function SharedWithUsers({followedUser}) {

    const { user: loggedInUser } = useContext(AuthContext);
    const {id: document_id} = useParams();

    const [sharedWith, setSharedWith] = useState("");
    const [FollowedUserClicked, setFollowedUserClicked] = useState(false);

    const handleClick = (id) => {
      setSharedWith(id);
      setFollowedUserClicked(!FollowedUserClicked);
    };

    const [accessRight, setAccessRight] = useState("editor");
    const getUserAccessRight = (event) => {
      setAccessRight(event.target.value);
    };

    console.log(accessRight);

    const shareDocument = async (type) => {
        //socket.emit(`document:share-${document_id}`, {
        //  senderId: loggedInUser._id,
        //  receiverId: sharedWith,
        //  accessRight: accessRight,
        //  type,
        //});
        axios.post(
          'https://api.engagespot.co/v3/notifications',
          {
            notification: {
              title: `${loggedInUser.full_name} sent you a collaboration request.`,
            },
            recipients: [{sharedWith}],
          },
          {
            headers: {
              'X-ENGAGESPOT-API-KEY': '392669pd2q63zp1n10mrub',
              'X-ENGAGESPOT-API-SECRET': process.env.REACT_APP_ENGAGESPOT_API_SECRET,
            },
          }
        );
    };

  return (
    <>
      <div className={styles.shareDiv}>
          <div className={styles.userFollowings} onClick={() => handleClick(followedUser._id)}>
            <img src={followedUser.profile_picture ? followedUser.profile_picture : default_picture} alt="followed user profile media" width={30} height={30} />
            <p>{followedUser.full_name}</p>
          </div>
      </div>
      {FollowedUserClicked && 
        <div className={styles.selectAccessRight}>
          <select defaultValue={accessRight} onChange={getUserAccessRight}>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          <button className={styles.publishBtn} onClick={() => shareDocument("shareDoc")}>Share</button>
        </div>
      }
    </>
  )
}

export default SharedWithUsers