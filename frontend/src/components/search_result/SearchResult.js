import React from 'react';
import styles from '../../pages/main_page/main_page.module.css';
import { Link } from 'react-router-dom';
import default_picture from '../../assets/default_user_profile_picture.png';

function SearchResult({searchResult}) {
  return (
    <div className={styles.likeUser}>
        <img src={searchResult.profile_picture ? searchResult.profile_picture : default_picture} alt="comment owner media" width={40} height={40} />
        <div className={styles.commentText}>
            <Link to={`/userProfile/${searchResult.full_name}`}>
                <p><b>{searchResult.full_name}</b></p>
            </Link>
            <p>{searchResult.username}</p>
        </div>
    </div>
  )
}

export default SearchResult