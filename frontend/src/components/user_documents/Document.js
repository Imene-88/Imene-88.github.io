import React from 'react'
import styles from "../../pages/documents/documents.module.css";
import pdffile from '../../assets/Metaphoria.pdf';
import doc_icon from '../../assets/doc.png';
import dots_icon from '../../assets/dots.png';
import { format } from 'timeago.js';

function Document({document}) {
  return (
    <div className={styles.document}>
        <iframe src={pdffile} width="100%" height="200px" className={styles.document_preview} />
        <div className={styles.document_bottom}>
          <p>{document.title}</p>
          <div className={styles.image_date_dots}>
            <div className={styles.left}>
              <img src={doc_icon} alt="document icon" width={20} height={20} />
              <p>Opened {format(document.updatedAt)}</p>
            </div>
            <img src={dots_icon} alt="three dots icon" width={20} height={20} />
          </div>
        </div>
    </div>
  )
}

export default Document