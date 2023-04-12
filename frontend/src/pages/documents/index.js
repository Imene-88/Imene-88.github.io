import React, { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import styles from './documents.module.css'
import addDoc from '../../assets/add_doc.png'
import { v4 } from 'uuid'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import Document from '../../components/user_documents/Document'

function Documents() {
  const { user: loggedInUser } = useContext(AuthContext);
  const [userDocuments, setUserDocuments] = useState([]);

  useEffect(() => {
    const getDocuments = async () => {
      const res = await axios.get("/documents/" + loggedInUser._id + "/documents");
      setUserDocuments(res.data);
    }
    getDocuments();
  }, [loggedInUser._id]);

  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.documents}>
            {userDocuments.map((document) => {
              return (
                <Link to={`/documents/add_doc/${document._id}`} key={document._id} state={document}>
                  <Document key={document._id} document={document} />
                </Link>
              )
            })}
          </div>
          <Link to={`/documents/add_doc/${v4()}`}>
            <img src={addDoc} alt="Add document icon" width="53" height="53" className={styles.addPostImg} />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Documents