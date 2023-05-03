import React from 'react';
import UsersTable from '../../components/users_table/UsersTable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './Users.module.css';
import AdminsTable from '../../components/users_table/AdminsTable';
import { Link } from 'react-router-dom';

function Users() {
  return (
    <>
      <Navbar />
      <div className={styles.subContainer}>
        <Sidebar />
        <div className={styles.subSubContainer}>
          <div className={styles.wrapper}>
            <p>Users</p>
            <UsersTable />
            <div className={styles.adminsTop}>
              <p>Admins</p>
              <Link to={"/users/new_admin"}>
                <button>Add New</button>
              </Link>
            </div>
            <AdminsTable />
          </div>
        </div>
      </div>      
    </>
  )
}

export default Users