import React, { useContext, useState } from 'react';
import styles from '../../pages/documents/add_doc.module.css';
import selected from '../../assets/check.png';
import default_picture from '../../assets/default_user_profile_picture.png';
import socket from '../../SOCKET_CONNECTION';
import { useParams } from 'react-router-dom';

function SharedWithUsers({followedUser}) {

    const [sharedWith, setSharedWith] = useState("");
    const [FollowedUserClicked, setFollowedUserClicked] = useState(false);
    const {id: document_id} = useParams();

    const handleClick = (id) => {
      setSharedWith(id);
      setFollowedUserClicked(!FollowedUserClicked);
    };

    const shareDocument = () => {
        //socket.emit("document:share", sharedWith);
    };

  return (
    <div className={styles.shareDiv}>
        <div className={styles.userFollowings} onClick={() => handleClick(followedUser._id)}>
          <img src={followedUser.profile_picture ? followedUser.profile_picture : default_picture} alt="followed user profile media" width={30} height={30} />
          <p>{followedUser.full_name}</p>
        </div>
        {FollowedUserClicked && <img src={selected} alt="user selected check mark" width={23} height={23} />}
        {FollowedUserClicked && <button className={styles.publishBtn} onClick={shareDocument}>Share</button>}
    </div>
  )
}

export default SharedWithUsers