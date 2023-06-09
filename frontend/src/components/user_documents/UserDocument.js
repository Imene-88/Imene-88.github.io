import React, { useState, useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';
import delete_doc from '../../assets/delete.png';
import dots_icon from '../../assets/dots.png';
import doc_icon from '../../assets/doc_unfilled.png';
import Menu from '@mui/material/Menu';
import styles from '../../pages/documents/documents.module.css';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import axios from 'axios';

function UserDocument({document}) {

    const showDocument = (documentId) => {
        console.log(documentId);
    }

    const deleteDocument = useCallback((documentId) => {
        const deleteSelectedDocument = async () => {
          try {
            await axios.delete("/documents/" + documentId);
            window.location.reload();
          } 
          catch (error) {
            console.log(error);
          }
        };
        deleteSelectedDocument();
      });

    const [anchorManageDoc, setAnchorManageDoc] = useState(null);
    const openManageDoc = Boolean(anchorManageDoc);
    const handleClickManageDoc = (event) => {
      setAnchorManageDoc(event.currentTarget);
    };
    const handleCloseManageDoc = () => {
      setAnchorManageDoc(null);
    }

  return (
    <div className={styles.document}>
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
            <MenuItem onClick={() => deleteDocument(document._id)}>
                <img src={delete_doc} alt="delete doc" width={25} height={25} />
                <p>Delete document</p>
            </MenuItem>
          </Menu>
        </div>                 
        <Link to={`/documents/add_doc/${document._id}`} state={document.title}>
            <div className={styles.docMiddleAndBottom} onClick={() => showDocument(document._id)}>
              {/*<iframe src={pdffile} width="100%" height="200px" className={styles.document_preview} />*/}
              <div className={styles.bg}></div>
              <p>Opened {format(document.updatedAt)}</p>
            </div>
        </Link>
    </div>
  )
}

export default UserDocument