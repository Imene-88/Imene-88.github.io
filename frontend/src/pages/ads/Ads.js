import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './Ads.module.css';
import AdminAds from '../../components/admin_ads/AdminAds'
import axios from 'axios';

function Ads() {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const getAds = async () => {
      try {
        const res = await axios.get("/ads/getAds");
        setAds(res.data);
      } 
      catch (error) {
        console.log(error);
      }
    };
    getAds();
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.wrapper}>
            <p>Advertisements</p>
            <div className={styles.ads}>
              {ads.map((ad) => {
                return <AdminAds key={ad._id} ad={ad} />
              })}
            </div>
          </div>
        </div>
      </div>      
    </>
  )
}

export default Ads