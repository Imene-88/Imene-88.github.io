import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import styles from './UsersTable.module.css';
import UserRow from './UserRow';

function UsersTable() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get("/admin/allUsers");   
                setUsers(res.data); 
            } 
            catch (error) {
                console.log(error);
            }
        };
        getAllUsers();
    }, []);

  return (
    <div className={styles.usersTable}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" className={styles.headerTitles}>Full name</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Username</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Email</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Birth date</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Type of color blindness</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Account type</TableCell>
                <TableCell align="center" className={styles.headerTitles}>Account status</TableCell>
                <TableCell align="left" className={styles.headerTitles}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return <UserRow key={user._id} user={user} />
              })}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default UsersTable