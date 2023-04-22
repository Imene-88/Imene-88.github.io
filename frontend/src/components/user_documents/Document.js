import React from 'react'
import styles from "../../pages/documents/documents.module.css";
import pdffile from '../../assets/Metaphoria.pdf';
import doc_icon from '../../assets/doc.png';
import dots_icon from '../../assets/dots.png';
import { format } from 'timeago.js';

function Document({document}) {
  return (
    <div className={styles.docMiddleAndBottom}>
      {/*<iframe src={pdffile} width="100%" height="200px" className={styles.document_preview} />*/}
      <div className={styles.bg}></div>
      <p>Opened {format(document.updatedAt)}</p>
    </div>
  )
}

export default Document