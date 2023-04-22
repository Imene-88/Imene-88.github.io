import React, { useCallback, useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import styles from './documents.module.css'
import addDoc from '../../assets/add_doc.png'
import { v4 } from 'uuid'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import Document from '../../components/user_documents/Document';
import dots_icon from '../../assets/dots.png';
import doc_icon from '../../assets/doc.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import delete_doc from '../../assets/delete.png';
import make_doc_open from '../../assets/open.png';
import socket from '../../SOCKET_CONNECTION';

function Documents() {

  const [anchorManageDoc, setAnchorManageDoc] = useState(null);
  const openManageDoc = Boolean(anchorManageDoc);
  const handleClickManageDoc = (event) => {
    setAnchorManageDoc(event.currentTarget);
  };
  const handleCloseManageDoc = () => {
    setAnchorManageDoc(null);
  }
  const { user: loggedInUser } = useContext(AuthContext);
  const [userDocuments, setUserDocuments] = useState([]);

  useEffect(() => {
    const getDocuments = async () => {
      const res = await axios.get("/documents/" + loggedInUser._id + "/documents");
      setUserDocuments(res.data);
    }
    getDocuments();
  }, [loggedInUser._id]);

  //useEffect(() => {
  //  socket.on("document:shared", (msg) => {
  //    console.log(msg);
  //  })
  //}, [socket]); 

  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.documents}>
            {userDocuments.map((document) => {
              return (
                <div key={document._id} className={styles.document}>
                  <div className={styles.docTop}>
                    <div className={styles.docTopLeft}>
                      <img src={doc_icon} alt="document icon" width={22} height={22} />
                      <p>{document.title}</p>
                    </div>
                    <button id='manage_doc'
                      aria-controls={openManageDoc ? 'manage-doc-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openManageDoc ? "true" : undefined}
                      onClick={handleClickManageDoc}
                    >
                      <img src={dots_icon} alt="three dots icon" width={20} height={20} />
                    </button>
                    <Menu id='manage-doc-menu'
                      className={styles.report_menu}
                      anchorEl={anchorManageDoc}
                      open={openManageDoc}
                      onClose={handleCloseManageDoc}
                      MenuListProps={{
                        'aria-labelledby': 'manage_doc',
                      }}
                    >
                      <MenuItem>
                        <img src={delete_doc} alt="delete doc" width={25} height={25} />
                        <p>Delete document</p>
                      </MenuItem>
                      <MenuItem>
                        <img src={make_doc_open} alt="publish doc as open" width={25} height={25} />
                        <p>Open document</p>
                      </MenuItem>
                    </Menu>
                  </div>                 
                <Link to={`/documents/add_doc/${document._id}`} state={document.title}>
                  <Document key={document._id} document={document} />
                </Link>
              </div>
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