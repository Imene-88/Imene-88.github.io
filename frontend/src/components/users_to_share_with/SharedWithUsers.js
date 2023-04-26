import React, { useContext, useState } from 'react';
import styles from '../../pages/documents/add_doc.module.css';
import selected from '../../assets/check.png';
import default_picture from '../../assets/default_user_profile_picture.png';
import socket from '../../SOCKET_CONNECTION';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function SharedWithUsers({followedUser}) {

    const { user: loggedInUser } = useContext(AuthContext);

    const [sharedWith, setSharedWith] = useState("");
    const [FollowedUserClicked, setFollowedUserClicked] = useState(false);
    const {id: document_id} = useParams();

    const handleClick = (id) => {
      setSharedWith(id);
      setFollowedUserClicked(!FollowedUserClicked);
    };

    console.log(sharedWith);

    const shareDocument = (type) => {
        socket.emit("document:share", {
          senderId: loggedInUser._id,
          receiverId: sharedWith,
          type,
        });
    };

  return (
    <div className={styles.shareDiv}>
        <div className={styles.userFollowings} onClick={() => handleClick(followedUser._id)}>
          <img src={followedUser.profile_picture ? followedUser.profile_picture : default_picture} alt="followed user profile media" width={30} height={30} />
          <p>{followedUser.full_name}</p>
        </div>
        {FollowedUserClicked && <img src={selected} alt="user selected check mark" width={23} height={23} />}
        {FollowedUserClicked && <button className={styles.publishBtn} onClick={() => shareDocument("shareDoc")}>Share</button>}
    </div>
  )
}

export default SharedWithUsers