import React, { useContext, useRef, useState } from 'react'
import styles from '../../pages/profile/profile.module.css';
import edit from '../../assets/edit.png';
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";

function EditProfile() {

    const { user: loggedInUser } = useContext(AuthContext);

    const [dialogOpen, setDialogOpen] = useState(false);
    const openEditProfileDialog = () => {
        setDialogOpen(true);
    };
    const closeEditProfileDialog = () => {
        setDialogOpen(false);
    };

    const userFullname = useRef();
    const userUsername = useRef();
    const userBio = useRef();
    const userBirthDate = useRef()
    const userColorBlindness = useRef();
    const userEmail = useRef();
    const userPassword = useRef();
    const confirmUserPassword = useRef();
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [percentage, setPercentage] = useState(0);
    const changeProfilePicture = (event) => {
        const newProfilePicture = event.target.files[0];
        const storageRef = ref(storage, newProfilePicture.name);
        const uploadTask = uploadBytesResumable(storageRef, newProfilePicture);
        uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default: 
              break;
          }
        }, 
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProfilePictureUrl(downloadURL) ;
          });
        }
        );
    };

    const editProfile = async (event) => {
        event.preventDefault();
        try {
            await axios.put("/users/" + loggedInUser._id, {
                full_name: userFullname.current.value || loggedInUser.fullName,
                username: userUsername.current.value || loggedInUser.username, 
                type_of_color_blindness: userColorBlindness.current.value || loggedInUser.type_of_color_blindness,
                email: userEmail.current.value || loggedInUser.email,
                password: userPassword.current.value ? userPassword.current.value : loggedInUser.password,
                profile_picture: profilePictureUrl || loggedInUser.profile_picture,
                bio: userBio.current.value || loggedInUser.bio,
                birth_date: userBirthDate.current.value || loggedInUser.birth_date,
            });
            window.location.reload();
        }
        catch(error) {
            console.log(error);
        }
    };

  return (
    <>
        <div className={styles.edit} onClick={openEditProfileDialog}>
          <img src={edit} alt="edit icon" width={15} height={15} />
          <p>Edit</p>
        </div>
        <Dialog open={dialogOpen} onClose={closeEditProfileDialog} className={styles.dialog}>
            <DialogTitle>Edit Your Profile</DialogTitle>
            <Divider />
                <form method='post' onSubmit={editProfile}>
                    <DialogContent>
                        <div className={styles.editTop}>
                            <label id="newProfilePicture">
                                <img src={loggedInUser.profile_picture ? loggedInUser.profile_picture : default_picture} alt="profile media" width={55} height={55} />
                                <input type="file" aria-labelledby="newProfilePicture" accept='.jpg, .jpeg, .png' onChange={changeProfilePicture} />
                            </label>
                            <p>{loggedInUser.account_type} plan</p>
                        </div>
                        <Divider />
                        <div className={styles.userInputs}>
                            <label>Full name</label>
                            <input type="text" defaultValue={loggedInUser.full_name} placeholder='Enter your full name' ref={userFullname}/>
                        </div>
                        <div className={styles.userInputs}>
                            <label>Username</label>
                            <input type="text" defaultValue={loggedInUser.username} placeholder='Enter your username' ref={userUsername} />
                        </div>
                        <div className={styles.userInputs}>
                            <label>Bio</label>
                            <textarea cols="33" rows="5" defaultValue={loggedInUser.bio} placeholder='Say something about yourself ...' ref={userBio}></textarea>
                        </div>
                        <div className={styles.userInputs}>
                            <label>Birth date</label>
                            <input type="date" defaultValue={loggedInUser.birth_date} ref={userBirthDate} />
                        </div>
                        <Divider />
                        <div className={styles.userInputs}>
                            <label>Type of color blindness</label>
                            <select name="colors" id="colors" defaultValue={loggedInUser.type_of_color_blindness} ref={userColorBlindness} >
                                <option value="deutranomaly">Deutranomaly</option>
                                <option value="protanomaly">Protanomaly</option>
                                <option value="protanopia">Protanopia</option>
                                <option value="deutranopia">Deutranopia</option>
                                <option value="tritanomaly">Tritanomaly</option>
                                <option value="tritanopia">Tritanopia</option>
                                <option value="monochromacy">Monochromacy</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <Divider />
                        <div className={styles.userInputs}>
                            <label>Email</label>
                            <input type="email" ref={userEmail} placeholder={loggedInUser.email} />
                        </div>
                        <Divider />
                        <div className={styles.userInputs}>
                            <label>New Password</label>
                            <input type="password" ref={userPassword} />
                        </div>
                        <div className={styles.userInputs}>
                            <label>Confirm Password</label>
                            <input type="password" ref={confirmUserPassword} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className={styles.EditProfileBtn} type='submit'>Edit</button>
                    </DialogActions>
                </form>
        </Dialog>
    </>
  )
}

export default EditProfile