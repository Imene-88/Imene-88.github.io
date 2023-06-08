import React, { useContext, useRef, useState } from 'react';
import styles from './MyPortfolio.module.css';
import { AuthContext } from '../../context/AuthContext';
import default_picture from '../../assets/default_user_profile_picture.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase";

function MyPortfolio() {

  const { user: loggedInUser } = useContext(AuthContext);

  const [listOfWorks, setListOfWorks] = useState([]);
  const [listOfWorksUrls, setListOfWorksUrls] = useState([]);
  const [percentages, setPercentages] = useState([]);

  const userFullName = useRef();
  const userDescription = useRef();

  const handleImageChange = (event) => {
    const FilesList = Array.from(event.target.files);
    let FilesListFiltered = [];
    FilesList.map((file) => {
      if (listOfWorks.includes(file)) {
        FilesListFiltered = listOfWorks.filter((item) => item != file);
        setListOfWorks(FilesListFiltered);
      } else {
        listOfWorks.push(file);
      }
    })
    setListOfWorks((prev) => [...prev]);
    listOfWorks.map((item) => {
      const storageRef = ref(storage, item.name);
      const uploadTask = uploadBytesResumable(storageRef, item);
      uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        percentages.push(progress);
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
          listOfWorksUrls.push(downloadURL);
        });
      }
      );
    })
    setListOfWorksUrls((prev) => [...prev]);
    setPercentages((prev) => [...prev]);
    console.log(percentages)
  }

  const navigate = useNavigate();

  //const buildPortfolio = async (event) => {
  //  event.preventDefault();
  //  try {
  //    await axios.post("/portfolios/createPortfolio/" + loggedInUser._id, {
  //      full_name: userFullName.current.value,
  //      description: userDescription.current.value,
  //      list_of_works: listOfWorks
  //    });
  //    navigate("/main_page/profile", {replace: true});
  //  } 
  //  catch (error) {
  //    console.log(error);
  //  }
  //};

  return (
    <div  className={styles.MyPortfolio}>
      <p>Build Your Portfolio</p>
      <div className={styles.userInformation}>
        <form method='post'>
          <input type="text" placeholder='Enter your full name or pen name' required ref={userFullName} />
          <textarea cols="30" rows="10" placeholder='Describe yourself and what you do' required ref={userDescription}></textarea>
          <label id='writtenPieceImage' className={styles.writtenPieceImage}>
            <p className={styles.upload}>Upload Your Works</p>
            <input type="file" multiple aria-labelledby="writtenPieceImage" accept='.jpg, .jpeg, .png' onChange={handleImageChange} />
          </label>
          {listOfWorks.length > 0 && <button type='submit' className={styles.finishPortfolio}>Finish</button>}
        </form>
        <img src={loggedInUser.profile_picture ? loggedInUser.profile_picture : default_picture} alt="user media" width={150} height={150} />
      </div>
      <div className={styles.listOfWorks}>
        {listOfWorks.map((work) => {
          return <img src={URL.createObjectURL(work)} alt="work media of user" width={200} height={200} className={styles.workImage} key={work.name} />
        })}
      </div>
    </div>
  )
}

export default MyPortfolio