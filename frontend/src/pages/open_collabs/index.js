import React, { useEffect, useState } from 'react';
import styles from './open_collabs.module.css';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import OpenDocument from '../../components/open_documents/OpenDocument';

function OpenCollabs() {

  const [openDocuments, setOpenDocuments] = useState([]);
  useEffect(() => {
    const getOpenDocuments = async () => {
      try {
        const res = await axios.get("/documents/open");
        setOpenDocuments(res.data.sort((openDoc_a, openDoc_b) => {
          return openDoc_b.createdAt.localeCompare(openDoc_a.createdAt);
        }));
      } 
      catch (error) {
        console.log(error);
      }
    };
    getOpenDocuments();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.open_documents}>
            {openDocuments.map((openDocument) => {
              return <OpenDocument key={openDocument._id} openDocument={openDocument} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default OpenCollabs