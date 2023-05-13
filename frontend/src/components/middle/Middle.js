import React, {useContext, useEffect, useRef, useState } from 'react';
import Post from '../post/Post';
import styles from '../../pages/main_page/main_page.module.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ProfilesSuggestions from '../profiles_suggestions/ProfilesSuggestions';
import SimilarProfileSuggestion from '../profiles_suggestions/SimilarProfileSuggestion';
import Carousel from 'react-multi-carousel';

function Middle({fullname}) {
    const [feedPosts, setFeedPosts] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
      const getFeed = async () => {
        if (fullname) {
          const res = await axios.get("/users/userProfile/" + fullname);
          setFeedPosts(res.data); 
        } else {
          const res = await axios.get("posts/feed/" + user._id);
          setFeedPosts(res.data.sort((post_a, post_b) => {
            return post_b.createdAt.localeCompare(post_a.createdAt);
          }));
        } 
      };
      getFeed();
    }, [fullname, user._id]);

    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };

    const [similarProfiles, setSimilarProfiles] = useState([]);
      useEffect(() => {
        const getSimilarProfiles = async () => {
            try {
                const res = await axios.get("/interests/getSimilarProfiles/" + user._id);
                setSimilarProfiles(res.data);
            } 
            catch (error) {
                console.log(error);
            }
        };
        getSimilarProfiles();
      }, [user._id]);


  return (
    <div className={styles.middle}>
      {!fullname &&
        <Carousel responsive={responsive}>
          {similarProfiles.map((similarProfile) => {
              return <SimilarProfileSuggestion key={similarProfile._id} similarProfile={similarProfile} />
          })}
        </Carousel>
      }
        {feedPosts.map((post) => {
          return <Post key={post._id} post={post} />
        })}
    </div>
  )
}

export default Middle