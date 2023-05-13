import React, { useContext, useEffect, useState } from 'react';
import styles from './open_collabs.module.css';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import OpenDocument from '../../components/open_documents/OpenDocument';
import { AuthContext } from '../../context/AuthContext';

function OpenCollabs() {

  const { user: loggedInUser } = useContext(AuthContext);

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
          {loggedInUser.role !== "Admin" &&
            <div className={styles.open_documents}>
              {openDocuments.length > 0 ? openDocuments.map((openDocument) => {
                return <OpenDocument key={openDocument._id} openDocument={openDocument} />
              }) : <p className={styles.noOpenDocument}>There are no open documents yet. <br /> You can start creating a new one by clicking on the 'lock' icon at the top of your document.</p>}
            </div>
          }
          {loggedInUser.role === "Admin" && 
            <div className={styles.open_documents}>
              {openDocuments.length > 0 ? openDocuments.map((openDocument) => {
                return <OpenDocument key={openDocument._id} openDocument={openDocument} />
              }) : <p className={styles.noOpenDocument}>There are no open documents yet.</p>}
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default OpenCollabs