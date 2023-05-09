//import React, { useContext, useEffect, useRef, useState } from 'react';
//import default_picture from '../../assets/default_user_profile_picture.png';
//import { Link } from 'react-router-dom';
//import styles from '../../pages/main_page/main_page.module.css';
//import { AuthContext } from '../../context/AuthContext';
//import axios from 'axios';
//
//function SimilarProfileSuggestion({similarProfile}) {
//
//    const { user: loggedInUser } = useContext(AuthContext);
//
//    const [followBtnText, setFollowBtnText] = useState("Follow");
//    const [followBtnClicked, setFollowBtnClicked] = useState(false);
//    const [followedId, setFollowedId] = useState("");
//    const [followed, setFollowed] = useState(false);
//    const userToFollow = useRef();
//    useEffect(() => {
//        const getUserFollowing = async () => {
//            try {
//                const res = await axios.get("/users/" + loggedInUser._id + "/getFollowing/" + similarProfile._id);
//                console.log(res.data)
//                if (res.data.length > 0) {
//                    setFollowedId(res.data[0]._id);
//                    setFollowed(true);
//                }
//            } 
//            catch (error) {
//                console.log(error);
//            }
//        };
//        getUserFollowing();
//    }, [loggedInUser._id, similarProfile._id]);
//
//    const followBtn = useRef();
//    const followUser = async () => {
//        if (!followBtnClicked && !followed) {
//            try {
//                await axios.put("/users/" + similarProfile._id + "/follow", {
//                    userId: loggedInUser._id,
//                });
//            }
//            catch (error) {
//                console.log(error);
//            }
//            setFollowBtnText("Following");
//            followBtn.current.style.backgroundColor = "var(--bg-color)";
//            followBtn.current.style.border = "1px solid var(--primary-color)";
//            followBtn.current.style.color = "var(--text-color)";
//            setFollowBtnClicked(!followBtnClicked);
//            setFollowed((prevFollowed) => !prevFollowed);       
//        } else {
//            try {
//                await axios.put("/users/" + similarProfile._id + "/unfollow", {
//                    userId: loggedInUser._id,
//                });  
//            } 
//            catch (error) {
//                console.log(error);
//            }
//            setFollowBtnText("Follow");
//            followBtn.current.style.backgroundColor = "var(--primary-color)";
//            followBtn.current.style.color = "var(--bg-color)";
//            setFollowBtnClicked(!followBtnClicked); 
//            setFollowed((prevFollowed) => !prevFollowed);
//        }
//    };
//
//  return (
//    <>
//        {followedId !== similarProfile._id && followed &&
//            <div className={styles.similarProfile} ref={userToFollow}>
//                <img src={similarProfile.profile_picture ? similarProfile.profile_picture : default_picture} alt="similar profile media" width={50} height={50} />
//                <div className={styles.profileIdentity}>
//                    <Link to={`/userProfile/${similarProfile.full_name}`}>
//                        <p className={styles.username}>{similarProfile.username}</p>
//                    </Link>
//                    <p>{similarProfile.full_name}</p>
//                </div>
//                <button ref={followBtn} onClick={followUser}>{followBtnText}</button>
//            </div>
//        }
//    </>
//  )
//}
//
//export default SimilarProfileSuggestion

import React, { useContext, useEffect, useRef, useState } from 'react';
import default_picture from '../../assets/default_user_profile_picture.png';
import { Link } from 'react-router-dom';
import styles from '../../pages/main_page/main_page.module.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function SimilarProfileSuggestion({similarProfile}) {

    const { user: loggedInUser } = useContext(AuthContext);

    const [followBtnClicked, setFollowBtnClicked] = useState(false);
    const [followed, setFollowed] = useState(false);

    const userToFollow = useRef();
    useEffect(() => {
        const getFollowing = async () => {
            try {
                const res = await axios.get("/users/" + loggedInUser._id + "/getFollowing/" + similarProfile._id);
                if (res.data.length > 0) {
                    userToFollow.current.style.display = "none";
                }
            } 
            catch (error) {
                console.log(error);
            }
        };
        getFollowing();
    }, [loggedInUser._id, similarProfile._id]);

    const followBtn = useRef();
    const followUser = async (similarProfileId) => {
        if (!followBtnClicked) {
            try {
                await axios.put("/users/" + similarProfileId + "/follow", {
                    userId: loggedInUser._id,
                });
            } 
            catch (error) {
                console.log(error);
            }
            followBtn.current.style.backgroundColor = "var(--bg-color)";
            followBtn.current.style.border = "1px solid var(--primary-color)";
            followBtn.current.style.color = "var(--text-color)";
            setFollowBtnClicked(!followBtnClicked);
            setFollowed(true);
        } else {
            try {
                await axios.put("/users/" + similarProfileId + "/unfollow", {
                    userId: loggedInUser._id,
                });
            } 
            catch (error) {
                console.log(error);
            }
            followBtn.current.style.backgroundColor = "var(--primary-color)";
            followBtn.current.style.color = "var(--bg-color)";
            setFollowBtnClicked(!followBtnClicked);
            setFollowed(false);
        }
    }

    console.log(similarProfile)
  return (
    
    <div className={styles.similarProfile} ref={userToFollow}>
        <img src={similarProfile.profile_picture ? similarProfile.profile_picture : default_picture} alt="similar profile media" width={50} height={50} />
        <div className={styles.profileIdentity}>
            <Link to={`/userProfile/${similarProfile.full_name}`}>
                <p className={styles.username}>{similarProfile.username}</p>
            </Link>
            <p>{similarProfile.full_name}</p>
        </div>
        <button ref={followBtn} onClick={() => followUser(similarProfile._id)}>{followed ? "Following" : "Follow"}</button>
    </div>
    
  )
}

export default SimilarProfileSuggestion