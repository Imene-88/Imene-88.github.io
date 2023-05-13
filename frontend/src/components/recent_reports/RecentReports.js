import React from 'react';
import styles from './RecentReports.module.css';
import { Link } from 'react-router-dom';

function RecentReports() {
  return (
    <div className={styles.recentReports}>
        <div className={styles.top}>
            <p>Recent Reports</p>
            <Link to={"/reports"}>
              <p>See more</p>
            </Link>
        </div>
    </div>
  )
}

export default RecentReports