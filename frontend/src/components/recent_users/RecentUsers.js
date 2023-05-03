import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RecentUser from './RecentUser';
import styles from './RecentUsers.module.css';
import { Link } from 'react-router-dom';

function RecentUsers() {

  const [recentUsers, setRecentUsers] = useState([]);
  useEffect(() => {
    const getRecentUsers = async () => {
      try {
        const res = await axios.get("/admin/recentUsers");
        setRecentUsers(res.data);
      } 
      catch (error) {
        console.log(error);
      }
    };
    getRecentUsers();
  }, []);

  return (
    <div className={styles.recentUsers}>
      <div className={styles.top}>
        <p>Recent Users</p>
        <Link to={"/users"}>
          <p>See more</p>
        </Link>
      </div>
      {recentUsers.map((recentUser) => {
        return <RecentUser key={recentUser._id} recentUser={recentUser} />
      })}
    </div>
  )
}

export default RecentUsers