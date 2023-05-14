import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import SimilarProfileSuggestion from './SimilarProfileSuggestion';
import zIndex from '@mui/material/styles/zIndex';

function ProfilesSuggestions() {

    const { user: loggedInUser } = useContext(AuthContext);

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
                const res = await axios.get("/interests/getSimilarProfiles/" + loggedInUser._id);
                setSimilarProfiles(res.data);
            } 
            catch (error) {
                console.log(error);
            }
        };
        getSimilarProfiles();
      }, [loggedInUser._id]);

  return (
    <Carousel responsive={responsive} style={{zIndex: -1}}>
        {similarProfiles.map((similarProfile) => {
            return <SimilarProfileSuggestion key={similarProfile._id} similarProfile={similarProfile} />
        })}
    </Carousel>
  )
}

export default ProfilesSuggestions